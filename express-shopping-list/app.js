/**
 * Build simple json api app to store a shopping list
 * Use array to store your items in the shopping list
 * Since using array as storage, clear each time server restarts
 */

const express = require("express");
const ExpressError = require("./ExpressError");
const items = require("./fakeDB");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

/* Routes */
//1. GET /items
app.get("/items", (req, res, next) => {
  try {
    res.json(items);
  } catch (error) {
    next(error);
  }
});

//2.  POST /items
app.post("/items", (req, res, next) => {
  const { name, price } = req.body;
  try {
    // validate
    if (!name || price === undefined) {
      return next(new ExpressError("Name and price are required", 400));
    }
    const newItem = { name, price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
  } catch (error) {
    return next(error);
  }
});

//3. GET /items/:name
app.get("/items/:name", (req, res, next) => {
  const itemName = req.params.name;
  try {
    const item = items.find((i) => i.name === itemName);
    if (!item) {
      return next(new ExpressError("Item not found", 404));
    }
    // return found item
    res.json(item);
  } catch (error) {
    next(error);
  }
});

//4. PATCH /items/:name
app.patch("/items/:name", (req, res, next) => {
  const itemName = req.params.name;
  const { name, price } = req.body;
  try {
    const item = items.find((i) => i.name === itemName);
    if (!item) {
      return next(new ExpressError("Item not found", 404));
    }
    item.name = name || item.name;
    item.price = price || item.price;
    res.json({ updated: item });
  } catch (err) {
    next(err);
  }
});

//5. DELETE /items/:name
app.delete("/items/:name", (req, res, next) => {
  const itemName = req.params.name;
  try {
    const itemIndex = items.findIndex((i) => i.name === itemName);
    if (itemIndex === -1) {
      return next(new ExpressError("Item not found", 404));
    }
    const deletedItem = items.splice(itemIndex, 1);
    // if items is declared with const, will throw error so for simplicity and safety
    // use splice
    // items = items.filter((item) => item.name !== itemName);
    res.json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  e = new ExpressError("Page not found", 404);
  next(e);
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  res.status(status).json({ error: { message, status } });
  res.send("It is an error");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
