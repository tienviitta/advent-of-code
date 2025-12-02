export class GridPathfinder {
  constructor(lines) {
    this.grid = this.initializeGrid(lines);
    this.numRows = this.grid.length;
    this.numCols = this.grid[0].length;
    this.startRow = 1;
    this.startCol = 1;
    this.targetRow = this.numRows - 2;
    this.targetCol = this.numCols - 2;
    this.visited = new Set();
    this.currentPath = [];
    this.allPaths = [];
    this.directions = [
      [1, 0], // down
      [-1, 0], // up
      [0, 1], // right
      [0, -1], // left
    ];
  }

  /*
  Initialize grid with walls around the edges and convert to 0s and 1s
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
  initializeGrid(lines) {
    const width = lines[0].length;
    const grid = [];

    // Top wall
    grid.push(Array(width + 2).fill(1));

    // Process each line with side walls
    for (let line of lines) {
      const row = [1]; // Left wall
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
        }
      }
      row.push(1); // Right wall
      grid.push(row);
    }

    // Bottom wall
    grid.push(Array(width + 2).fill(1));

    return grid;
  }

  isWall(row, col) {
    return this.grid[row][col] === 1;
  }

  isTarget(row, col) {
    return row === this.targetRow && col === this.targetCol;
  }

  isVisited(row, col) {
    return this.visited.has(`${row},${col}`);
  }

  markVisited(row, col) {
    this.visited.add(`${row},${col}`);
  }

  unmarkVisited(row, col) {
    this.visited.delete(`${row},${col}`);
  }

  // DFS for counting paths
  dfsCount(row, col) {
    // If on a wall, return 0 paths
    if (this.isWall(row, col)) {
      return 0;
    }

    // If already visited, return 0 paths
    if (this.isVisited(row, col)) {
      return 0;
    }

    // If we reached the target, found a path
    if (this.isTarget(row, col)) {
      return 1;
    }

    // Mark as visited
    this.markVisited(row, col);

    // Explore neighbors in all directions
    let numberOfPaths = 0;
    for (let [dRow, dCol] of this.directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;
      numberOfPaths += this.dfsCount(newRow, newCol);
    }

    // Unmark as visited for other paths (backtrack)
    this.unmarkVisited(row, col);

    return numberOfPaths;
  }

  // DFS for collecting all paths
  dfsCollect(row, col) {
    // If on a wall, return
    if (this.isWall(row, col)) {
      return;
    }

    // If already visited, return
    if (this.isVisited(row, col)) {
      return;
    }

    // Add current position to path
    this.currentPath.push([row, col]);
    this.markVisited(row, col);

    // If we reached the target, save the path
    if (this.isTarget(row, col)) {
      this.allPaths.push([...this.currentPath]);
      // Backtrack
      this.currentPath.pop();
      this.unmarkVisited(row, col);
      return;
    }

    // Explore neighbors in all directions
    for (let [dRow, dCol] of this.directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;
      this.dfsCollect(newRow, newCol);
    }

    // Backtrack: remove current position and unmark visited
    this.currentPath.pop();
    this.unmarkVisited(row, col);
  }

  // Count the number of paths from start to target
  numberOfAllPaths() {
    this.visited.clear();
    return this.dfsCount(this.startRow, this.startCol);
  }

  // Find all paths from start to target
  findAllPaths() {
    this.visited.clear();
    this.currentPath = [];
    this.allPaths = [];
    this.dfsCollect(this.startRow, this.startCol);
    return this.allPaths;
  }
}
