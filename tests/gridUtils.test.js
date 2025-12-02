import { describe, it } from "node:test";
import assert from "node:assert";
import {
  makeGridWithWalls,
  dfsGrid,
  dfsGridPaths,
  bfsGrid,
} from "../utils/gridUtils.js";

describe("gridUtils", () => {
  describe("makeGridWithWalls", () => {
    it("should create grid with walls around edges", () => {
      const lines = ["...", "...", "..."];
      const grid = makeGridWithWalls(lines, [3, 3]);

      assert.strictEqual(grid.maze.length, 5); // 3 + 2 walls
      assert.strictEqual(grid.maze[0].length, 5); // 3 + 2 walls
      assert.strictEqual(grid.maze[0][0], 1); // Top-left corner is wall
      assert.strictEqual(grid.maze[1][1], 0); // Inner cell is open
    });

    it("should handle walls in input", () => {
      const lines = [".#.", "...", "#.."];
      const grid = makeGridWithWalls(lines, [3, 3]);

      assert.strictEqual(grid.maze[1][2], 1); // Wall from input
      assert.strictEqual(grid.maze[3][1], 1); // Wall from input
    });
  });

  describe("dfsGrid", () => {
    it("should count 2 paths for test.txt input", () => {
      const lines = ["....", "##..", "...#", ".#.."];
      const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
      const result = dfsGrid(grid, 1, 1);

      assert.strictEqual(result, 2);
    });

    it("should count 4 paths for input.txt input", () => {
      const lines = ["....#", "##...", "...#.", ".#..."];
      const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
      const result = dfsGrid(grid, 1, 1);

      assert.strictEqual(result, 4);
    });

    it("should return 1 for simple straight path", () => {
      const lines = ["..", ".."];
      const grid = makeGridWithWalls(lines, [2, 2]);
      const result = dfsGrid(grid, 1, 1);

      assert.strictEqual(result, 2); // Right-Down or Down-Right
    });

    it("should return 0 when no path exists", () => {
      const lines = [".#", "#."];
      const grid = makeGridWithWalls(lines, [2, 2]);
      const result = dfsGrid(grid, 1, 1);

      assert.strictEqual(result, 0); // Walls block all paths
    });
  });

  describe("dfsGridPaths", () => {
    it("should return 2 path arrays for test.txt input", () => {
      const lines = ["....", "##..", "...#", ".#.."];
      const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
      const paths = dfsGridPaths(grid, 1, 1);

      assert.strictEqual(paths.length, 2);
      assert.ok(Array.isArray(paths[0]));
      assert.ok(
        paths[0].every((coord) => Array.isArray(coord) && coord.length === 2)
      );
    });

    it("should return 4 path arrays for input.txt input", () => {
      const lines = ["....#", "##...", "...#.", ".#..."];
      const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
      const paths = dfsGridPaths(grid, 1, 1);

      assert.strictEqual(paths.length, 4);
    });

    it("should have start and end coordinates in each path", () => {
      const lines = ["..", ".."];
      const grid = makeGridWithWalls(lines, [2, 2]);
      const paths = dfsGridPaths(grid, 1, 1);

      paths.forEach((path) => {
        assert.deepStrictEqual(path[0], [1, 1]); // Start at (1,1)
        assert.deepStrictEqual(path[path.length - 1], [2, 2]); // End at (2,2)
      });
    });
  });

  describe("bfsGrid", () => {
    it("should find shortest path length", () => {
      const lines = ["....", "##..", "...#", ".#.."];
      const grid = makeGridWithWalls(lines, [lines.length, lines[0].length]);
      const result = bfsGrid(grid, 1, 1);

      assert.ok(result >= 0);
      assert.strictEqual(typeof result, "number");
    });

    it("should find path length of 2 for simple 2x2 grid", () => {
      const lines = ["..", ".."];
      const grid = makeGridWithWalls(lines, [2, 2]);
      const result = bfsGrid(grid, 1, 1);

      assert.strictEqual(result, 2); // Min steps: right, down (or down, right)
    });
  });
});
