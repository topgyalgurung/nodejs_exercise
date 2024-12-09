/** Command-line tool to generate Markov text. */

const fs = require("fs");
const MarkovMachine = require("./markov");
const { type } = require("os");

let text = fs.readFileSync("eggs.txt", { encoding: "utf8", flag: "r" });
let mm = new MarkovMachine(text);

// test1: output should be string test
console.log(typeof mm.makeText(10) === "string");

// test2" output length should not exceed numWords
console.log(mm.makeText(10).split(" ").length <= 10);

// test3: handle empty text input
let emptyMm = new MarkovMachine("");
console.log(emptyMm.makeText(10) === "");
