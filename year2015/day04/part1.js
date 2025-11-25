import crypto from "crypto";

/*
--- Day 4: The Ideal Stocking Stuffer ---
Santa needs help mining some AdventCoins (very similar to bitcoins) to use as 
gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at 
least five zeroes. The input to the MD5 hash is some secret key (your puzzle 
input, given below) followed by a number in decimal. To mine AdventCoins, you 
must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) 
that produces such a hash.

For example:

  - If your secret key is abcdef, the answer is 609043, because the MD5 hash of 
  abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest 
  such number to do so. (Actual: 000001dbbfa3a5c83a2d506429c7b00e)
  - If your secret key is pqrstuv, the lowest number it combines with to make 
  an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of 
  pqrstuv1048970 looks like 000006136ef....

  Your puzzle input is bgvyzdsv.
*/
export default function solve(_input) {
  const secret = "bgvyzdsv";
  console.log(secret);
  // Solution
  // Loop through numbers starting from 1 until a valid hash is found
  for (let i = 1; ; i++) {
    // Compute MD5 hash of secret + i and check if it starts with five zeroes
    const md5hash = crypto
      .createHash("md5")
      .update(secret + i)
      .digest("hex");
    if (md5hash.startsWith("00000")) {
      return i;
    }
  }
}
