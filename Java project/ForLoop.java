package forloop;

import java.util.Scanner;

public class ForLoop {
    public static void main (String[] args){
        Scanner scan = new Scanner ( System.in);
        
        int z = 0;
        for ( int x = 0; x < 10; x++ )
            for ( int y = 0; y < x; y++)
                z = (x * y);
        System.out.println(" The output is: " + z );
    }
}

  