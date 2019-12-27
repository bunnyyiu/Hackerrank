import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    static boolean containsUpperCase(String s) {
        return (s == null) ? false : s.matches(".*[A-Z]+.*");
    }
    
    static boolean containsLowerCase(String s) {
        return (s == null) ? false : s.matches(".*[a-z]+.*");
    }
    
    static boolean containsNumber(String s) {
        return (s == null) ? false : s.matches(".*[0-9]+.*");
    }
    
    static boolean containsSymbol(String s) {
        return (s == null) ? false : s.matches(".*[^A-Za-z0-9]+.*");
    }
    
    static int minimumNumber(int n, String password) {
        int lenDiff = n >= 6 ? 0 : 6 - n;
        int charDiff = 0;
        
        if (!containsUpperCase(password)) {
            charDiff++;
        }
        if (!containsLowerCase(password)) {
            charDiff++;
        }
        if (!containsNumber(password)) {
            charDiff++;
        }
        if (!containsSymbol(password)) {
            charDiff++;
        }
        
        return Math.max(lenDiff, charDiff);
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        String password = in.next();
        int answer = minimumNumber(n, password);
        System.out.println(answer);
        in.close();
    }
}
