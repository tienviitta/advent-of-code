use regex::Regex;

pub fn part2(input: &String) -> i32 {
    let re = Regex::new(r"mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)").unwrap();
    let instrs: Vec<&str> = re.find_iter(&input).map(|m| m.as_str()).collect();
    // dbg!(&instrs);
    let mut accu = 0;
    let mut enabled = true;
    for instr in instrs {
        let parts: Vec<&str> = instr.split('(').collect();
        // dbg!(&parts);
        if parts[0] == "don't" {
            enabled = false;
        } else if parts[0] == "do" {
            enabled = true;
        } else if enabled {
            let parts: Vec<&str> = instr.split(|s| s == '(' || s == ',' || s == ')').collect();
            let x = parts[1].parse::<i32>().unwrap();
            let y = parts[2].parse::<i32>().unwrap();
            accu += x * y;
        }
    }
    return accu;
}