use itertools::Itertools;

pub fn part1(input: &String) -> usize {
    let lines: Vec<&str> = input.lines().collect();
    // println!("{:?}", lines);
    let split: Vec<_> = lines.split(|line| line.is_empty()).collect();
    // println!("{:?}", split);

    let rules: Vec<_> = split[0]
        .iter()
        .map(|line| {
            let mut split = line.split('|');
            (
                split.next().unwrap().parse::<usize>().unwrap(),
                split.next().unwrap().parse::<usize>().unwrap(),
            )
        })
        .collect();
    println!("rules:{:?}", rules);

    let updates: Vec<Vec<_>> = split[1]
        .iter()
        .map(|line| {
            line.split(',')
                .map(|s| s.parse::<usize>().unwrap())
                .collect()
        })
        .collect();
    println!("updates:{:?}", updates);

    /*
    test.txt:
        rules:[(47, 53), (97, 13), (97, 61), (97, 47), (75, 29), (61, 13), (75, 53), (29, 13), (97, 29), (53, 29), (61, 53), (97, 53), (61, 29), (47, 13), (75, 47), (97, 75), (47, 61), (75, 61), (47, 29), (75, 13), (53, 13)]
        updates:[[75, 47, 61, 53, 29], [97, 61, 53, 29, 13], [75, 29, 13], [75, 97, 47, 61, 53], [61, 13, 29], [97, 13, 75, 29, 47]]
    sum: 143
     */
    // for update in updates {
    //     let tmp: Vec<_> = update
    //         .iter()
    //         .combinations(2)
    //         .map(|v| (v[0], v[1]))
    //         .collect();
    //     println!("  tmp:{:?}", tmp);
    // }
    // let sum = 0;

    let sum: usize = updates
        .iter()
        .filter(|update| {
            !update
                .iter()
                .combinations(2)
                .map(|v| (v[0], v[1]))
                .any(|(&x, &y)| rules.iter().any(|r| r.1 == x && r.0 == y))
        })
        .map(|update| update[update.len() / 2])
        .sum();
    println!("sum: {}", sum);

    return sum;
}

// pub fn part1(input: &String) -> i64 {
//     let mut rules: Vec<Vec<i32>> = vec![];
//     let mut updates: Vec<Vec<i32>> = vec![];
//     for line in input.lines() {
//         if line.is_empty() {
//             break;
//         }
//         let mut rule = vec![];
//         let items: Vec<&str> = line.split('|').collect();
//         // print!("{:#?}", items);
//         // rule.push(items.next().unwrap().parse::<i32>().unwrap());
//         for item in items {
//             rule.push(item.parse::<i32>().unwrap());
//         }
//         // println!("{:#?}", rule);
//         rules.push(rule);
//     }
//     println!("{:#?}", rules);
//     for line in input.lines() {
//         let mut update = vec![];
//         let items: Vec<&str> = line.split(',').collect();
//         // print!("{:#?}", items);
//         // rule.push(items.next().unwrap().parse::<i32>().unwrap());
//         for item in items {
//             update.push(item.parse::<i32>().unwrap());
//         }
//         // println!("{:#?}", rule);
//         updates.push(update);
//     }
//     println!("{:#?}", updates);
//     return 0;
// }
