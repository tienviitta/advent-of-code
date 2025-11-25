export default function solve(input) {
  const moves = input.trim().split("");
  // console.log(moves);
  // Solution
  let loca = { x: 0, y: 0 };
  const visited = new Set();
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
