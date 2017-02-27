package main
import "fmt"
import "math/big"

func f (A, B, N int64) *big.Int {
    if N == 1 {
        return big.NewInt(A)
    }
    if N == 2 {
        return big.NewInt(B)
    }
    n := big.NewInt(A)
    n1 := big.NewInt(B)
    var i int64
    for i = 3; i <= N ; i++ {
        tmp := new(big.Int).Mul(n1, n1);
        tmp2 := new(big.Int).Add(tmp, n);
        n = n1
        n1 = tmp2
    }
    return n1;
}

func main() {
    var A int64;
    var B int64;
    var N int64;
    fmt.Scanf("%d %d %d", &A, &B, &N)
    R:=f(A, B, N)
    fmt.Printf("%d", R)
}
