#===============================================================================
#PURPOSE: Backend AWS lambda, updates formatted files queried by CALPATH website
#AUTHOR: Xiling Xia, 10/23/17
#USAGE: python update-files.py
#FUNCTION:
#   Takes new Detector Metric files in INPUT_DIRECTORY, and properly updates
#   Intersection Metrics and Aggregate Intersection Metrics in OUTPUT_DIRECTORY.
#   Old data is preserved unless it is overwritten by new data.
#
#   INPUT_DIRECTORY: Directory containing new data, one file for each detector.
#       Note that filenames must contain detectorID, which includes the
#       IntersectionID in the first four digits.
#   OUTPUT_DIRECTORY: Directory that MUST contain two other directories:
#       1. IntersectionMetrics
#       2. AggregateIntersectionMetrics
#       This function will automatically format files in those two directories.
#===============================================================================
import boto3
from botocore.exceptions import ClientError
import csv
import io
import pandas as pd

INPUT_DIRECTORY = "new-data"
AGGREGATE_METRICS_DIRECTORY = "aggregate-intersection-metrics"
INTERSECTION_METRICS_DIRECTORY = "intersection-metrics"

bucket = boto3.resource("s3").Bucket("aggregate-health-metrics")
bucket_contents = set(obj.get for obj in bucket.objects.all())

def readFile(filename):
    try:
        input = bucket.Object(key = filename).get()['Body']
        r = csvStringToArray(input.read())
        return [x for x in r if len(x) > 1]
    except ClientError as ex:
        raise FileNotFoundError

def writeFile(filename, content):
    s = arrayToCSVString(content)
    bucket.put_object(Key = filename, Body = s)

def csvStringToArray(s):
    if (type(s) is not type("")):
        s = str(s, 'UTF-8')
    s = s.split("\n")
    return [x.split(',') for x in s]

def arrayToCSVString(a):
    return bytes("\n".join([",".join(x) for x in a]), 'UTF-8')

def lambda_handler(event, context):

    #Look at all new files, group filenames by intersections

#    for record in event["Records"]:
#        #Parse intersection ID
#        bucket = record['s3']['bucket']['name']
#        if bucket == "aggregate-health-metrics":
#            filename = record['s3']['object']['key']
#            intersection = filename.replace(INPUT_DIRECTORY + "/Arcadia_Health_Report_", "")[:4]
#
#            if (intersection not in groupedList.keys()):
#                groupedList[intersection] = []
#            groupedList[intersection].append(filename)


    groupedList = {} #Dictionary from intersection to new data for that intersection in 2d array
    newDates = {}
    input_file = INPUT_DIRECTORY + "/newest_data.csv"
    try:
        newest_data = readFile(input_file)
    except FileNotFoundError:
        print("No newest_data file found")
        return None;

    header = newest_data[0] + ["good_MissingRate", "good_MaxZero", "good_HighValue", "good_InconsistentRate"]
    for row in newest_data[1:]:
        intersection = row[0]
        if (intersection not in groupedList.keys()):
            groupedList[intersection] = []
        if (intersection not in newDates.keys()):
            newDates[intersection] = set()

        if (row[1], row[2], row[3], row[4]) not in newDates[intersection]:
            #check missing rate
            if float(row[5]) > 5:
                row.append("0")
            else:
                row.append("1")
            #check max zero value
            if float(row[6]) > 4:
                row.append("0")
            else:
                row.append("1")
            #check high value rate
            if float(row[7]) > 5:
                row.append("0")
            else:
                row.append("1")
            #check inconsistent rate
            if float(row[9]) > 5:
                row.append("0")
            else:
                row.append("1")
            groupedList[intersection].append(row)
            newDates[intersection].add((row[1], row[2], row[3], row[4]))


    #For each discovered intersection, load its old and new data and merge
    for intersection in groupedList.keys():
        #---------------------------------------------------------------------------
        #---------------------UPDATE-INTERSECTION-METRICS---------------------------
        #---------------------------------------------------------------------------

        newIntersectionData = groupedList[intersection]
        #Add all non-overriden old data rows
        try:
            oldIntersectionData = readFile(INTERSECTION_METRICS_DIRECTORY + "/" + intersection + ".csv")
            for row in oldIntersectionData[1:]:
                if (row[1], row[2], row[3], row[4]) not in newDates[intersection]:
                    newIntersectionData.append(row)
                    newDates[intersection].add((row[1], row[2], row[3], row[4]))

        except FileNotFoundError:
            pass

        #Write merged old and new data to file, overriding old data
        print("Updating intersection data for " + intersection)
        writeFile(INTERSECTION_METRICS_DIRECTORY + "/" + intersection + ".csv", [header] + newIntersectionData)


        h = header[:1] + header[2:]
        newIntersectionData = [x[:1] + x[2:] for x in newIntersectionData]

        #---------------------------------------------------------------------------
        #--------------RECALCULATE AGGREGATE INTERSECTION METRICS-------------------
        #---------------------------------------------------------------------------
        #Convert all strings to floats, except header
        df = pd.DataFrame([[y[0]] + [float(x) for x in y[1:7] + [y[8]]] for y in newIntersectionData], columns = h[:7] + [h[8]])
        df_binary = pd.DataFrame([[y[0]] + [float(x) for x in y[1:4] + [y[7]] + y[9:]] for y in newIntersectionData], columns = h[:4] + [h[7]] + h[9:])

        #free memory
        newIntersectionData = None;

        grouped = df.groupby(["Year", "Month", "Day"])
        grouped_binary = df_binary.groupby(["Year", "Month", "Day"])

        #Run aggregate functions
        df_mean = grouped.mean().iloc[:, 1:]
        df_mean.columns = "mean_" + df_mean.columns

        df_min = grouped.min().iloc[:, 1:]
        df_min.columns = "min_" + df_min.columns

        df_max = grouped.max().iloc[:, 1:]
        df_max.columns = "max_" + df_max.columns

        df_binary_sum = grouped_binary.sum().iloc[:, 1:]
        df_binary_sum.columns = "#" + df_binary_sum.columns

        #Concatenate results of aggregate functions into a single table
        df = pd.concat([df_mean, df_min, df_max, df_binary_sum], axis = 1)

        #Convert that table to CSV, and override the old aggregate file
        s = io.StringIO()
        df.to_csv(s)
        newAggregateData = csvStringToArray(s.getvalue())
        print("Updating aggregate data for" + intersection)
        writeFile(AGGREGATE_METRICS_DIRECTORY + "/" + intersection + ".csv", newAggregateData)
