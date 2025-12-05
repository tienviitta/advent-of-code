import { performance } from "perf_hooks";
/*
--- Day 5: Cafeteria ---
As the forklifts break through the wall, the Elves are delighted to discover that there was a cafeteria on the other side after all.

You can hear a commotion coming from the kitchen. "At this rate, we won't have any time left to put the wreaths up in the dining hall!" Resolute in your quest, you investigate.

"If only we hadn't switched to the new inventory management system right before Christmas!" another Elf exclaims. You ask what's going on.

The Elves in the kitchen explain the situation: because of their complicated new inventory management system, they can't figure out which of their ingredients are fresh and which are spoiled. When you ask how it works, they give you a copy of their database (your puzzle input).

The database operates on ingredient IDs. It consists of a list of fresh ingredient ID ranges, a blank line, and a list of available ingredient IDs. For example:

3-5
10-14
16-20
12-18

1
5
8
11
17
32
The fresh ID ranges are inclusive: the range 3-5 means that ingredient IDs 3, 4, and 5 are all fresh. The ranges can also overlap; an ingredient ID is fresh if it is in any range.

The Elves are trying to determine which of the available ingredient IDs are fresh. In this example, this is done as follows:

Ingredient ID 1 is spoiled because it does not fall into any range.
Ingredient ID 5 is fresh because it falls into range 3-5.
Ingredient ID 8 is spoiled.
Ingredient ID 11 is fresh because it falls into range 10-14.
Ingredient ID 17 is fresh because it falls into range 16-20 as well as range 12-18.
Ingredient ID 32 is spoiled.
So, in this example, 3 of the available ingredient IDs are fresh.

Process the database file from the new inventory management system. How many of the available ingredient IDs are fresh?

Your puzzle answer was 865.

--- Part Two ---
The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

3-5
10-14
16-20
12-18
The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?

Your puzzle answer was 352556672963116.
*/
export default function solve(input) {
  const startTotal = performance.now();

  const lines = input.trim().split(/\r?\n/);

  // === STEP 1: Parse fresh ingredient ID ranges ===
  // Extract all ranges from the first section of input (before blank line)
  // Each line format: "start-end" (e.g., "3-5" means IDs 3, 4, 5 are fresh)
  const startParse = performance.now();
  const ranges = [];
  let i = 0;
  while (i < lines.length && lines[i] !== "") {
    const [start, end] = lines[i].split("-").map(Number);
    ranges.push({ start, end });
    i++;
  }
  const endParse = performance.now();

  // === STEP 2: Merge overlapping/adjacent ranges ===
  // This is crucial for performance: instead of counting individual IDs in 186 ranges,
  // we merge them into ~80 non-overlapping ranges. This also handles overlaps correctly
  // so we don't double-count IDs that appear in multiple ranges.
  // Example: [3-5] and [4-7] become [3-7]
  const startMerge = performance.now();
  const mergedRanges = mergeRanges(ranges);
  const endMerge = performance.now();
  console.log(`Reduced from ${ranges.length} to ${mergedRanges.length} ranges`);

  // === STEP 3: Count total fresh IDs ===
  // Now that ranges are merged and non-overlapping, we can simply sum up
  // the size of each range: (end - start + 1)
  const startCheck = performance.now();
  const freshCount = countFresh(mergedRanges);
  const endCheck = performance.now();

  const endTotal = performance.now();

  console.log(`\nPerformance breakdown:`);
  console.log(`  Parse ranges:  ${(endParse - startParse).toFixed(3)}ms`);
  console.log(`  Merge ranges:  ${(endMerge - startMerge).toFixed(3)}ms`);
  console.log(`  Count ranges:     ${(endCheck - startCheck).toFixed(3)}ms`);
  console.log(`  Total time:    ${(endTotal - startTotal).toFixed(3)}ms`);

  return freshCount;
}

/**
 * Merges overlapping and adjacent ranges into non-overlapping ranges.
 *
 * Algorithm:
 * 1. Sort ranges by start position (O(n log n))
 * 2. Iterate through sorted ranges (O(n))
 * 3. If current range overlaps or is adjacent to last merged range, extend it
 * 4. Otherwise, add current range as a new separate range
 *
 * Examples:
 * - [3-5, 10-14, 12-18] → [3-5, 10-18] (12-18 overlaps with 10-14)
 * - [3-5, 6-8] → [3-8] (adjacent ranges get merged)
 * - [3-5, 10-14] → [3-5, 10-14] (no overlap, keep separate)
 *
 * Time complexity: O(n log n) due to sorting
 * Space complexity: O(n) for the merged array
 */
function mergeRanges(ranges) {
  if (ranges.length === 0) return [];

  // Sort ranges by start position so we can process them left-to-right
  // Using slice() to avoid mutating the original array
  const sorted = ranges.slice().sort((a, b) => a.start - b.start);

  // Initialize with the first range
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    // Check if current range overlaps or is adjacent to the last merged range
    // "Adjacent" means ranges like [3-5] and [6-8] which should merge to [3-8]
    // That's why we check: current.start <= last.end + 1
    if (current.start <= last.end + 1) {
      // Merge by extending the end if current range extends further
      // Example: last=[10-14], current=[12-18] → last becomes [10-18]
      last.end = Math.max(last.end, current.end);
    } else {
      // No overlap or adjacency, add current range as a new separate range
      merged.push(current);
    }
  }

  return merged;
}

/**
 * Counts the total number of fresh ingredient IDs across all ranges.
 *
 * Since ranges are already merged and non-overlapping, we can simply
 * sum up the size of each range.
 *
 * Formula for range size: (end - start + 1)
 * - Range [3-5] has 3 IDs: 3, 4, 5 → (5 - 3 + 1) = 3
 * - Range [10-14] has 5 IDs: 10, 11, 12, 13, 14 → (14 - 10 + 1) = 5
 *
 * Time complexity: O(n) where n is the number of merged ranges
 */
function countFresh(ranges) {
  let total = 0;
  for (const range of ranges) {
    // Calculate how many IDs are in this range (inclusive on both ends)
    total += range.end - range.start + 1;
  }
  return total;
}
