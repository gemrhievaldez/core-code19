
package recursion; 


public class Recursion {
  public static int fib(int n)
  {
    if (n <= 1) // base case
      return n;
    else    
      return fib ( n -1 ) + fib ( n - 2);   
  }

  public static void main( String args[] ) {
      int n = 9; 
      System.out.println(fib (n));
  }
} 