import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    public static class Node {
        private int id;
        private List<Node> edges;
        
        public Node(int id) {
            this.id = id;
            this.edges = new ArrayList<Node>();
        }
        
        public int getId() {
            return id;
        }
        
        public void addEdge(Node node) {
            this.edges.add(node);
        }
        
        public List<Node> getEdges() {
            return edges;
        }
        
        public String toString() {
            return id + "";
        }
    }
    
    public static class NodeCost {
        private int cost;
        private Node node;
        public NodeCost(Node node, int cost) {
            this.node = node;
            this.cost = cost;
        }
        
        public Node getNode() {
            return node;
        }
            
        public int getCost() {
            return cost;
        }
        
        public void setCost(int cost) {
            this.cost = cost;
        }
    }
    
    public static class Graph {
        private HashMap<Integer, Node> nodes;
        public Graph(int size) {
            nodes = new HashMap<Integer, Node>();
            for (int i = 0; i < size; i++) {
                nodes.put(i, new Node(i));
            }
        }

        public void addEdge(int first, int second) {
            Node u = nodes.get(first);
            Node v = nodes.get(second);
            
            u.addEdge(v);
            v.addEdge(u);
        }
        
        public int shortestPathBFS(Node start, Node end) {
            if (start.getEdges().size() == 0 || end.getEdges().size() == 0) {
                return -1;
            }  
            Queue<Node> queue = new LinkedList<Node>();
            
            HashMap<Integer, Integer> cost = new HashMap<Integer, Integer>();
            
            queue.add(start);
            cost.put(start.getId(), 0);
            
            while (!queue.isEmpty()) {
                Node current = queue.poll();
                
                if (current.getId() == end.getId()) {
                    return cost.get(current.getId());
                }
                
                for (Node n : current.getEdges()) {
                    if (cost.containsKey(n.getId())) {
                        continue;
                    }
                    
                    cost.put(n.getId(), cost.get(current.getId()) + 6);
                    
                    queue.add(n);
                }
            }
            
            return -1;
        }
        
        public int[] shortestReach(int startId) { // 0 indexed
            int results[] = new int[nodes.size()];
            
            for (int i = 0; i < nodes.size(); i++){
                if (i == startId) {
                    continue;
                }
                results[i] = shortestPathBFS(nodes.get(startId), nodes.get(i));
            }
            return results;
        }
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
      
        int queries = scanner.nextInt();
        
        for (int t = 0; t < queries; t++) {
            
            // Create a graph of size n where each edge weight is 6:
            Graph graph = new Graph(scanner.nextInt());
            int m = scanner.nextInt();
            
            // read and set edges
            for (int i = 0; i < m; i++) {
                int u = scanner.nextInt() - 1;
                int v = scanner.nextInt() - 1;
                
                // add each edge to the graph
                graph.addEdge(u, v);
            }
            
            // Find shortest reach from node s
            int startId = scanner.nextInt() - 1;
            int[] distances = graph.shortestReach(startId);
 
            for (int i = 0; i < distances.length; i++) {
                if (i != startId) {
                    System.out.print(distances[i]);
                    System.out.print(" ");
                }
            }
            System.out.println();            
        }
        
        scanner.close();
    }
}
