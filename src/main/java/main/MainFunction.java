package main;

/**
 * Created by Qijian-Gan on 9/23/2017.
 */

import analysis.healthAnalysis;
import config.loadProgramSettingsFromFile;
import config.getTaskID;
import extractData.extractDataToFile;
import settings.programSettings;


import java.io.File;
import java.sql.*;


public class MainFunction{

    // ***********Global settings************
    // Database
    public static String host="jdbc:mysql://localhost:3306/arterial_data_demo?useSSL=false"; // For TCS server
    // Users
    public static String userName="root";
    public static String password="!Ganqijian2017";

    // Variables
    public static Connection con;

    public static programSettings cBlock=new programSettings();
    // ***********Global settings************

    public static void main(String [] args){

        // Selection of type of tasks
        int taskID=0;
        if(args.length>0){
            taskID=Integer.parseInt(args[0].trim());
        }else{
            taskID=getTaskID.getTaskIDFromScreen();
        }

        // Get the program settings
        File configFile = new File("");
        configFile=new File(configFile.getAbsolutePath(),"\\src\\main\\java\\arterialAnalysis.conf");
        System.out.println("Current configuration file path : "+configFile.getAbsolutePath());
        cBlock=loadProgramSettingsFromFile.loadProgramSettings(configFile.getAbsolutePath());

        // Check the selected task
        if(taskID==1){
            System.out.print("1:  Extract Health Results To File\n"); // Extract the health results
            if(cBlock.healthOutputFolder ==null || cBlock.dataSource ==null
                    || cBlock.organization ==null || cBlock.startDateString ==null || cBlock.endDateString ==null ){
                System.out.println("Lacking appropriate settings to extract detector health results!");
                System.exit(-1);
            }
            String hostName;
            if(cBlock.dataSource.equals("TCSServer")) {
                if(cBlock.organization.equals("Arcadia")){// TCS server only for Arcadia
                    String outputFileName="HealthResult_"+cBlock.organization+"_"+cBlock.dataSource+"_"+
                            cBlock.startDateString+"_"+cBlock.endDateString;
                    hostName = host;
                    String curOrganization="Arcadia";
                    extractDataToFile.mainExtractDataToFile(hostName, outputFileName,curOrganization);
                }else {
                    System.out.println("Unkown organization!");
                    System.exit(-1);
                }
            }else {
                System.out.println("Unkown data source!");
                System.exit(-1);
            }
        }else if(taskID==2){
            // Health analysis and data filtering
            System.out.print("2:  Detector Health Analysis & Data Filtering And Imputation\n");
            if(cBlock.fromDate ==null || cBlock.toDate ==null
                    || cBlock.dataSourceHealth ==null || cBlock.organizationHealth ==null || cBlock.defaultInterval ==0 ){
                System.out.println("Lacking appropriate settings to perform detector health analysis and data filtering and imputation!");
                System.exit(-1);
            }
            if(cBlock.spanImputation ==0 || cBlock.useMedianOrNotImputation <0 ||
                    cBlock.methodSmoothing ==null || cBlock.spanSmoothing ==0){
                System.out.println("Lacking appropriate settings for data filtering!");
                System.exit(-1);
            }
            String hostName;
            if(cBlock.dataSourceHealth.equals("TCSServer")) {
                if(cBlock.missingRateThreshold_TCSServer ==0 || cBlock.maxZeroValueThreshold_TCSServer ==0
                        || cBlock.highValueRateThreshold_TCSServer ==0 || cBlock.highFlowValue_TCSServer ==0
                        || cBlock.inconsisRateWithoutSpeedThreshold_TCSServer ==0 ){
                    System.out.println("Lacking appropriate thresholds for detector health analysis!");
                    System.exit(-1);
                }
                if(cBlock.organizationHealth.equals("Arcadia")){// TCS server only for Arcadia
                    hostName = host;
                    healthAnalysis.mainHealthAnalysisAndDataFiltering(hostName,"Arcadia");
                }else {
                    System.out.println("Unkown organization!");
                    System.exit(-1);
                }
            }
            else {
                System.out.println("Unkown data source!");
                System.exit(-1);
            }
        }
        else{
            System.out.println("Unknown task!");
            System.exit(-1);
        }
    }
}
