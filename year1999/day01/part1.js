import { makeGridWithWalls, dfsGrid } from "../../utils/gridUtils.js";

export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  let grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
  console.log("Number of paths:");
  return dfsGrid(grid, 1, 1);
}
