/*
 Enter your code here. Read input from STDIN. Print output to STDOUT
 Your class should be named Solution
*/
import java.util.*;
class Junction{
    int id;
    double zombieCount;
    HashSet<Integer> edges;
    Junction (int id) {
        this.id = id;
        this.edges = new HashSet<Integer>();
    }
}
class SortByZomieCount implements Comparator<Junction>{

	@Override
	public int compare(Junction arg0, Junction arg1) {
		if (arg0.zombieCount < arg1.zombieCount) {
			return 1;
		} else if (arg0.zombieCount > arg1.zombieCount) {
			return -1;
		} else {
			return 0;
		}
	}
	
}
public class Solution {
	static int TOP = 5;
    public static void main (String args []) {
        Scanner in = new Scanner(System.in);
        int T = in.nextInt();
        for (int t = 0; t < T; t++) {
            int N = in.nextInt();
            int M = in.nextInt();
            int k = in.nextInt();
            
            Junction junctions [] = new Junction [N];
            
            for (int i = 0; i < N; i++) {
                junctions[i] = new Junction(i);
            }
            
            for (int i = 0; i < M; i++) {
                int v1 = in.nextInt();
                int v2 = in.nextInt();
                junctions[v1].edges.add(v2);
                junctions[v2].edges.add(v1);
            }
            
            for (int i = 0; i < N; i++) {
                junctions[i].zombieCount = in.nextInt();
            }
            
            for (int i = 0; i < k; i++) {
                float changes [] = new float [N];
                Arrays.fill(changes, 0);
                for (int j = 0; j < N; j++) {
                    Junction junction = junctions[j];
                    changes[j] -= junction.zombieCount;
                    HashSet<Integer> edges = junction.edges;
                    int edgesCount = edges.size();
                    for (int connectedJunctionId : edges) {
                        changes[connectedJunctionId] += junction.zombieCount / edgesCount;
                    }
                }
                for (int j = 0; j < N; j++) {
                    junctions[j].zombieCount += changes[j];
                }
            }
            Arrays.sort(junctions, new SortByZomieCount());
            
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < TOP - 1; i ++){
            	sb.append((int) Math.round(junctions[i].zombieCount));
            	sb.append(" ");
            }
            sb.append((int) Math.round(junctions[TOP -1].zombieCount));
            System.out.println(sb.toString());
        }
    }
}