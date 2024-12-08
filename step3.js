const axios = require("axios");
const fs = require("fs");

function cat(path, outputPath = null) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: \n`, err.message);
      process.exit(1);
    } else {
      handleOutput(data, outputPath);
    }
  });
}

async function webCat(url, outputPath = null) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, outputPath);
  } catch (error) {
    console.log(`Error fetching ${url}: \n ${error}`);
    process.exit(1);
  }
}

function handleOutput(data, outputPath) {
  if (outputPath) {
    fs.writeFile(outputPath, data, "utf-8", (err) => {
      if (err) {
        console.err(`Could not write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

let path;
let output;

if (process.argv[2] === "--out") {
  output = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// if (!input) {
//   console.error("Please provide a file path");
//   process.exit(1);
// }

if (path.startsWith("http://") || path.startsWith("https://")) {
  webCat(path, output);
} else {
  cat(path, output);
}

// process command-line arguments
// function processArguments() {
//   let out = null;
//   let paths = [];

//   // check if --out is specified
//   if (process.argv[2] === "--out") {
//     out = process.argv[3];
//     paths = process.argv.slice(4);
//   } else {
//     paths = process.argv.slice(2);
//   }

//   if (paths.length === 0) {
//     console.error(error);
//     process.exit(1);
//   }
//   return { out, paths };
// }

// /** Main function to process each file/URL sequentially */
// async function main() {
//   const { out, paths } = processArguments();

//   for (let path of paths) {
//     if (path.slice(0, 4) === "http") {
//       // It's a URL
//       await webCat(path, out);
//     } else {
//       // It's a file path
//       cat(path, out);
//     }
//   }
// }

main();
