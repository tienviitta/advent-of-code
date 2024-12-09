use crate::is_level_safe::is_level_safe;

pub fn part2(input: &String) -> i32 {
    let mut n_safe = 0;
    for line in input.lines() {
        let numbers: Vec<i32> = line
            .split_whitespace()
            .map(|s| s.parse::<i32>().unwrap())
            .collect();
        if is_level_safe(&numbers) {
            n_safe += 1;
        } else {
            let l_numbers = numbers.len();
            let mut reduced: Vec<i32> = vec![];
            for i in 0..l_numbers {
                reduced.clone_from(&numbers);
                reduced.remove(i);
                if is_level_safe(&reduced) {
                    n_safe += 1;
                    break;
                }
            }
        }
    }
    return n_safe;
}
