package jgettinginput;

import javax.swing.*;

public class JGettingInput{
    public static void main (String [] args){
     String firstName = "";
     String lastName = "";
     firstName = JOptionPane.showInputDialog("Please enter your first name " );
     lastName = JOptionPane.showInputDialog("Please enter your last name"); 
     String msg = " Hello " + firstName + lastName + "!";
     JOptionPane.showMessageDialog ( null, msg);
     System.out.println(); 
     
     
    
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
    }
}