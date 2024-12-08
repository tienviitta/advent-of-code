pub fn part2(input: &String) -> usize {
    let mut left = vec![];
    let mut right = vec![];
    for line in input.lines() {
        let mut items = line.split_whitespace();
        left.push(items.next().unwrap().parse::<usize>().unwrap());
        right.push(items.next().unwrap().parse::<usize>().unwrap());
    }
    return left
        .iter()
        .map(|l| l * right.iter().filter(|r| &l == r).count())
        .sum();
}
