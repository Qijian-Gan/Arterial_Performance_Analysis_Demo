package saveData;

import analysis.healthAnalysis.*;

import java.sql.*;
import java.util.*;

/**
 * Created by Qijian_Gan on 9/12/2017.
 */
public class saveDataToDatabase{

    public static boolean insertSQLBatch(Statement ps, List<String> string, int definedSize){
        // This function is used to insert SQL batch
        int curSize=0;
        List<String> tmpString= new ArrayList<String>();
        try {
            for (int i = 0; i < string.size(); i++) {
                ps.addBatch(string.get(i));
                tmpString.add(string.get(i));
                curSize=curSize+1;
                if(curSize==definedSize || i==string.size()-1){
                    try {
                        ps.executeBatch();
                    }catch (SQLException e){
                        ps.clearBatch();
                        insertLineByLine(ps, tmpString);
                    }
                    curSize=0;
                    tmpString=new ArrayList<String>();
                    ps.clearBatch();
                }
            }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean insertLineByLine(Statement ps, List<String> string){
        // This function is used to insert line by line

        for (int i=0;i<string.size();i++){
            try{
                ps.execute(string.get(i));
            } catch (SQLException e) {
                System.out.println("Fail to insert: "+e.getMessage());
            }
        }
        return true;
    }

    public static boolean insertProcessedTCSDataToDataBase(Connection con, double [][] dataInput, int detectorID, int year, int month, int day){
        // This function is used to insert processed TCS data to the database
        try {
            // Create a Statement from the connection
            Statement ps=con.createStatement();
            List<String> string= new ArrayList<String>();
            for(int i=0;i<dataInput.length;i++) {
                String sql = "insert into detector_data_processed_"+year+" values ("+detectorID+","+year+
                        ","+month+","+day+","+(int) dataInput[i][0]+","+dataInput[i][1]+","+dataInput[i][2]+","+dataInput[i][3]+");";
                string.add(sql);
            }
            if(string.size()>0){
                insertSQLBatch(ps, string,100);
            }
            return true;
        } catch (SQLException e) {
            //If fail
            System.out.println("Fail to insert the data!");
            return false;
        }
    }

    public static boolean insertHealthMeasurementToDataBase(Connection con, DetectorHealthMetrics detectorHealthMetrics,
                                                            int detectorID, int year,int month, int day){
        // This function is used to insert health data into database

        try {
            Statement ps=con.createStatement();
            String sql="insert into detector_health values ("+detectorID+","+year+
                    ","+month+","+day+","+detectorHealthMetrics.MissingRate+","+detectorHealthMetrics.MaxZeroValue+","
                    +detectorHealthMetrics.HighValueRate+","+detectorHealthMetrics.ConstantOrNot+
                    ","+detectorHealthMetrics.InconsisRateWithoutSpeed+","+detectorHealthMetrics.Health+");";

            ps.execute(sql);
            return true;
        } catch (SQLException e) {
            System.out.println("Fail to insert:"+ e.getMessage());
            return false;
        }
    }

}
