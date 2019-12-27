package main
import "fmt"

func main() {
 //Enter your code here. Read input from STDIN. Print output to STDOUT
 var n int
 fmt.Scan(&n)
 for i := 0; i < n; i++ {
     var cycle int
     fmt.Scan(&cycle)
     tmp := 1
     add := false 
     for j := 0; j < cycle; j++ {
         if add {
             tmp += 1
             add = false
         } else {
             tmp *= 2
             add = true
         }
     }
     fmt.Printf("%d\n", tmp)
 }
}