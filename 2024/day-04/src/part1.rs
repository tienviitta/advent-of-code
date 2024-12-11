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

// All possible directions from the X
// XMAS
const XMAS: [char; 4] = ['X', 'M', 'A', 'S'];
const DIRS: [(i64, i64); 8] = [
    (-1, -1),
    (-1, 0),
    (-1, 1),
    (0, -1),
    (0, 1),
    (1, -1),
    (1, 0),
    (1, 1),
];

fn has_xmas(grid: &Vec<Vec<char>>, mut row: i64, mut col: i64, dir: &(i64, i64)) -> bool {
    for x in &XMAS {
        if row < 0 || col < 0 || row >= grid.len() as i64 || col >= grid[0].len() as i64 {
            return false;
        }
        if grid[row as usize][col as usize] != *x {
            return false;
        }
        row += dir.0;
        col += dir.1;
    }
    true
}

pub fn part1(input: &String) -> i64 {
    // Make grid out of the lines
    let grid: Vec<Vec<char>> = input.lines().map(|l| l.chars().collect()).collect();
    let n_rows = grid.len();
    let n_cols = grid[0].len();
    // dbg!(n_rows, n_cols);
    let mut total: i64 = 0;
    for row in 0..n_rows {
        for col in 0..n_cols {
            let row = row as i64;
            let col = col as i64;
            for dir in &DIRS {
                total += has_xmas(&grid, row, col, dir) as i64;
            }
        }
    }
    return total;
}
