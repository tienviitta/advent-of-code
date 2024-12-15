use std::collections::HashMap;

use itertools::Itertools;

pub fn part1(input: &String) -> usize {
    println!("\nPart1:");
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
    // println!("rules:{:?}", rules);

    let updates: Vec<Vec<_>> = split[1]
        .iter()
        .map(|line| {
            line.split(',')
                .map(|s| s.parse::<usize>().unwrap())
                .collect()
        })
        .collect();
    // println!("updates:{:?}", updates);

    /*
    test.txt:
        rules:[(47, 53), (97, 13), (97, 61), (97, 47), (75, 29), (61, 13), (75, 53), (29, 13), (97, 29), (53, 29), (61, 53), (97, 53), (61, 29), (47, 13), (75, 47), (97, 75), (47, 61), (75, 61), (47, 29), (75, 13), (53, 13)]
        updates:[[75, 47, 61, 53, 29], [97, 61, 53, 29, 13], [75, 29, 13], [75, 97, 47, 61, 53], [61, 13, 29], [97, 13, 75, 29, 47]]
    sum: 143
    */
    let mut cache = HashMap::new();
    for rule in &rules {
        cache.insert((rule.0, rule.1), true);
        cache.insert((rule.1, rule.0), false);
    }
    println!("cache:{:?}", cache);

    let sum: usize = updates
        .iter()
        .filter(|update| {
            update
                .iter()
                .combinations(2)
                .map(|v| (v[0], v[1]))
                .all(|(&x, &y)| cache.contains_key(&(x, y)) && *cache.get(&(x, y)).unwrap())
        })
        .map(|update| update[update.len() / 2])
        .sum();

    // for update in updates {
    //     let tmp: Vec<_> = update
    //         .iter()
    //         .combinations(2)
    //         .map(|v| (v[0], v[1]))
    //         .collect();
    //     println!("  tmp:{:?}", tmp);
    // }
    // let sum = 0;

    // let sum: usize = updates
    //     .iter()
    //     .filter(|update| {
    //         !update
    //             .iter()
    //             .combinations(2)
    //             .map(|v| (v[0], v[1]))
    //             .any(|(&x, &y)| rules.iter().any(|r| r.1 == x && r.0 == y))
    //     })
    //     .map(|update| update[update.len() / 2])
    //     .sum();
    // println!("sum: {}", sum);

    return sum;
}
