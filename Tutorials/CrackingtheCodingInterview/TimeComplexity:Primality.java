import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    public static boolean isPrime(int target) {
        if (target == 2) {
            return true;
        }
        
        if (target <= 1 || (target & 1) == 0) {
            return false;
        }
        
        int ceil = (int)Math.floor(Math.sqrt(target));
        for (int i = 3; i <= ceil; i+=2) {
            if ((target % i) == 0) {
                return false;
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int p = in.nextInt();
        for(int a0 = 0; a0 < p; a0++){
            int n = in.nextInt();
            
            boolean isPrime = isPrime(n);
            System.out.println(isPrime ? "Prime" : "Not prime");
        }
    }
}
