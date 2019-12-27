/*
Detect a cycle in a linked list. Note that the head pointer may be 'null' if the list is empty.

A Node is defined as: 
    class Node {
        int data;
        Node next;
    }
*/

boolean hasCycle(Node head) {
    if (head == null) {
        return false;
    }
    Node slow = head;
    Node fast = head.next;
    if (fast == null) {
        return false;
    }
    
    fast = fast.next;
    
    while (slow != null && fast != null) {
        if (slow == fast) {
            return true;
        }
        
        slow = slow.next;
        fast = fast.next;
        
        if (fast == null) {
            return false;
        }
        fast = fast.next;
    }
    return false;
}
