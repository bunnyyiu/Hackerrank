read x
read y
read z

count=$(echo "$x $y $z" | tr " " "\n" | sort -u | wc -w)

if [[ $count -eq 1 ]]; then
    echo "EQUILATERAL"
elif [[ $count -eq 2 ]]; then
    echo "ISOSCELES"
else
    echo "SCALENE"
fi