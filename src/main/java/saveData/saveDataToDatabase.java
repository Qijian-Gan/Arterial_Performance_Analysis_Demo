package saveData;

import analysis.healthAnalysis.*;

import java.sql.*;
import java.util.*;

/**
 * Created by Qijian_Gan on 9/12/2017.
 */
public class saveDataToDatabase{

    /**
     *
     * @param ps SQL Statement
     * @param string List of SQL Strings
     * @param definedSize Predefined size for batch
     * @return True/false
     */
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

    /**
     *
     * @param ps SQL Statement
     * @param string List of SQL Strings
     * @return True/false
     */
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

    /**
     *
     * @param con Database connection
     * @param dataInput double[][]
     * @param detectorID Detector ID
     * @param year int
     * @param month int
     * @param day int
     * @return True/false
     */
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

    /**
     *
     * @param con Database connection
     * @param detectorHealthMetrics DetectorHealthMetrics
     * @param detectorID Detector ID
     * @param year int
     * @param month int
     * @param day int
     * @return True/false
     */
    public static boolean insertHealthMeasurementToDataBase(Connection con, DetectorHealthMetrics detectorHealthMetrics,
                                                            int detectorID, int year,int month, int day){
        // This function is used to insert health data into database

        try {
            Statement ps=con.createStatement();
            String sql="insert into detector_health values ("+detectorID+","+year+
                    ","+month+","+day+","+detectorHealthMetrics.getMissingRate()+","+detectorHealthMetrics.getMaxZeroValue()+","
                    +detectorHealthMetrics.getHighValueRate()+","+detectorHealthMetrics.getConstantOrNot()+
                    ","+detectorHealthMetrics.getInconsisRateWithoutSpeed()+","+detectorHealthMetrics.getHealth()+");";

            ps.execute(sql);
            return true;
        } catch (SQLException e) {
            System.out.println("Fail to insert:"+ e.getMessage());
            return false;
        }
    }

}
