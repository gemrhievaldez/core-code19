/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logicaloperator;

/**
 *
 * @author sir gem
 */
public class LogicalOperator {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
      boolean x = true;
      boolean y = false;
      boolean result;
      
      System.out.println("Logical Expression:");
      
      System.out.println();
      System.out.println("Logical AND:");
      result = x && x;
      System.out.println(x + " && " + x + " = " + result);
      result = x && y;
      System.out.println(x + " && " + y + " = " + result);
      result = y && x;
      System.out.println(y + " && " + x + " = " + result);
      result = y && y;
      System.out.println( y + " && " + y + " = " + result);
      
      System.out.println();
      System.out.println("Logical OR:");
      result = x || x;
      System.out.println( x + " || " + x + " = " + result);
      result = x || y;
      System.out.println( x + " || " + y + " = " +  result);
      result = y || x;
      System.out.println( y + " || " + x + " = " + result);
      result = y || y;
      System.out.println( y + " || " + y + " = " + result);
      
      System.out.println();
      System.out.println("Logical NOT: ");
      result = !x;
      System.out.println(" ! " + x + " = " + result);
      result = !y;
      System.out.println(" ! " + y + " = " + result);
      result = !(x && y);
      System.out.println(" !( " + y + " && " + x + " ) = " + result);
      result = !( x || y );
      System.out.println(" !( " + y + " || " + y + " ) = " + result);
      
      
      
      
    }
    
}
