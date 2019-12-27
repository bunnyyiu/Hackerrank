import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    static long merge(int arr[], int tmp[], int l, int m, int r) {
        long count = 0;
        
        int i = l;
        int j = m + 1;
        int k = l;
        
        while (i <= m && j <= r) {
            if (arr[i] <= arr[j]) {
                tmp[k++] = arr[i++];
            } else {
                count += (m + 1) - i; 
                tmp[k++] = arr[j++];
            }
        }
        
        while (i <= m) {
            tmp[k++] = arr[i++];
        }
        
        while (j <= r) {
            tmp[k++] = arr[j++];
        }
        
        for (int n = l; n <= r; n++) {
            arr[n] = tmp[n];
        }
        return count;
    }
    
    static long _mergeSort(int arr[], int tmp[], int l, int r) {
         if (l < r) {
            //int m = (l + r) / 2;

            int m = l + (r - l) / 2;
            long count = _mergeSort(arr, tmp, l, m);
            count += _mergeSort(arr, tmp, m + 1, r);
        
            count += merge(arr, tmp, l, m, r);
            return count;
        } else {
            return 0;
        }       
    }
    
    static long mergeSort(int arr[], int l, int r) {
        int tmp[] = new int[arr.length];
        return _mergeSort(arr, tmp, l, r);
    }
    
    static long countInversions(int[] arr) {
        // Complete this function
        long count = mergeSort(arr, 0, arr.length - 1);
        
        //System.out.println(Arrays.toString(arr));
        return count;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int t = in.nextInt();
        for(int a0 = 0; a0 < t; a0++){
            int n = in.nextInt();
            int[] arr = new int[n];
            for(int arr_i = 0; arr_i < n; arr_i++){
                arr[arr_i] = in.nextInt();
            }
            long result = countInversions(arr);
            System.out.println(result);
        }
        in.close();
    }
}
