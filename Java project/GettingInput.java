package gettinginput;

import java.io.BufferedReader;
import java.io.*;

public class GettingInput{
    public static void main (String [] args){
        
        BufferedReader dataIn = new BufferedReader ( new 
                   InputStreamReader ( System.in ));
        
        
        //Declaring a value 
        int firstNum1 = 0, secondNum2 = 0;
        int sum, difference, divide, product;   
        
        
        //Input User
        String userName; 
        System.out.print("User input: ");
        try{
             userName = dataIn.readLine();
        }catch ( IOException e ){
            System.out.println("Error is getting input");
        }
       
        //User Age
        int myAge;
        System.out.print("User age: ");
        try{
             myAge = dataIn.read();
        }catch ( IOException e ){
            System.out.println("Error is getting input");
        }
        
        String myYear = "";
        System.out.print("User Year: ");
        try{
           myYear = dataIn.readLine();
        }catch ( IOException e ){
            System.out.println("Error is getting input");
        } 
         System.out.println(); 
       
        
        
       
        //Declaring a user number
        System.out.print("First num 1: ");
        try{
            firstNum1 = dataIn.read();
        }catch ( IOException e ){
            System.out.println("Error is getting input");
        }
        System.out.print("Second num 2: ");
        try{
            secondNum2 = dataIn.read();
        }catch ( IOException e ){
            System.out.println("Error is Getting input!");
        }
        System.out.println();
        
        
        
        
        // Proccess of computation 
        sum = firstNum1 + secondNum2;
        difference = firstNum1 - secondNum2; 
        divide = firstNum1 / secondNum2;
        product = firstNum1 * secondNum2; 
        
        System.out.println("The sum is: " + sum );
        System.out.println("The difference is: " + difference );
        System.out.println("The divide is: " + divide);
        System.out.println("The product is: " + product );
        
        
    
      
    
    
    }
    
}