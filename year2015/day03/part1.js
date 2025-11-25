/* 
--- Day 3: Perfectly Spherical Houses in a Vacuum ---
Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

For example:

> delivers presents to 2 houses: one at the starting location, and one to the east.
^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
*/
export default function solve(input) {
  const moves = input.trim().split("");
  // console.log(moves);
  // Solution
  let loca = { x: 0, y: 0 };
  const visited = new Set();
  visited.add(`${loca.x},${loca.y}`);
  // Loop through each move
  moves.forEach((move) => {
    // console.log(move);
    // Update location based on move
    switch (move) {
      case "^":
        loca.y++;
        break;
      case "v":
        loca.y--;
        break;
      case ">":
        loca.x++;
        break;
      case "<":
        loca.x--;
        break;
    }
    // Add the new location to the set of visited locations
    visited.add(`${loca.x},${loca.y}`);
  });
  // console.log(visited);
  return visited.size;
}
