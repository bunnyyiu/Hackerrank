import java.io.*;
import java.util.*; 
import java.text.*;
import java.math.*;
import java.util.regex.*;


class CostComparator implements Comparator<Item> {
    public int compare(Item o1, Item o2) {
        return o1.getCost() - o2.getCost();
    }    
}

class ItemComparator implements Comparator<Item> {
    public int compare(Item o1, Item o2) {
        if (o1.getCost() == o2.getCost()) {
            return o1.getIndex() - o2.getIndex();
        }
        return o1.getCost() - o2.getCost();
    }    
}

class Item {
    private int index;
    private int cost;

    public Item(int index, int cost) {
        this.index = index;
        this.cost = cost;
    }

    public Integer getIndex() {
        return index;
    }

    public Integer getCost() {
        return cost;
    }
    
    public String toString() {
        return getIndex() + ":" + getCost();
    }
}

public class Solution {
    static void solve(int[] arr, int money) {
        CostComparator costComparator = new CostComparator();
        ItemComparator itemComparator = new ItemComparator();
        
        Item items[] = new Item[arr.length];
        for (int i = 0; i < arr.length; i++){
            items[i] = new Item(i, arr[i]);
        }
        Arrays.sort(items, itemComparator);
        
        for (int i = 0; i < items.length; i++) {
            Item item1 = items[i];
            int item2Index = Arrays.binarySearch(items, i + 1, items.length, new Item(-1, money - item1.getCost()), costComparator);
            
            if (item2Index >= 0) {
                if (item1.getIndex() < items[item2Index].getIndex()) {
                    System.out.println((item1.getIndex() + 1) + " " + (items[item2Index].getIndex() + 1));
                } else {
                    System.out.println((items[item2Index].getIndex() + 1) + " " + (item1.getIndex() + 1));
                }
                return;
            }
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int t = in.nextInt();
        for(int a0 = 0; a0 < t; a0++){
            int money = in.nextInt();
            int n = in.nextInt();
            int[] arr = new int[n];
            for(int arr_i = 0; arr_i < n; arr_i++){
                arr[arr_i] = in.nextInt();
            }
            solve(arr, money);
        }
        in.close();
    }
}

