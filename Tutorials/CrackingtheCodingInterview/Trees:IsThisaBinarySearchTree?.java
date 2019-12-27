/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node class is defined as follows:
    class Node {
        int data;
        Node left;
        Node right;
     }
*/
    Set<Integer> unique=new HashSet<Integer>();

    int getMax(Node root) {
        if (root == null) {
            return -1;
        }
        if (root.right == null) {
            return root.data;
        }
        return getMax(root.right);
    }

    int getMin(Node root) {
        if (root == null) {
            return -1;
        }
        if (root.left == null) {
            return root.data;
        }
        return getMin(root.left);
    }

    boolean checkBST(Node root) {
        if (root == null) {
            return true;
        }
        
        if (unique.contains(root.data)) {
            return false;
        }
        unique.add(root.data);
        
        int leftMax = getMax(root.left);
        int rightMin = getMin(root.right);
        
        
        if (leftMax != -1 && leftMax >= root.data) {
            return false;
        }
        
        if (rightMin != -1 && rightMin <= root.data) {
            return false;
        }
        
        boolean left = checkBST(root.left);
        boolean right = checkBST(root.right);
        
        return left && right;
    }
