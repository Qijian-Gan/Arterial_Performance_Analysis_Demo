package config;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import settings.programSettings;

public class loadProgramSettingsFromFile {

    public static programSettings loadProgramSettings(String programSettingFile) {

        programSettings cBlock=new programSettings();
        String confLine;

        System.out.println("Reading in the config file : " + programSettingFile);

        BufferedReader confFile = null ;

        try {
            confFile = new BufferedReader(new FileReader(programSettingFile));
        } catch (FileNotFoundException e) {
            System.out.println("Config file not found, halting");
            System.exit(-1);
        }

        try {

            while ((confLine = confFile.readLine()) != null) {

                confLine = confLine.trim();
                // ignore blank lines and lines that start with a pound symbol (#)
                if ((confLine.length() > 0) && (!confLine.trim().startsWith("#", 0))) {
                    String[] tokens = confLine.split("=");

                    // User name & password
                    if(tokens[0].equals("userName"))
                        cBlock.userName=tokens[1].trim();
                    else if(tokens[0].equals("password")){
                        cBlock.password=tokens[1].trim();
                    }

                    // For performing detector health analysis and data filtering
                    else if(tokens[0].equals("fromDate")){
                        cBlock.fromDate=tokens[1].trim();
                    }else if(tokens[0].equals("toDate")){
                        cBlock.toDate=tokens[1].trim();
                    }else if(tokens[0].equals("dataSourceHealth")){
                        cBlock.dataSourceHealth=tokens[1].trim();
                    }else if(tokens[0].equals("organizationHealth")){
                        cBlock.organizationHealth=tokens[1].trim();
                    }else if(tokens[0].equals("defaultInterval")){
                        cBlock.defaultInterval=Integer.parseInt(tokens[1].trim());
                    }
                    // Thresholds for the TCS Server
                    else if(tokens[0].equals("missingRateThreshold_TCSServer")){
                        cBlock.missingRateThreshold_TCSServer=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("maxZeroValueThreshold_TCSServer")){
                        cBlock.maxZeroValueThreshold_TCSServer=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("highValueRateThreshold_TCSServer")){
                        cBlock.highValueRateThreshold_TCSServer=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("highFlowValue_TCSServer")){
                        cBlock.highFlowValue_TCSServer=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("inconsisRateWithoutSpeedThreshold_TCSServer")){
                        cBlock.inconsisRateWithoutSpeedThreshold_TCSServer=Double.parseDouble(tokens[1].trim());
                    }

                    // Thresholds for the IEN
                    else if(tokens[0].equals("missingRateThreshold_IEN")){
                        cBlock.missingRateThreshold_IEN=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("maxZeroValueThreshold_IEN")){
                        cBlock.maxZeroValueThreshold_IEN=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("highValueRateThreshold_IEN")){
                        cBlock.highValueRateThreshold_IEN=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("highFlowValue_IEN")){
                        cBlock.highFlowValue_IEN=Double.parseDouble(tokens[1].trim());
                    }else if(tokens[0].equals("inconsisRateWithoutSpeedThreshold_IEN")){
                        cBlock.inconsisRateWithoutSpeedThreshold_IEN=Double.parseDouble(tokens[1].trim());
                    }

                    // Settings for imputation
                    else if(tokens[0].equals("spanImputation")){
                        cBlock.spanImputation=Integer.parseInt(tokens[1].trim());
                    }else if(tokens[0].equals("useMedianOrNotImputation")){
                        cBlock.useMedianOrNotImputation=Integer.parseInt(tokens[1].trim());
                    }
                    // Settings for data smoothing
                    else if(tokens[0].equals("methodSmoothing")){
                        cBlock.methodSmoothing=tokens[1].trim();
                    }else if(tokens[0].equals("spanSmoothing")){
                        cBlock.spanSmoothing=Integer.parseInt(tokens[1].trim());
                    }
                    // For extracting detector health analysis (Require configuration file: configDir & configName)
                    else if(tokens[0].equals("healthOutputFolder")){
                        cBlock.healthOutputFolder=tokens[1].trim();
                    }else if(tokens[0].equals("dataSource")){
                        cBlock.dataSource=tokens[1].trim();
                    }else if(tokens[0].equals("organization")){
                        cBlock.organization=tokens[1].trim();
                    }else if(tokens[0].equals("startDateString")){
                        cBlock.startDateString=tokens[1].trim();
                    }else if(tokens[0].equals("endDateString")){
                        cBlock.endDateString=tokens[1].trim();
                    }

                    else{
                        System.out.println("Unkown input:"+tokens[0]);
                    }
                } // If confLine.length() > 0

            } // while read config file

            confFile.close();

        } catch (Exception e) {
            System.out.println("Exceptions have occurred reading the config file!  Exiting!");
            return null;
        }

        return cBlock ;
    }
}
