use crate::is_level_safe::is_level_safe;

pub fn part1(input: &String) -> i32 {
    let mut n_safe = 0;
    for line in input.lines() {
        let numbers: Vec<i32> = line
            .split_whitespace()
            .map(|s| s.parse::<i32>().unwrap())
            .collect();
        if is_level_safe(&numbers) {
            n_safe += 1;
        }
    }
    return n_safe;
}
