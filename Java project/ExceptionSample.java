/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptionsample;

/**
 *
 * @author sir gem
 */
public class ExceptionSample {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       try {
           int a []= new int [2];
           System.out.println("Access element three: " + a[3]);
       } catch (ArrayIndexOutOfBoundsException e) {
           System.out.println("Exception thrown: " + e);
       }
       System.out.println("Out of the Block");      
    }
    
    
    
    
}
