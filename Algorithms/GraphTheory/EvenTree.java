import java.util.*;

public class Solution {
	
	public static int removed = 0;
	public static HashSet<String> visitedNode = new HashSet<String>();
	public static int removePath(String root,
			Hashtable<String, ArrayList<String>> edgeHash) {
		
		ArrayList<String> childs = edgeHash.get(root);
		visitedNode.add(root);
		int nodeCount = 1;
		for (String child : childs) {
			if (visitedNode.contains(child)){
				continue;
			}
			int childCount = removePath(child, edgeHash);
			if (childCount % 2 == 0) {
				removed++;
			} else {
				nodeCount += childCount;
			}
		}
		return nodeCount;
	}

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		String line = scanner.nextLine();
		String[] cols = line.split(" ");
		int vNum = Integer.parseInt(cols[0]);
		int mNum = Integer.parseInt(cols[1]);

		Hashtable<String, ArrayList<String>> edgeHash = new Hashtable<String, ArrayList<String>>();
		for (int i = 0; i < mNum; i++) {
			String[] vertexs = scanner.nextLine().split(" ");
			ArrayList<String> v1 = edgeHash.get(vertexs[0]);
			ArrayList<String> v2 = edgeHash.get(vertexs[1]);

			if (v1 == null) {
				v1 = new ArrayList<String>();
				edgeHash.put(vertexs[0], v1);
			}

			if (v2 == null) {
				v2 = new ArrayList<String>();
				edgeHash.put(vertexs[1], v2);
			}
			v1.add(vertexs[1]);
			v2.add(vertexs[0]);
		}
		String treeRootKey = edgeHash.keys().nextElement();
		removePath(treeRootKey, edgeHash);
		System.out.println(removed);
	}

}
