const fs = require("fs");
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8',(err, data) => {
    if (err) {
      console.log(`Error reading ${path}: \n`, err.message);
      process.exit(1);
    }
    console.log(data.toString());
  });
}

cat(process.argv[2]);
