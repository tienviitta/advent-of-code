/*
Add walls of '#' around the given lines
Output example:
  [ '######', 
    '#....#', 
    '###..#', 
    '#...##', 
    '#.#..#', 
    '######' 
  ]
*/
function addWalls(lines) {
  const width = lines[0].length;
  const wallLine = "#".repeat(width + 2);
  let newLines = [wallLine];
  for (let line of lines) {
    newLines.push("#" + line + "#");
  }
  newLines.push(wallLine);
  return newLines;
}

/*
Convert lines of '.' and '#' to a grid of 0s and 1s
Output example:
  [
    [ 1, 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1, 1 ],
    [ 1, 0, 1, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1 ]
  ]
*/
function makeGrid(lines) {
  let grid = [];
  for (let line of lines) {
    let row = [];
    for (let char of line) {
      switch (char) {
        case ".":
          row.push(0);
          break;
        case "#":
          row.push(1);
          break;
        default:
          throw new Error("Invalid grid");
          break;
      }
    }
    grid.push(row);
  }
  return grid;
}

function dfs(grid, row, col, visited) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  // console.log(`Visiting (${row}, ${col})`);
  // If on a wall, return 0 paths
  if (grid[row][col] === 1) {
    return 0;
  }
  // If already visited, return 0 paths
  const posKey = `${row},${col}`;
  if (visited.has(posKey)) {
    return 0;
  }
  // If we reached the bottom-right corner without the walls, found a path
  if (row === numRows - 2 && col === numCols - 2) {
    return 1;
  }
  // Mark as visited
  visited.add(posKey);
  // Explore neighbors (down, up, right, left)
  let numberOfPaths = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    numberOfPaths += dfs(grid, newRow, newCol, visited);
  }
  // Unmark as visited for other paths
  visited.delete(posKey);
  return numberOfPaths;
}

export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  // Count the number of paths from top-left to bottom-right
  const walls = addWalls(lines);
  // console.log(walls);
  const grid = makeGrid(walls);
  // console.log(grid);
  return dfs(grid, 1, 1, new Set());
}
