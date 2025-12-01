import fs from "fs";

// Get year and day from command line arguments
const YEAR = process.argv[2];
const DAY = process.argv[3];

// Validate required arguments
if (!YEAR || !DAY) {
  console.error("Usage: npm run create-day <year> <day>");
  process.exit(1);
}

// Create directory structure (e.g., year2023/day01)
const dir = `year${YEAR}/day${DAY.padStart(2, "0")}`;
fs.mkdirSync(dir, { recursive: true });

// Template for solution files
const template = `export default function solve(input) {
  const lines = input.trim().split(/\\r?\\n/);
  // TODO: Implement solution
  return 0;
}
`;

// Create solution and input files
fs.writeFileSync(`${dir}/part1.js`, template);
fs.writeFileSync(`${dir}/part2.js`, template);
fs.writeFileSync(`${dir}/test.txt`, "");
fs.writeFileSync(`${dir}/input.txt`, "");
console.log(`✅ Created template for Year ${YEAR} Day ${DAY}`);
