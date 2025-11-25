import fs from "fs";

// Parse command line arguments
const YEAR = process.argv[2];
const DAY = process.argv[3];
const PART = process.argv[4];
const USE_TEST = process.argv[5] === "test";

// Validate required arguments
if (!YEAR || !DAY || !PART) {
  console.error("Usage: npm run run <year> <day> <part> [test]");
  process.exit(1);
}

// Determine input file path based on test mode
const inputFileName = USE_TEST ? "test.txt" : "input.txt";
const inputPath = `year${YEAR}/day${DAY.padStart(2, "0")}/${inputFileName}`;
const solutionPath = `../year${YEAR}/day${DAY.padStart(2, "0")}/part${PART}.js`;

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

// Read input file and import solution module
const input = fs.readFileSync(inputPath, "utf-8");
const solution = await import(solutionPath);

// Execute solution and display result
const fileType = USE_TEST ? "(test)" : "";
console.log(`✅ Result for Year ${YEAR} Day ${DAY} Part ${PART} ${fileType}:`);
console.log(solution.default(input));
