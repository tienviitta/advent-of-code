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
const CHECKS: [[char; 4]; 4] = [
    ['M', 'M', 'S', 'S'],
    ['M', 'S', 'S', 'M'],
    ['S', 'S', 'M', 'M'],
    ['S', 'M', 'M', 'S'],
];

fn has_xmas(grid: &Vec<Vec<char>>, row: i64, col: i64) -> i64 {
    let xmas: [char; 4] = [
        grid[(row - 1) as usize][(col - 1) as usize],
        grid[(row - 1) as usize][(col + 1) as usize],
        grid[(row + 1) as usize][(col + 1) as usize],
        grid[(row + 1) as usize][(col - 1) as usize],
    ];
    for check in CHECKS {
        if check.iter().zip(&xmas).all(|(c, x)| c == x) {
            return 1;
        }
    }
    return 0;
}

pub fn part2(input: &String) -> i64 {
    // Make grid out of the lines
    let grid: Vec<Vec<char>> = input.lines().map(|l| l.chars().collect()).collect();
    let n_rows = grid.len();
    let n_cols = grid[0].len();
    // dbg!(n_rows, n_cols);
    let mut total: i64 = 0;
    for row in 1..n_rows - 1 {
        for col in 1..n_cols - 1 {
            let row = row as i64;
            let col = col as i64;
            if grid[row as usize][col as usize] != 'A' {
                continue;
            }
            total += has_xmas(&grid, row, col);
        }
    }
    return total;
}
