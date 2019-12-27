import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {


    /*
     * Complete the highestValuePalindrome function below.
     */
    static String highestValuePalindrome(String s, int n, int r) {
        int K = r;
        char[] chars = s.toCharArray();
        int diff = 0;
        for (int i = 0; i < n / 2 ; i++) {
            if (chars[i] != chars[n - 1 - i]) {
                diff += 1;
            }
        }
        
        //System.out.println("testing:"+diff);
        if (diff > K) {
            return "-1";
        }
        
        for (int i = 0; i < n / 2 ; i++) {
            if (chars[i] == '9' && chars[n - 1 - i] == '9') {
                continue;
            }
            if (chars[i] == chars[n - 1 - i] && K - 2 >= diff ) {
                chars[i] = '9';
                chars[n - 1 - i] = '9';
                K -= 2;
                continue;
            }
            if (chars[i] != chars[n - 1 - i]) {
                if (K > diff) {
                    System.out.println(i + ":" + " change 2");
                    // allow change 2 char
                    
                    if (Character.getNumericValue(chars[i]) != 9 && Character.getNumericValue(chars[n - 1 - i]) != 9) {
                        //System.out.println(i + ":" + " change 2 k - 2");
                        K -= 2;
                    } else {
                        //System.out.println(i + ":" + " change 2 k - 1");
                        K -= 1;
                    }
                    chars[i] = '9';
                    chars[n - 1 - i] = '9';
                } else {
                    // change 1 char
                    
                    if (Character.getNumericValue(chars[i]) > Character.getNumericValue(chars[n - 1 - i])) {
                        chars[n - 1 - i] = chars[i];
                    } else {
                        chars[i] = chars[n - 1 - i];
                    }
                    K -= 1;
                }
                diff -= 1;
            }
        }
        
        /*for (int i = 0; i < n / 2 && K >= 2; i++) {
            if (chars[i] != '9') {
                chars[i] = '9';
                chars[n - 1 - i] = '9';
                K -= 2;
            }
        }*/
        
        
        if (n > 1 && K >= 1 && (n & 1) == 1 && chars[(n / 2)] != '9') {
            chars[(n / 2)] = '9';
            K -= 1;
        }
        if (n == 1 && K >= 1 && chars[0] != '9') {
            chars[0] = '9';
            K -= 1;
        }
        return String.valueOf(chars);
    }


    private static final Scanner scan = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String[] nk = scan.nextLine().split(" ");

        int n = Integer.parseInt(nk[0].trim());

        int k = Integer.parseInt(nk[1].trim());

        String s = scan.nextLine();

        String result = highestValuePalindrome(s, n, k);

        bw.write(result);
        bw.newLine();

        bw.close();
    }
}
