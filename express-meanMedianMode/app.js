const express = require("express");
const ExpressError = require("./ExpressError");
const {
  findMean,
  findMedian,
  findMode,
  validateInput,
  saveResultsToFile,
} = require("./helper");

const app = express();

app.use(express.json());

app.get("/mean", (req, res, next) => {
  const { nums } = req.query;
  if (!nums) throw new ExpressError("Number are required", 400);
  let numberStrings = nums.split(",");
  try {
    // validate if it number or not
    let numbers = validateInput(numberStrings); //nums = 1,2,3,4
    let result = {
      result: findMean(numbers),
    };
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

app.get("/median", (req, res, next) => {
  const { nums } = req.query;
  if (!nums) throw new ExpressError("Number are required", 400);
  let numberStrings = nums.split(",");
  try {
    // validate if it number or not
    let numbers = validateInput(numberStrings); //nums = 1,2,3,4
    let result = {
      result: findMedian(numbers),
    };
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

app.get("/mode", (req, res, next) => {
  const { nums } = req.query;
  if (!nums) throw new ExpressError("Number are required", 400);
  try {
    let numberAsStrings = nums.split(",");
    // validate if it number or not
    let number = validateInput(numberAsStrings);
    let result = {
      result: findMode(number),
    };
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

// // /all route to calculate all three
// app.get("/all", (req, res) => {
//   const { nums, save } = req.query;
//   if (!nums) throw new ExpressError("Number are required", 400);

//   let numberAsStrings = nums.split(",");
//   // validate if it number or not
//   let number = validateInput(numberAsStrings);
//   const result = {
//     operation: "all",
//     mean: findMean(number),
//     median: findMedian(number),
//     mode: findMode(number),
//   };

//   if (save === "true") {
//     saveResultsToFile(result);
//   }
//   // honor accept header
//   res.formatResponse(result);
// });
//middleware to handle `Accept header
// app.use((req, res, next) => {
//   res.formatResponse = (responseData) => {
//     const accept = req.headers.accept || "application/json";
//     if (accept.includes("application/json")) {
//       res.json(responseData);
//     } else if (accept.includes("text/html")) {
//       // Convert JSON response to HTML table
//       let html = "<table border='1'>";
//       for (const [key, value] of Object.entries(responseData)) {
//         html += `<tr><td>${key}</td><td>${value}</td></tr>`;
//       }
//       html += "</table>";
//       res.send(html);
//     } else {
//       res.status(406).send("Not Acceptable: Unsupported Accept header");
//     }
//   };
//   e = new ExpressError("Page not found", 404);
//   next(e);
// });

app.use((req, res, next) => {
  e = new ExpressError("Page not found", 404);
  next(e);
});
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;
  res.status(status).json({ error: { message, status } });
  res.send("It is an error");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
