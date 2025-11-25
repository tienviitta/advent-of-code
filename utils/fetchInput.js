import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const YEAR = process.argv[2];
const DAY = process.argv[3];
const SESSION = process.env.AOC_SESSION;

if (!YEAR || !DAY) {
  console.error('Usage: npm run fetch <year> <day>');
  process.exit(1);
}

async function fetchInput(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const res = await fetch(url, {
    headers: { Cookie: `session=${SESSION}` }
  });

  if (!res.ok) {
    console.error(`Failed to fetch input: ${res.statusText}`);
    process.exit(1);
  }

  const text = await res.text();
  const dir = `year${year}/day${day.padStart(2, '0')}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/input.txt`, text.trim());
  console.log(`✅ Input for ${year} Day ${day} saved.`);
}

fetchInput(YEAR, DAY);