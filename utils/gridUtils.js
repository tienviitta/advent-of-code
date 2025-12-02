// Directions: down, up, right, left
export const DIRECTIONS = [
  [1, 0], // down
  [-1, 0], // up
  [0, 1], // right
  [0, -1], // left
];

// Grid mapping
export const GRIDMAP = {
  ".": 0,
  "#": 1,
};

// Initialize grid with walls to avoid boundary checks
export function makeGridWithWalls(lines, target) {
  const width = lines[0].length;
  const grid = {
    maze: [],
    queue: [],
    visited: new Set(),
    target: target,
  };
  // Top wall
  grid.maze.push(Array(width + 2).fill(GRIDMAP["#"]));
  // Process each line with side walls
  for (let line of lines) {
    const row = [1]; // Left wall
    for (let char of line) {
      switch (char) {
        case ".":
          row.push(GRIDMAP["."]);
          break;
        case "#":
          row.push(GRIDMAP["#"]);
          break;
        default:
          throw new Error("Invalid grid");
      }
    }
    row.push(GRIDMAP["#"]); // Right wall
    grid.maze.push(row);
  }
  // Bottom wall
  grid.maze.push(Array(width + 2).fill(GRIDMAP["#"]));
  return grid;
}

// Count paths (backtracking)
export function dfsGrid(grid, row, col) {
  // Base cases
  if (grid.visited.has(`${row},${col}`) || grid.maze[row][col] == 1) {
    return 0;
  }
  // Check if reached target
  if (row == grid.target[0] && col == grid.target[1]) {
    return 1;
  }
  // Mark as visited
  grid.visited.add(`${row},${col}`);
  // Explore neighbors
  let count = 0;
  for (let [dRow, dCol] of DIRECTIONS) {
    count += dfsGrid(grid, row + dRow, col + dCol);
  }
  // Unmark as visited
  grid.visited.delete(`${row},${col}`);
  return count;
}

// Collect all paths (backtracking)
export function dfsGridPaths(grid, row, col, currentPath = [], allPaths = []) {
  // Base cases
  if (grid.visited.has(`${row},${col}`) || grid.maze[row][col] == 1) {
    return allPaths;
  }
  // Add current position to path
  currentPath.push([row, col]);
  grid.visited.add(`${row},${col}`);
  // Check if reached target
  if (row == grid.target[0] && col == grid.target[1]) {
    // Save a copy of the current path
    allPaths.push([...currentPath]);
    // Backtrack
    currentPath.pop();
    grid.visited.delete(`${row},${col}`);
    return allPaths;
  }
  // Explore neighbors
  for (let [dRow, dCol] of DIRECTIONS) {
    dfsGridPaths(grid, row + dRow, col + dCol, currentPath, allPaths);
  }
  // Backtrack: remove current position and unmark visited
  currentPath.pop();
  grid.visited.delete(`${row},${col}`);
  return allPaths;
}

// Shortest path from row and col using BFS
export function bfsGrid(grid, row, col) {
  // Initialize
  grid.queue.push([row, col]);
  grid.visited.add(`${row},${col}`);
  // BFS loop
  let length = 0;
  while (grid.queue.length > 0) {
    let queueLength = grid.queue.length;
    for (let i = 0; i < queueLength; i++) {
      // Process each cell in current level
      let pair = grid.queue.shift();
      let row = pair[0];
      let col = pair[1];
      // Check if reached target
      if (row == grid.target[0] && col == grid.target[1]) {
        return length;
      }
      // Explore neighbors
      for (let [dRow, dCol] of DIRECTIONS) {
        let newR = row + dRow;
        let newC = col + dCol;
        // Check bounds and visited
        if (grid.visited.has(`${newR},${newC}`) || grid.maze[newR][newC] == 1) {
          continue;
        }
        // Add to queue and mark as visited
        grid.queue.push([newR, newC]);
        grid.visited.add(`${newR},${newC}`);
      }
    }
    length++;
  }
  return length; // This should never be called
}
