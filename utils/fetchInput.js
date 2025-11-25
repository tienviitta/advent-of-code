import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Get year and day from command line arguments
const YEAR = process.argv[2];
const DAY = process.argv[3];
// Get session cookie from environment variables
const SESSION = process.env.AOC_SESSION;

// Validate required arguments
if (!YEAR || !DAY) {
  console.error("Usage: npm run fetch <year> <day>");
  process.exit(1);
}

/**
 * Fetches Advent of Code input for a specific year and day
 * @param {string} year - The year of the puzzle
 * @param {string} day - The day of the puzzle
 */
async function fetchInput(year, day) {
  // Construct the URL for the input
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  // Fetch the input with session authentication
  const res = await fetch(url, {
    headers: { Cookie: `session=${SESSION}` },
  });

  // Handle fetch errors
  if (!res.ok) {
    console.error(`Failed to fetch input: ${res.statusText}`);
    process.exit(1);
  }

  // Get the response text
  const text = await res.text();

  // Create directory structure (e.g., year2023/day01)
  const dir = `year${year}/day${day.padStart(2, "0")}`;
  fs.mkdirSync(dir, { recursive: true });

  // Save the input to a file
  fs.writeFileSync(`${dir}/input.txt`, text.trim());
  console.log(`✅ Input for ${year} Day ${day} saved.`);
}

// Execute the fetch
fetchInput(YEAR, DAY);
