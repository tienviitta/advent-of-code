export default function solve(input) {
  const numbers = input.trim().split('
').map(Number);
  return numbers.reduce((a, b) => a + b, 0);
}