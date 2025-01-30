package arithmeticoperation; 

import java.util.Scanner;

public class ArithmeticOperation{
     public static void main (String[] args){
         
         Scanner myObj = new Scanner(System.in);
         
         int sum, product, divide, difference;
         int firstNum1, secondNum2;
         
         String myName;
         System.out.print("User name: ");
         myName = myObj.nextLine();
         
         String myAge;
         System.out.print("User Age: ");
         myAge = myObj.nextLine();
         System.out.println();
         
         System.out.print("first Num1: ");
         firstNum1 = myObj.nextInt();
         
         System.out.print("Second Num2: ");
         secondNum2 = myObj.nextInt();
         System.out.println();
         
         sum = firstNum1 + secondNum2;
         product = firstNum1 * secondNum2;
         divide = firstNum1 / secondNum2;
         difference = firstNum1 - secondNum2;
         
         System.out.println("The Sum is: " + sum);
         System.out.println("The Product is: " + product);
         System.out.println("The Divide is: " + divide);
         System.out.println("The Difference is: " + difference); 
         
         
         
         
         
         
         
     }
     
}