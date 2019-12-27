import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static String super_reduced_string(String s){
        if (s.length() == 0) {
            return "Empty String";
        }
        StringBuffer sb = new StringBuffer();
        char[] chars = s.toCharArray();
        
        int i = 0;
        while (i < chars.length) {
            // find same char
            
            char c = chars[i]; 
            int count = 0;
            
            for (int j = i; j < chars.length; j++) {
                //System.out.println(c);
                if (c == chars[j]) {
                    count += 1;
                } else {
                    break;
                }
            }
            
            //System.out.println(count);
            if ((count % 2) != 0) {
                sb.append(c);
            }
            i += count;
        }
        
        if (sb.length() == 0) {
            return "Empty String";
        } else {
            String result = sb.toString();
            if (result.equals(s)) {
                return result;
            } else {
                return super_reduced_string(result);
            }
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String s = in.next();
        String result = super_reduced_string(s);
        System.out.println(result);
    }
}
