const fs = require("fs");
const moment = require("moment");
/**
 * array of inputs , validata that each one is a valid number and converts to a number
 * if invalid, function throws an error
 * @param {Array} numberAsStrings as array of String
 * @returns {Array | Error} an array or error object
 */
function validateInput(numberAsStrings) {
  const result = [];
  const numbers = numberAsStrings.map((n) => {
    if (isNaN(Number(n))) {
      throw new Error(`${n} is not a valid number`);
    }
    result.push(Number(n));
  });
  return result;
}
function saveResultsToFile(data) {
  const timestamp = moment().format();
  const resultWithTimestamp = { ...data, timestamp };
  fs.writeFileSync(
    "results.json",
    JSON.stringify(resultWithTimestamp, null, 2)
  );
}

function findMean(nums) {
  // average = add all and divide by number of numbers
  if (nums.length === 0) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum / nums.length;
}

function findMedian(nums) {
  // order the numbers and see which one is in the middle
  // for even length, find average of two middle elements: add those two and divide by 2
  if (nums.length === 0) return null;
  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  // if length odd
  if (nums.length % 2 != 0) {
    return nums[mid];
  } else {
    return (nums[mid - 1] + nums[mid]) / 2;
  }
}

function findMode(nums) {
  // order the number from lowest to highest and see which appears most oftne
  // two approach: using frequency map or object have (O(N) time and space or sorting (O(nlogn)) time and O(log n) space
  if (nums.length === 0) return null;

  // approach 1: using sorting
  nums.sort((a, b) => a - b);

  let modes = [];
  let maxCount = 0;
  let curCount = 1;
  let i = 0;
  // count occurences of current element
  while (i < nums.length) {
    while (i < nums.length - 1 && nums[i] === nums[i + 1]) {
      curCount++;
      i++;
    }
    // update mode array
    if (curCount === maxCount) {
      modes.push(nums[i]);
    } else if (curCount > maxCount) {
      maxCount = curCount;
      modes = [nums[i]];
    }
    // reset for next element
    curCount = 1;
    i++;
  }
  return modes.length === 1 ? modes[0] : modes;

  // using map
  /**
  const freqMap = {};
  nums.forEach((n) => {
    freqMap[n] = (freqMap[n] || 0) + 1;
  });
  console.log(freqMap);

  let maxCount = 0;
  let modes = [];
  for (const n in freqMap) {
    const frequency = freqMap[n];
    if (frequency > maxCount) {
      maxCount = frequency;
      modes = [parseInt(n)]; // keys in object are string by default so we need to parse to int
    } else if (frequency === maxCount) {
      modes.push(parseInt(n));
    }
  }
  return modes;
   * 
   */
}

module.exports = {
  findMean,
  findMedian,
  findMode,
  validateInput,
  saveResultsToFile,
};
