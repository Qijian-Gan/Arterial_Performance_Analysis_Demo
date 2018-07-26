# Arterial_Performance_Analysis_Demo
This is the Repo (demo) to analyze data quality from arterial loop sensors. It consists of two parts: 

- detector health analysis module (in the "src" folder),
- arterial performance dashboard (in the "website" folder). 

## Before you run the detector health analysis module
- You need to load the data dump "Dump_20180723_Arcadia.sql" into the MySQL database. You also need to change the settings of "host", "userName", and "password" correspondingly in src\main\java\main\MainFunction.java.

- The data we used is in the interval of 5 minutes. The test site is the arterial network in Arcadia, CA.
  
## When you run the detector health analysis module

- You can change the configuration in src\main\java\arterialAnalysis.conf: (i) date and time settings,
(ii) detector health thresholds, and (iii) imputation and smoothing parameters.

- This module enables you to: (i) extract health results to an excel file; and (ii) perform detector health analysis and data filtering and imputation.

- This module checks the arterial data for the following error types (diagnostic states): (i) no data, (ii) insufficient data, (iii) 
card off, (iv) high value, (v) constant value, (vi) inconsistent data. 

- Currently, we only apply moving averages to impute and smooth the data. More advanced methods may be applied in the future.

## For the arterial performance dashboard
- It is not going to run locally since it is implemeted in the AWS cloud.
- It uses AWS Lambda for computing, and AWS S3 for storage.
- This module consists of two components : (i) front-end; and (ii) back-end. The front-end component handles all user requests.
The back-end component performs data aggregation and generates outputs for the front-end queries. 
- The performance metrics are aggregated from detector level to intersection level. 
- The following diagnostic states can be displayed at the intersection or even corridor level: (i) missing rate, (ii) max 
zero value, (iii) constant or not, (iv) inconsistent rate, (v) high value rate.
- The following system-level performance metrics can be displayed at the intersection or even corridor level: (i) health, (ii) 
good detectors, (iii) productivity, (iv) stability. 

