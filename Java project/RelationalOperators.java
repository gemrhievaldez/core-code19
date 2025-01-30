/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package relationaloperators;

/**
 *
 * @author sir gem
 */
public class RelationalOperators {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       int x = 5;
       int y = 10; 
       int z = 5;
       boolean result; 
       
       System.out.println();
       System.out.println("Relational Operatoin:");
       
       System.out.println();
       System.out.println("Equal to:");
       result = x == y;
       System.out.println(x + " == " + y + " = " + result);
       result = x == z;
       System.out.println(x + " == " + z + " = " + result );
      
       System.out.println();
       System.out.println("Not Equal to:");
       result = x != y;
       System.out.println( x + " != " + y + " = " + result);
       result = x == z;
       System.out.println( x + " == " + z + " = " + result);
       
       System.out.println(); 
       System.out.println ("Greater than:");
       result = y > x;
       System.out.println( y + " > " + x + " = " + result);
       result = x > y;
       System.out.println( x + " > " + y + " = " + result);
       
       System.out.println();
       System.out.println ("Less than: " );
       result = x < y;
       System.out.println( x + " < " + y + " = " + result);
       result = y < z;
       System.out.println(y + " < " + x + " = " + result);

       System.out.println();
       System.out.println("Greater than equal to: ");
       result = y >= x;
       System.out.println(y + " >= " + x + " = " + result);
       result = x >= y;
       System.out.println( x + " >= " + y + "=" + result);

       System.out.println();
       System.out.println("Less than or equal to:");
       result = x <= y;
       System.out.println(x + " <= " + y + " = " + result);
       result = x <= z;
       System.out.println( x + " <= " + y + " = " + result);
       
       
    }
    
}
