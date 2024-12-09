pub fn is_level_safe(numbers: &Vec<i32>) -> bool {
    let l_win = numbers.len() - 1;
    let left = &numbers[0..l_win];
    let right = &numbers[1..];
    let diff: Vec<i32> = left.iter().zip(right).map(|(a, b)| a - b).collect();
    let incr_in_range = diff.iter().all(|v| (1 <= *v) & (*v <= 3));
    let decr_in_range = diff.iter().all(|v| (-3 <= *v) & (*v <= -1));
    return incr_in_range | decr_in_range;
}
