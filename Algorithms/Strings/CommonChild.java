import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static int commonChild(String s1, String s2){
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();
        
        int lastMatchI = -1;
        int lastMatchJ = -1;
        
        int len = 0;
        
        for (int i = lastMatchI + 1; i < c1.length; i++) {
            for (int j = lastMatchJ + 1; j < c2.length; j++) {
                if (c1[i] == c2[j]) {
                    lastMatchI = i;
                    lastMatchJ = j;
                    len++;
                    break;
                }
            }
        }
        
        return len;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String s1 = in.next();
        String s2 = in.next();
        int result = commonChild(s1, s2);
        System.out.println(result);
    }
}
