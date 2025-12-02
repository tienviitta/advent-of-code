import { GridPathfinder } from "./GridPathfinder.js";

export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  const pathfinder = new GridPathfinder(lines);
  return pathfinder.findAllPaths();
}
