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

fn has_xmas(grid: &Vec<Vec<char>>, row: i64, col: i64) -> i64 {
    let mut res = 0;
    if (row - 1) < 0
        || (col - 1) < 0
        || (row + 1) >= grid.len() as i64
        || (col + 1) >= grid[0].len() as i64
    {
        return 0;
    }
    if (grid[(row - 1) as usize][(col - 1) as usize] == 'M'
        && grid[(row + 1) as usize][(col + 1) as usize] == 'S')
        && (grid[(row - 1) as usize][(col + 1) as usize] == 'M'
            && grid[(row + 1) as usize][(col - 1) as usize] == 'S')
    {
        res += 1;
    }
    if (grid[(row - 1) as usize][(col - 1) as usize] == 'M'
        && grid[(row + 1) as usize][(col + 1) as usize] == 'S')
        && (grid[(row - 1) as usize][(col + 1) as usize] == 'S'
            && grid[(row + 1) as usize][(col - 1) as usize] == 'M')
    {
        res += 1;
    }
    if (grid[(row - 1) as usize][(col - 1) as usize] == 'S'
        && grid[(row + 1) as usize][(col + 1) as usize] == 'M')
        && (grid[(row - 1) as usize][(col + 1) as usize] == 'S'
            && grid[(row + 1) as usize][(col - 1) as usize] == 'M')
    {
        res += 1;
    }
    if (grid[(row - 1) as usize][(col - 1) as usize] == 'S'
        && grid[(row + 1) as usize][(col + 1) as usize] == 'M')
        && (grid[(row - 1) as usize][(col + 1) as usize] == 'M'
            && grid[(row + 1) as usize][(col - 1) as usize] == 'S')
    {
        res += 1;
    }
    return res;
}

pub fn part2(input: &String) -> i64 {
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
            if grid[row as usize][col as usize] != 'A' {
                continue;
            }
            total += has_xmas(&grid, row, col);
        }
    }
    return total;
}
