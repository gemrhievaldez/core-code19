package dowhileloop1;
import java.util.Scanner;

public class DoWhileLoop1{
    public static void main (String [] args) {
       Scanner scan = new Scanner (System.in);
        System.out.print("Enter your favorite number: ");
        int num1;
        int sum = 0;
        System.out.println("Enter 0 to show the sum of the number you have entered\n");
        do {
            System.out.println("Enter any number: ");
            num1 = scan.nextInt();
            sum = sum + num1;
        }while ( num1 != 0 );
        
        System.out.println("Sum of all number is: " + sum);
       
    }
}