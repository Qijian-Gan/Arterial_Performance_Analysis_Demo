package config;

import java.io.*;
import java.sql.*;
import java.util.*;
import java.util.Date;

import Utility.util;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * Created by Qijian_Gan on 9/12/2017.
 */
public class detectorConfig {

    public static class DetectorProperty
    {
        // Intersection Name, Intersection ID, County, City, Road Name, Direction, Sensor ID, Movement, Status,
        // Detour Route, Detector Length, Distance To Stopbar, Number Of Lanes
        public DetectorProperty(String _IntName, int _IntID, String _County, String _City, String _RoadName,
                                String _Direction, int _SensorID, String _Movement, String _Status, String _DetourRoute,
                                double _Length, double _DistanceToStopbar, int _NumOfLanes){
            this.IntName=_IntName;
            this.IntID=_IntID;
            this.County=_County;
            this.City=_City;
            this.RoadName=_RoadName;
            this.Direction=_Direction;
            this.SensorID=_SensorID;
            this.Movement=_Movement;
            this.Status=_Status;
            this.DetourRoute=_DetourRoute;
            this.Length=_Length;
            this.DistanceToStopbar=_DistanceToStopbar;
            this.NumOfLanes=_NumOfLanes;
        }

        public String IntName;
        public int IntID;
        public String County;
        public String City;
        public String RoadName;
        public String Direction;
        public int SensorID;
        public String Movement;
        public String Status;
        public String DetourRoute;
        public double Length;
        public double DistanceToStopbar;
        public int NumOfLanes;

    }

    public static List<DetectorProperty> readDetectorConfigFromDataBase(Connection con,String organization,Date startDate){
        // This function is used to read detector configuration from database
        List<DetectorProperty> detConfigList = new ArrayList<DetectorProperty>();
        try {
            if(organization.equals("Pasadena")){
                int Year= util.dateToNumber(startDate,"Year");
                int Month= util.dateToNumber(startDate,"Month");
                int Day= util.dateToNumber(startDate,"Day");
                Statement ps = con.createStatement();
                ResultSet resultSet = ps.executeQuery("Select * from detector_inventory where LastUpdateDate="+
                        (Year*10000+Month*100+Day));
                while (resultSet.next()) {
                    String laneStr=resultSet.getString("Lane");
                    int numOfLane=0;
                    if(laneStr.contains("1"))
                        numOfLane=numOfLane+1;
                    if(laneStr.contains("2"))
                        numOfLane=numOfLane+1;
                    if(laneStr.contains("3"))
                        numOfLane=numOfLane+1;
                    if(laneStr.contains("4"))
                        numOfLane=numOfLane+1;
                    if(laneStr.contains("5"))
                        numOfLane=numOfLane+1;
                    if(laneStr.contains("6"))
                        numOfLane=numOfLane+1;
                    numOfLane=Math.max(1,numOfLane);

                    DetectorProperty detectorProperty = new DetectorProperty(
                            resultSet.getString("MainStreet")+"@"+resultSet.getString("CrossStreet"),
                            resultSet.getInt("IntersectionID"), "LA County",
                            "Pasadena", resultSet.getString("MainStreet"),
                            resultSet.getString("Direction"), resultSet.getInt("DetectorID"),
                            resultSet.getString("Type"), "NA",
                            "NA", -1,
                            -1, numOfLane);
                    detConfigList.add(detectorProperty);
                }
            }else {
                Statement ps = con.createStatement();
                ResultSet resultSet = ps.executeQuery("Select * from detector_inventory;");
                while (resultSet.next()) {
                    DetectorProperty detectorProperty = new DetectorProperty(resultSet.getString("IntersectionName"),
                            resultSet.getInt("IntersectionID"), resultSet.getString("County"),
                            resultSet.getString("City"), resultSet.getString("RoadName"),
                            resultSet.getString("Direction"), resultSet.getInt("SensorID"),
                            resultSet.getString("Movement"), resultSet.getString("Status"),
                            resultSet.getString("DetourRoute"), resultSet.getDouble("DetectorLength"),
                            resultSet.getDouble("DistanceToStopbar"), resultSet.getInt("NumOfLanes"));
                    detConfigList.add(detectorProperty);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return detConfigList;
    }

}
