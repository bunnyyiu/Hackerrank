package main
import "fmt"

func main() {
    var a, b, max int
    fmt.Scan(&a)
    fmt.Scan(&b)
    max = -1
    
    for i := a; i <= b; i++ {
        for j := i; j <= b; j++ {
            tmp := i ^ j
            if tmp > max {
                max = tmp
            }
        }
    }
    fmt.Printf("%v\n", max)
}