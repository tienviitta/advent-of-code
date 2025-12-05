export default function solve(input) {
  const lines = input.trim().split(/\r?\n/);
  // console.log(lines);
  // TODO: Implement solution
  const nums1 = Array.from(lines[0].split(",").map(Number));
  const nums2 = Array.from(lines[1].split(",").map(Number));
  console.log(nums1, nums2);
  return nextGreaterElement(nums1, nums2);
}

// /**
//  * Finds the next greater element for each element in nums1 based on their positions in nums2
//  * @param nums1 - Array of numbers to find next greater elements for
//  * @param nums2 - Array containing all elements from nums1 and their next greater elements
//  * @returns Array where each element is the next greater element for corresponding element in nums1
//  */
// function nextGreaterElement(nums1, nums2) {
//   // Stack to maintain decreasing sequence while traversing nums2 from right to left
//   const stack = [];

//   // Map to store the next greater element for each number in nums2
//   const nextGreaterMap = {};

//   // Traverse nums2 from right to left to find next greater element for each number
//   for (const currentNumber of nums2.reverse()) {
//     // Remove elements from stack that are smaller than current number
//     // They cannot be the next greater element for any number to the left
//     while (stack.length > 0 && stack[stack.length - 1] < currentNumber) {
//       stack.pop();
//     }

//     // The top of stack is the next greater element for current number
//     // If stack is empty, there's no greater element to the right
//     nextGreaterMap[currentNumber] =
//       stack.length > 0 ? stack[stack.length - 1] : -1;

//     // Add current number to stack for processing future elements
//     stack.push(currentNumber);
//   }

//   // Map each element in nums1 to its next greater element using the map
//   return nums1.map((number) => nextGreaterMap[number]);
// }

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let nextg = new Map();
  for (let i = nums2.length - 1; i >= 0; i--) {
    /*
    while stack and stack[-1] < x:
        stack.pop()
    */
    while (stack.length > 0 && stack[stack.length - 1] < nums2[i]) {
      stack.pop();
    }
    if (stack.length === 0) {
      stack.push(nums2[i]);
    } else if (stack[stack.length - 1] < nums2[i]) {
      stack.pop();
      stack.push(nums2[i]);
    } else {
      nextg.set(nums2[i], stack[stack.length - 1]);
      stack.push(nums2[i]);
    }
  }
  // console.log(nextg);
  let result = [];
  for (let n of nums1) {
    if (nextg.has(n)) {
      result.push(nextg.get(n));
    } else {
      result.push(-1);
    }
  }
  return result;
};
