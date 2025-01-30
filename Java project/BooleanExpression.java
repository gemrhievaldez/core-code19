/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package booleanexpression;



import java.util.Scanner; 
/**
 *
 * @author sir gem
 */
public class BooleanExpression {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       Scanner scan = new Scanner( System.in);
       
       System.out.println("Please enter your age: ");
        int myAge = scan.nextInt();
       
       if( myAge >= 18 ) { 
           System.out.println("You are qualified to vote!\nCongrats! ");
        } else if (myAge <= 0 ){
            System.out.println("You have entered invalid age!");
        } else {
           System.out.println("You are not qualified to vote!\nSorry! ");
       }
    
    }
    
    
}
