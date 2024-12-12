pub mod part1;
pub mod part2;

use std::fs;

use part1::part1;
use part2::part2;

fn main() {
    println!("Advent of Code: day-05");
    let input = fs::read_to_string("./input/test.txt").expect("Unable to read the file!");
    // let input = fs::read_to_string("./input/input.txt").expect("Unable to read the file!");
    let res1 = part1(&input);
    let res2 = part2(&input);
    dbg!(res1, res2);
}
