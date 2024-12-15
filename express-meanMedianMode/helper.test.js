const { findMean, findMedian, findMode } = require("./helper");

describe("findMedian", () => {
  it("finds median of an even set", () => {
    expect(findMedian([1, -4, 3, 2])).toEqual(1.5);
  });
  it("find median of an odd set", () => {
    expect(findMedian([1, -4, 2])).toEqual(1);
  });
});

describe("findMean", () => {
  it("find mean of empty array", () => {
    expect(findMean([])).toEqual(null);
  });
  it("find mean of an array of numbers", () => {
    expect(findMean([1, -4, 3, 2])).toEqual(0.5);
  });
});

describe("findMode", () => {
  it("find mode of the array of number", () => {
    expect(findMode([1, 3, 4, 3, 2, 5])).toEqual(3);
  });
});
