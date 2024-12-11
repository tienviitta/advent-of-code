use std::collections::HashMap;

/*
    MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX
*/
pub fn part1(input: &String) -> i32 {
    // Make grid out of the lines
    let grid: Vec<Vec<_>> = input.lines().map(|l| l.chars().collect()).collect();
    let n_rows = grid.len();
    let n_cols = grid[0].len();
    dbg!(n_rows, n_cols);
    // All possible directions from the X
    let directions = [
        (-1, 0),
        (-1, -1),
        (0, -1),
        (1, -1),
        (1, 0),
        (1, 1),
        (0, 1),
        (-1, -1),
    ];
    // XMAS
    let mas: Vec<_> = "MAS".chars().enumerate().map(|(i, c)| (i + 1, c)).collect();
    dbg!(mas);
    for col in 0..n_cols {
        for row in 0..n_rows {
            if grid[col][row] != 'X' {
                continue;
            }
            dbg!(grid[col][row]);
        }
    }
    // for direction in directions {
    //     dbg!(direction);
    // }
    return 0;
}
