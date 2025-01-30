package arraylength;

import java.util.Scanner;
 

public class ArrayLength {
    public static void main (String [] args){
       int intArray[] = new int [10];
       
       for( int i = 0; i < intArray.length; i++) {
        intArray[i] = i+1;
    }
       
       for (int i = 0; i <intArray.length; i++) {
           System.out.println("Element index: " + i + ", value: " + intArray[i]);
       }
       
    }
}