   /* 
    
    class Node 
       int data;
       Node left;
       Node right;
   */   

   void levelOrder(Node root) {
       java.util.LinkedList<Node> queue = new java.util.LinkedList<Node>();
       java.util.LinkedList<Integer> output = new java.util.LinkedList<Integer>();
       
       queue.push(root);
       while (!queue.isEmpty()) {
           Node cur = queue.poll();
           
           output.add(cur.data);
           
           if (cur.left != null) {
               queue.add(cur.left);
           }
           
           if (cur.right != null) {
               queue.add(cur.right);
           }   
       }
       
       StringBuilder sb = new StringBuilder();
       
       if (output.size() > 0) {
           sb.append(output.get(0));
       }
       for (int i = 1; i < output.size(); i++) {
           sb.append(" " + output.get(i));
       }
       
       System.out.println(sb.toString());
   }
