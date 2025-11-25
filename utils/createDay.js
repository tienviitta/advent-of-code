import fs from 'fs';

const YEAR = process.argv[2];
const DAY = process.argv[3];

if (!YEAR || !DAY) {
  console.error('Usage: npm run create-day <year> <day>');
  process.exit(1);
}

const dir = `year${YEAR}/day${DAY.padStart(2, '0')}`;
fs.mkdirSync(dir, { recursive: true });

const template = `export default function solve(input) {
  const lines = input.trim().split('\n');
  // TODO: Implement solution
  return 0;
}
`;

fs.writeFileSync(`${dir}/part1.js`, template);
fs.writeFileSync(`${dir}/part2.js`, template);
fs.writeFileSync(`${dir}/input.txt`, '');
console.log(`✅ Created template for Year ${YEAR} Day ${DAY}`);