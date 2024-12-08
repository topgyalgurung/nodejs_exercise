const fs = require("fs");
function cat(path) {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: \n`, err.message);
      process.exit(1);
    }
    console.log(data.toString());
  });
}

// get the file path via command line
const filePath = process.argv[2];
if (!filePath) {
  console.error("Please provide a file path");
  process.exit(1);
}
cat(filePath);
