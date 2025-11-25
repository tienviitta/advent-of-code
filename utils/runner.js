import fs from 'fs';

const YEAR = process.argv[2];
const DAY = process.argv[3];
const PART = process.argv[4];

if (!YEAR || !DAY || !PART) {
  console.error('Usage: npm run run <year> <day> <part>');
  process.exit(1);
}

const inputPath = `year${YEAR}/day${DAY.padStart(2, '0')}/input.txt`;
const solutionPath = `../year${YEAR}/day${DAY.padStart(2, '0')}/part${PART}.js`;

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const input = fs.readFileSync(inputPath, 'utf-8');
const solution = await import(solutionPath);

console.log(`✅ Result for Year ${YEAR} Day ${DAY} Part ${PART}:`);
console.log(solution.default(input));