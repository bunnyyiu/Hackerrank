import java.util.*;

public class Solution {
    
    public static HashMap<Integer, Integer> dpResult = new HashMap<Integer, Integer>();
    public static int fibonacci(int n) {
        
        if (dpResult.containsKey(n)) {
            return dpResult.get(n);
        }
        
        int result = fibonacci(n - 1) + fibonacci(n - 2);
        dpResult.put(n, result);
        
        return result;
    }
    

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        scanner.close();
        
        dpResult.put(0, 0);
        dpResult.put(1, 1);
        System.out.println(fibonacci(n));
    }
}
