package main
import (
    "fmt"
    "strconv"
)

func main() {
    var LEN, N int
    fmt.Scanf("%d %d", &LEN, &N)

    seg := make([]int, LEN)
    for i:=0; i < LEN; i++ {
       var str string
       fmt.Scan(&str)
       seg[i], _ = strconv.Atoi(str)
    }

    for j := 0; j < N; j ++ {
        min := 4
        var start, end int
        fmt.Scanf("%d %d", &start, &end)
        for k := start; k <= end; k ++ {
            if seg[k] < min {
                min = seg[k]
            }
        }
        fmt.Printf("%v\n", min)
    }
}
