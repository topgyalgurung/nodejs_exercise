const axios = require("axios");
const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: \n`, err.message);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(`Error fetching ${url}: \n ${error}`);
    process.exit(1);
  }
}

const input = process.argv[2];
if (!input) {
  console.error("Please provide a file path");
  process.exit(1);
}

if (input.startsWith("http://") || input.startsWith("https://")) {
  // if(input.slice(0,4) === 'http')
  webCat(input);
} else {
  cat(input);
}
