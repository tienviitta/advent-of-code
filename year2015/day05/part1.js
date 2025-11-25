/*
--- Day 5: Doesn't He Have Intern-Elves For This? ---
Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

It contains at least three vowels (aeiou only), like aei, xazegov, or 
aeiouaeiouaeiou.
It contains at least one letter that appears twice in a row, like xx, 
abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
It does not contain the strings ab, cd, pq, or xy, even if they are part 
of one of the other requirements.

For example:
  - ugknbfddgicrmopn is nice because it has at least three vowels 
  (u...i...o...), a double letter (...dd...), and none of the disallowed 
  substrings.
  - aaa is nice because it has at least three vowels and a double letter, 
  even though the letters used by different rules overlap.
  - jchzalrnumimnmhp is naughty because it has no double letter.
  - haegwjzuvuyypxyu is naughty because it contains the string xy.
  - dvszwmarrgswjxmb is naughty because it contains only one vowel.

  How many strings are nice?
*/
export default function solve(input) {
  // Parse input into individual lines, handling both Unix and Windows line endings
  const lines = input.trim().split(/\r?\n/);

  // Count strings that meet all "nice" criteria
  let niceCount = 0;

  lines.forEach((name) => {
    // Check if string contains at least 3 vowels (aeiou)
    //   /[aeiou]/g finds all vowels (the g flag = global, find all matches)
    //   || [] is a safety fallback: if no matches found, match() returns null, so we default to an empty array
    //   Counts the matches and checks if >= 3
    const hasAtLeastThreeVowels = (name.match(/[aeiou]/g) || []).length >= 3;

    // Check if string has at least one letter appearing twice in a row
    //   (.) captures any single character
    //   \1 is a backreference that matches the same character captured in group 1
    //   Example: matches "aa", "bb", "ee", etc.
    //   Gotcha: This will match any character repeated, not just letters (e.g., "11" or "@@")
    const hasDoubleLetter = /(.)\1/.test(name);

    // Check if string does NOT contain forbidden substrings: ab, cd, pq, xy
    const hasNoDisallowedSubstrings = !/(ab|cd|pq|xy)/.test(name);

    // A string is "nice" only if it meets all three criteria
    if (hasAtLeastThreeVowels && hasDoubleLetter && hasNoDisallowedSubstrings) {
      niceCount++;
    }
  });

  return niceCount;
}
