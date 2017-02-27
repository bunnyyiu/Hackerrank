package main

import (
  "fmt"
  "sort"
  "strings"
)

type Node struct {
  Childs   map[string]*Node
  MaxIndex int
}

var (
  root = Node{make(map[string]*Node), 0}
)

func makeSubString(input string) {
  for i, _len := 0, len(input); i < _len; i++ {
    buildSufixTree(&root, input[i:])
  }
}

func min(n1, n2 int) (min int) {
  if n1 <= n2 {
    min = n1
  } else {
    min = n2
  }
  return min
}

func match(input1, input2 string) int {
  if input1 == input2 {
    return len(input1) - 1
  }
  minLen := min(len(input1), len(input2))
  for i := 0; i < minLen; i++ {
    if input1[i:i+1] != input2[i:i+1] {
      return i - 1
    }
  }

  return minLen - 1
}

func buildSufixTree(current *Node, suffix string) {
  if _, ok := current.Childs[suffix]; ok {
    return
  }
  lastMatchIndex := -1
  matchedEdge := ""
  var matchedNode *Node
  for key, node := range current.Childs {
    tmpMatchIndex := match(suffix, key)

    if tmpMatchIndex != -1 {
      lastMatchIndex = tmpMatchIndex
      matchedEdge = key
      matchedNode = node
      break
    }
  }

  if lastMatchIndex == -1 {
    current.Childs[suffix] = &Node{make(map[string]*Node), 0}
  } else if lastMatchIndex != len(matchedEdge)-1 {
    newEdge := matchedEdge[:lastMatchIndex+1]
    newChildEdge := matchedEdge[lastMatchIndex+1:]
    newChildEdge2 := suffix[lastMatchIndex+1:]

    newChild := &Node{make(map[string]*Node), 0}
    newChild.Childs[newChildEdge] = matchedNode
    newChild.Childs[newChildEdge2] = &Node{make(map[string]*Node), 0}

    delete(current.Childs, matchedEdge)
    current.Childs[newEdge] = newChild
  } else {
    nextEdge := suffix[lastMatchIndex+1:]
    buildSufixTree(matchedNode, nextEdge)
  }
}

func findIndex(current Node, index int, currentIndex *int, prefix string) string {
  if index > current.MaxIndex {
    return "INVALID"
  }

  childs := current.Childs
  numOfChild := len(childs)
  sortedChildsEdge := make([]string, 0, numOfChild)

  for key, _ := range childs {
    sortedChildsEdge = append(sortedChildsEdge, key)
  }
  sort.Strings(sortedChildsEdge)

  for _, edge := range sortedChildsEdge {
    node, _ := childs[edge]
    edgeLen := len(edge)
    if edge[edgeLen-1:] == "$" {
      edgeLen -= 1
    }

    if index > node.MaxIndex {
      *currentIndex = node.MaxIndex
      continue
    }

    if index-*currentIndex <= edgeLen {
      return strings.Join([]string{prefix, edge[:index-*currentIndex]}, "")
    } else {
      *currentIndex += edgeLen
      newPrefix := strings.Join([]string{prefix, edge[:edgeLen]}, "")
      result := findIndex(*node, index, currentIndex, newPrefix)
      if result != "INVALID" {
        return result
      }
    }
  }
  return "INVALID"
}

func findMaxIndex(current *Node, currentIndex *int) {
  childs := current.Childs
  numOfChild := len(childs)
  sortedChildsEdge := make([]string, 0, numOfChild)

  for key, _ := range childs {
    sortedChildsEdge = append(sortedChildsEdge, key)
  }
  sort.Strings(sortedChildsEdge)

  for _, edge := range sortedChildsEdge {
    node := childs[edge]
    edgeLen := len(edge)
    if edge[edgeLen-1:] == "$" {
      edgeLen -= 1
    }
    *currentIndex += edgeLen
    findMaxIndex(node, currentIndex)
  }
  current.MaxIndex = *currentIndex
}

func main() {
  var numOfTest, numOfQuery, index int
  var line string
  fmt.Scanf("%d", &numOfTest)
  for i := 0; i < numOfTest; i++ {
    fmt.Scanf("%s", &line)
    newStr := strings.Join([]string{line, "$"}, "")
    makeSubString(newStr)
  }
  maxIndex := -1
  findMaxIndex(&root, &maxIndex)
  fmt.Scanf("%d", &numOfQuery)
  for i := 0; i < numOfQuery; i++ {
    fmt.Scanf("%d", &index)
    index -= 1
    var currentIndex = -1
    if index <= maxIndex {
      results := findIndex(root, index, &currentIndex, "")
      fmt.Println(results)
    } else {
      fmt.Println("INVALID")
    }
  }
}
