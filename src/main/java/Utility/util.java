package Utility;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.io.File;

/**
 * Created by Qijian_Gan on 9/12/2017.
 */
public class util
{
    public static double[][] convertArrayToMatrix(List<double[]> dataInputArray){

        double [][] dataOutput=new double[dataInputArray.size()][dataInputArray.get(0).length];
        for (int i=0;i<dataInputArray.size();i++){
            dataOutput[i]=dataInputArray.get(i);
        }
        return dataOutput;
    }

    public static List<double[]> convertResultsetToArray(ResultSet resultSet){

        List<double[]> dataOutput=new ArrayList<double[]>();
        try{
            ResultSetMetaData rsmd=resultSet.getMetaData();
            int Column=rsmd.getColumnCount();
            while(resultSet.next()){
                double[] tmp = new double[4];
                if(Column==4) {
                    tmp[0] = resultSet.getDouble("Time");
                    tmp[1] = resultSet.getDouble("Volume");
                    tmp[2] = resultSet.getDouble("Occupancy");
                    tmp[3] = resultSet.getDouble("Speed");
                }else if(Column==5){ // Contains the field "Period"
                    int Period=resultSet.getInt("Period");
                    tmp[0] = resultSet.getDouble("Time");
                    tmp[1] = resultSet.getDouble("Volume")* (60.0/Period); // Aggregate to hourly based
                    tmp[2] = resultSet.getDouble("Occupancy");
                    tmp[3] = resultSet.getDouble("Speed");
                }else{
                    System.out.println("Not the right number of fields in the result set!");
                    System.exit(-1);
                }
                dataOutput.add(tmp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return dataOutput;
    }

    public static int dateToNumber(Date tmpDate, String type){

        SimpleDateFormat Year= new SimpleDateFormat("yyyy");
        SimpleDateFormat Month= new SimpleDateFormat("MM");
        SimpleDateFormat Day= new SimpleDateFormat("dd");

        int year= new Integer(Year.format(tmpDate));
        int month=new Integer(Month.format(tmpDate));
        int day=new Integer(Day.format(tmpDate));

        int dateNum=0;
        if(type.equals("DateNum"))
            dateNum=year*10000+month*100+day;
        else if(type.equals("Year"))
            dateNum=year;
        else if(type.equals("Month"))
            dateNum=month;
        else if(type.equals("Day"))
            dateNum=day;
        else
            System.out.println("Unknown date output type!");

        return dateNum;
    }

    public static Date addDays(Date date, int days)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days);
        return cal.getTime();
    }

    public static double calculateMean(double[] inputArray) {
        // This function is to calculate the mean value

        double sum = 0;
        for (int i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    }

    public static double calculateMedian(double [] inputArray){
        // This function is to calcualte the median value

        double median;

        // Sort the array
        Arrays.sort(inputArray);

        if (inputArray.length % 2 == 0) // If it is even number
            median = (inputArray[inputArray.length/2] + inputArray[inputArray.length/2 - 1])/2;
        else // If it is odd number
            median = inputArray[inputArray.length/2];

        return median;
    }

    public static double [] fromMatrixToArrayByColumn(double [][] inputMatrix, int colNumber, int fromRow, int toRow){
        // This function is to assign the value from a matrix to an array with a given column number

        double [] outputArray= new double[toRow-fromRow+1];

        for(int i=0; i<=toRow-fromRow;i++) {
            outputArray[i]=inputMatrix[i+fromRow][colNumber];
        }

        return outputArray;
    }

    public static double [] copyValueWithoutPointerDouble(double [] input){
        double [] output=new double [input.length];
        for (int i=0;i<input.length;i++){
            output[i]=input[i];
        }
        return output;
    }

}