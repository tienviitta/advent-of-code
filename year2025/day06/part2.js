export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  // console.log(lines);
  const nums = lines.slice(0, lines.length - 1);
  // console.log(nums);
  const operands = lines[lines.length - 1];
  // console.log(operands);
  let acc = 0;
  let ops = operands[0];
  let col = 0;
  while (col < nums[0].length) {
    let res = 0;
    if (ops === "*") {
      res = 1;
    }
    while (
      col < nums[0].length &&
      (col + 1 >= operands.length || operands[col + 1] === " ")
    ) {
      const num = parseColumn(nums, col);
      switch (ops) {
        case "+":
          res += num;
          break;
        case "*":
          res *= num;
          break;
        default:
          break;
      }
      // console.log(`ops: ${ops}, col: ${col}, num: ${num}, res: ${res}`);
      col++;
    }
    acc += res;
    if (col < nums[0].length) {
      ops = operands[col + 1];
      col++;
    }
  }
  return acc;
}

function parseColumn(nums, col) {
  let digits = "";
  for (let row = 0; row < nums.length; row++) {
    const char = nums[row][col];
    if (char && char !== " ") {
      digits += char;
    }
  }
  return digits ? parseInt(digits) : 0;
}
