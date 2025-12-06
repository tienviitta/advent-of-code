export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  console.log(lines);
  // TODO: Implement solution
  let numbers = [];
  for (let i = 0; i < lines.length - 1; i++) {
    // Process each line
    numbers.push(lines[i].trim().split(/\s+/).map(Number));
    // console.log(numbers.length);
  }
  const operands = lines[lines.length - 1].trim().split(/\s+/);
  // console.log(operands.length);
  let acc = 0;
  for (let i = 0; i < numbers[0].length; i++) {
    // Process each operand
    const operand = operands[i];
    console.log(operand);
    let result = 0;
    if (operand === "*") {
      result = 1;
    }
    for (let j = 0; j < numbers.length; j++) {
      // Process each number
      switch (operand) {
        case "+":
          result += numbers[j][i];
          break;
        case "*":
          result *= numbers[j][i];
        default:
          break;
      }
    }
    console.log(result);
    acc += result;
  }
  return acc;
}
