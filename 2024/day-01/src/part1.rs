pub fn part1(input: &String) -> i32 {
    let mut left = vec![];
    let mut right = vec![];
    for line in input.lines() {
        let mut items = line.split_whitespace();
        left.push(items.next().unwrap().parse::<i32>().unwrap());
        right.push(items.next().unwrap().parse::<i32>().unwrap());
    }
    left.sort();
    right.sort();
    return std::iter::zip(left, right)
        .map(|(l, r)| (l - r).abs())
        .sum();
}
