/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author sir gem
 */
public class ArithmeticOperatorDemo {
 public static void main(String []args){
     int x = 13;
     int y = 9;
     double result = 0;
     
     System.out.println("Variables values: ");
     System.out.println (" x = " + x);
     System.out.println (" y = " + y);
     System.out.println ("result = " + result);
     
     System.out.println();
     System.out.println("Arithmetic Operation:");

     result = x + y;
     System.out.println("Addition: x + y = " + result);
     
     result = x - y;
     System.out.println("Subtraction: x - y = " + result);
     
     result = x * y;
     System.out.println("Mutiflication: x * y = " + result);
     
     result = x / y;
     System.out.println("Division: x / y = " + result);
     
     result = x % y;
     System.out.println("Modulus:  x % y = " + result);
     
     result = x++;
     System.out.println("Increment: x++ = " + result);
     
     result = x--;
     System.out.println("Decrement: x-- = " + result);
 }   
}
