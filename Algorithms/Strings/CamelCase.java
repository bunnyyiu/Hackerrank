import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static int camelcase(String s) {
        if (s.length() == 0) {
            return 0;
        }
        int count = 1;
        for (int i = 1; i < s.length(); i++) {
            if (Character.isUpperCase(s.charAt(i))){
                count += 1;
            }
        }
        
        return count;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String s = in.next();
        int result = camelcase(s);
        System.out.println(result);
        in.close();
    }
}
