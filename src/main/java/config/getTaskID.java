package config;

import java.util.Scanner;

/**
 * Created by Qijian-Gan on 10/6/2017.
 */
public class getTaskID {
    /**
     *
     * @return int taskID
     */
    public static int getTaskIDFromScreen(){
        int taskID=0;
        // Selection of type of tasks
        Scanner scanner = new Scanner(System.in);
        System.out.print("Please choose one of the following tasks (Be sure to update the configuration file FIRST!):\n");
        System.out.print("1:  Extract Health Results To File\n"); // Extract the health results
        System.out.print("2:  Detector Health Analysis & Data Filtering And Imputation\n"); // Health analysis and data filtering
        System.out.print("Please enter your selection (number):");
        taskID =Integer.parseInt(scanner.next());
        return taskID;
    }
}
