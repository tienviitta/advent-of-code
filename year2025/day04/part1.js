/*
--- Day 4: Printing Department ---
You ride the escalator down to the printing department. They're clearly getting ready for Christmas; they have lots of large rolls of paper everywhere, and there's even a massive printer in the corner (to handle the really big print jobs).

Decorating here will be easy: they can make their own decorations. What you really need is a way to get further into the North Pole base while the elevators are offline.

"Actually, maybe we can help with that," one of the Elves replies when you ask for help. "We're pretty sure there's a cafeteria on the other side of the back wall. If we could break through the wall, you'd be able to keep moving. It's too bad all of our forklifts are so busy moving those big rolls of paper around."

If you can optimize the work the forklifts are doing, maybe they would have time to spare to break through the wall.

The rolls of paper (@) are arranged on a large grid; the Elves even have a helpful diagram (your puzzle input) indicating where everything is located.

For example:

..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions. If you can figure out which rolls of paper the forklifts can access, they'll spend less time looking and more time breaking down the wall to the cafeteria.

In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.
Consider your complete diagram of the paper roll locations. How many rolls of paper can be accessed by a forklift?

Your puzzle answer was 1495.

--- Part Two ---
Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...
Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?

Your puzzle answer was 8768.
*/
// Directions: down, up, right, left, and diagonals
export const DIRECTIONS = [
  [1, 0], // down
  [-1, 0], // up
  [0, 1], // right
  [0, -1], // left
  [1, 1], // down-right
  [1, -1], // down-left
  [-1, 1], // up-right
  [-1, -1], // up-left
];

// Grid mapping
export const GRIDMAP = {
  ".": 0,
  "@": 1,
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
  grid.maze.push(Array(width + 2).fill(GRIDMAP["."]));
  // Process each line with side walls
  for (let line of lines) {
    const row = [GRIDMAP["."]]; // Left wall
    for (let char of line) {
      switch (char) {
        case ".":
          row.push(GRIDMAP["."]);
          break;
        case "@":
          row.push(GRIDMAP["@"]);
          break;
        default:
          throw new Error("Invalid grid");
      }
    }
    row.push(GRIDMAP["."]); // Right wall
    grid.maze.push(row);
  }
  // Bottom wall
  grid.maze.push(Array(width + 2).fill(GRIDMAP["."]));
  return grid;
}

export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  // console.log(lines);
  // TODO: Implement solution
  const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
  // console.log(grid);
  let total = 0;
  for (let row = 1; row < grid.maze.length - 1; row++) {
    for (let col = 1; col < grid.maze[0].length - 1; col++) {
      // console.log(`Visiting ${row},${col}`);
      if (grid.maze[row][col] !== GRIDMAP["@"]) {
        continue;
      }
      let count = 0;
      for (const [dr, dc] of DIRECTIONS) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (grid.maze[newRow][newCol] === GRIDMAP["@"]) {
          count++;
        }
      }
      if (count < 4) {
        total++;
      }
    }
  }
  return total;
}
