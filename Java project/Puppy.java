/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package puppy;

/**
 *
 * @author sir gem
 */
public class Puppy { 
    public static void main(String[] args) {
       String str1, str2;
       str1 = "Free the bound periodecals.";
       str2 = str1;
       System.out.println("String1: " + str1);
       System.out.println("String2: " + str2);
       System.out.println("Same object? " + (str1 == str2));
       str2 = new String (str1);
       System.out.println("String1: " + str1);
       System.out.println("String2: " + str2);
       System.out.println("Same Object? " + (str1 == str2));
       System.out.println("Same Object? " + str1.equals(str2));
       
    }
    
}
