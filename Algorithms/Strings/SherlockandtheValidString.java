import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static String isValid(String s){
        HashMap<Character, Integer> counts = new HashMap<Character, Integer>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (counts.containsKey(c)) {
                counts.put(c, counts.get(c) + 1);
            } else {
                counts.put(c, 1);
            }
        }
        
        HashMap<Integer, Integer> appearCount = new HashMap<Integer, Integer>();
        
        for (Integer count : counts.values()) {
            if (appearCount.containsKey(count)) {
                appearCount.put(count, appearCount.get(count) + 1);
            } else {
                appearCount.put(count, 1);
            }
        }
        
        if (appearCount.size() == 1) {
            return "YES";
        } else if (appearCount.size() > 2) {
            return "NO";
        } else {
            int appearOne = -1;
            int appearMoreThanOne = -1;
            for (int count: appearCount.keySet()) {
                if (appearCount.get(count) == 1) {
                   appearOne = count;
                } else {
                    appearMoreThanOne = count;
                }
            }
            if (appearOne == 1 && appearCount.get(1) == 1) {
                return "YES";
            }
            if (appearOne - 1 == appearMoreThanOne) {
                return "YES";
            }
            return "NO";
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String s = in.next();
        String result = isValid(s);
        System.out.println(result);
    }
}
