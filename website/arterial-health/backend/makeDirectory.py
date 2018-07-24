import csv

intersections = []
intersectionIds = []
numDetectors = {}

with open('Arcadia_arterial_system_detector_config.csv', 'rt') as detectorData:
    reader = csv.reader(detectorData)
    for row in reader:
        if row[1] not in intersectionIds:
            intersections += [row[:5]]
            intersectionIds += [row[1]]
            numDetectors[row[1]] = 1
            print(row)
        else:
            numDetectors[row[1]] += 1

with open('config.csv', 'wt') as config:
    writer = csv.writer(config)
    for row in intersections:
        writer.writerow(row + [numDetectors[row[1]]])
