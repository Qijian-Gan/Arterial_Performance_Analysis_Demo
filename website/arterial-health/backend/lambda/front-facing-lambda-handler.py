import boto3
from botocore.exceptions import ClientError
import csv
import io
import pandas as pd
import json
import math
import datetime as datetime

INTERSECTION_CONFIG_PATH = "IntersectionDirectory.csv"
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

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amx-Date,Authorization,X-Api-Key,X-Amx-Security-Token',
            'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
            "Access-Control-Allow-Credentials" : True
        },
    }

def lambda_handler(event, context):
    try:
        event = json.loads(event['body'])
    except json.JSONDecodeError:
        return ("Invalid input")

    selected = event['intersections']
    start = datetime.datetime(year = int(event['start'][0]), month = int(event['start'][1]), day = int(event['start'][2]))
    end = datetime.datetime(year = event['end'][0], month = event['end'][1], day = event['end'][2])

    if not selected:
        return respond("Empty selection")
    if not start:
        return respond("No start date")
    if not end:
        return respond("No end date")
    if end < start:
        return respond("End date is before start date")
    if end == start:
        return respond("Start and end dates are the same")

    df_all = None
    missed_intersections = []
    all_data = []
    header = None
    max_date = start
    min_date = end

    all_detectors = set()
    reporting_detectors = set()

    selected = set(selected)

    #For every existing selected intersection
    for intersection in selected:
        try:
            intersectionData = readFile(INTERSECTION_METRICS_DIRECTORY + "/" + intersection + ".csv")

            seen_dates = set()
            if header == None:
                header = intersectionData[0]
            hit = False
            for i in range(len(intersectionData) - 1):
                row = intersectionData[i + 1]

                all_detectors.add((row[0], row[1]))

                prev = intersectionData[i]
                date = datetime.datetime(year = int(row[2]), month = int(row[3]), day = int(row[4]))
                if date <= end and date >= start and date not in seen_dates:
                    reporting_detectors.add((row[0], row[1]))

                    if date < min_date:
                        min_date = date
                    if date > max_date:
                        max_date = date
                    hit = True
                    if prev[1] == row[1]:
                        row += [abs(int(row[10]) - int(prev[10]))]
                    else:
                        row += [0]
                    all_data += [row]
                    seen_dates.add(date)
            if not hit:
                missed_intersections.append(intersection)
        except FileNotFoundError:
            missed_intersections.append(intersection)

    if len(all_data) == 0:
        return respond("No data for the given time period and intersections")

    all_data = [row for row in all_data if datetime.datetime(year = int(row[2]), month = int(row[3]), day = int(row[4])) >= start]

    df_system = pd.DataFrame([[y[0], y[1], float(y[10]), float(y[15])] for y in all_data], columns = ['IntersectionID', 'DetectorID', 'Days_Good', 'Days_Changed'])

    grouped = df_system.groupby(['IntersectionID', 'DetectorID'])
    df_num_good = grouped.sum()


    s = io.StringIO()
    df_num_good = df_num_good.transpose()
    df_num_good.to_csv(s)
    system_metrics = csvStringToArray(s.getvalue())

    h = header[:1] + header[2:]
    all_data = [x[:1] + x[2:15] for x in all_data]
    #GET AGGREGATES NOW
    df = pd.DataFrame([[y[0]] + [float(x) for x in y[1:7] + [y[8]]] for y in all_data], columns = h[:7] + [h[8]])
    df_binary = pd.DataFrame([[y[0]] + [float(x) for x in y[1:4] + [y[7]] + y[9:]] for y in all_data], columns = h[:4] + [h[7]] + h[9:])

    grouped = df.groupby(["Year", "Month", "Day"])
    grouped_binary = df_binary.groupby(["Year", "Month", "Day"])

    #Run aggregate functions
    df_mean = grouped.mean()
    df_mean.columns = "mean_" + df_mean.columns

    df_min = grouped.min()
    df_min.columns = "min_" + df_min.columns

    df_max = grouped.max()
    df_max.columns = "max_" + df_max.columns

    df_binary_mean = grouped_binary.mean()
    df_binary_mean.columns = "#" + df_binary_mean.columns

    df_counts = grouped.count().iloc[:,:1]
    df_counts.columns = ["percent_reporting"]
    df_counts["percent_reporting"] = df_counts["percent_reporting"] / float(len(all_detectors))

    #Concatenate results of aggregate functions into a single table
    df = pd.concat([df_counts, df_mean, df_min, df_max, df_binary_mean], axis = 1)
    #Convert that table to CSV, and override the old aggregate file
    s = io.StringIO()
    df = df.transpose()
    df.to_csv(s)
    newAggregateData = csvStringToArray(s.getvalue())



    body = {"count" : len(reporting_detectors),"missing" : missed_intersections, "days" : (max_date - min_date).days + 1, "system_x": [round(.05 * x, 2) for x in range(21)]}

    #insert aggregates into dictionary
    for row in newAggregateData:
        body[row[0]] = row[1:]



    temp = {}
    for row in system_metrics:
        if row[0] in ['Days_Good', 'Days_Changed']:
            temp[row[0]] = [float(a) / body["days"] for a in row[1:]]

#calculate pdf for num good
    goodPDF = [0 for x in range(20)]
    for count in temp["Days_Good"]:
        index = int(count / .05)
        if index == 20:
            index = 19
        goodPDF[index] += 1

    goodPDF = [x / sum(goodPDF) for x in goodPDF]

    goodCDF = [1 for x in range(21)]
    for i in range(20):
        goodCDF[i + 1] = goodCDF[i] - goodPDF[i]

#calculate pdf for days changed
    changedPDF = [0 for x in range(20)]
    for count in temp["Days_Changed"]:
        index = int(count / .05)
        if index == 20:
            index = 19
        changedPDF[index] += 1
    changedPDF = [x / sum(changedPDF) for x in changedPDF]
    changedCDF = [1 for x in range(21)]
    for i in range(20):
        changedCDF[i + 1] = changedCDF[i] - changedPDF[i]

    body["productivity"] = [round(x, 10) for x in goodCDF]
    body["stability"] = [round(x, 10) for x in changedCDF]
    #Something to return the newAggregateData
    return respond(None, body)
