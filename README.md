# Advent of Code JavaScript Boilerplate

This project automates input fetching and solution running for Advent of Code challenges.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your Advent of Code session cookie:
   ```
   AOC_SESSION=your_session_cookie_here
   ```

### How to Get Your Session Cookie

1. Log in to [Advent of Code](https://adventofcode.com/)
2. Open Chrome DevTools (F12 or Right-click → Inspect)
3. Go to the **Application** tab
4. In the left sidebar, expand **Cookies** and click on `https://adventofcode.com`
5. Find the cookie named `session`
6. Copy its **Value** (it's a long hexadecimal string)
7. Paste this value in your `.env` file as `AOC_SESSION=your_session_cookie_here`

Other browser should have similar cookie named `session` available. Happy coding!

## Usage

### Create a New Day Solution

```bash
npm run create-day <year> <day>
```

Example:

```bash
npm run create-day 2015 3
```

This creates a new directory structure:

```
year<year>/
  day<day>/
    part1.js
    part2.js
    input.txt
    test.txt
```

### Fetch Input

```bash
npm run fetch <year> <day>
```

Example:

```bash
npm run fetch 2015 3
```

This downloads the puzzle input from Advent of Code and saves it as `input.txt` in the day's folder.

### Run Solutions

```bash
npm run run <year> <day> <part> [test]
```

Examples:

```bash
# Run with input.txt
npm run run 2015 3 1

# Run with test.txt
npm run run 2015 3 1 test
```

The optional `test` flag allows you to test your solution with the `test.txt` file before running it on the actual input.

## Extra: How the Runner Works

The runner script dynamically loads and executes your solution:

```javascript
const input = fs.readFileSync(inputPath, "utf-8");
const solution = await import(solutionPath);
console.log(solution.default(input));
```

### Why `await` with `import()`?

**Dynamic imports are always asynchronous** and return a Promise, even if the module itself is synchronous.

- `import()` (dynamic import) happens at runtime and returns `Promise<Module>`
- `import` statements (static) happen at compile time
- The `await` keyword is required to unwrap the Promise and access the actual module

Without `await`:

```javascript
const solution = import(solutionPath); // ❌ Returns Promise { <pending> }
```

With `await`:

```javascript
const solution = await import(solutionPath); // ✅ Returns the actual module
solution.default(input); // Now we can call the exported function
```

This allows the runner to work in an ES module context and dynamically load solution files based on command-line arguments.
