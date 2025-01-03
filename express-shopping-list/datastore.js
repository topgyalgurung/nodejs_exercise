const fs = require("fs");
const path = require("path");

class DataStore {
  constructor(filename = "db.json") {
    this.filepath = path.join(__dirname, filename);
  }

  async read() {
    const data = await fs.promises.readFile(this.filepath, "utf8");
    return JSON.parse(data);
  }

  async write(data) {
    await fs.promises.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }

  async addItem(item) {
    const items = await this.read();
    items.push(item);
    await this.write(items);
    return item;
  }

  async findItem(name) {
    const items = await this.read();
    return items.find((item) => item.name === name);
  }

  async updateItem(name, updatedItem) {
    const items = await this.read();
    const idx = items.findIndex((item) => item.name === name);
    if (idx === -1) throw new Error("Item not found");
    items[idx] = { ...items[idx], ...updatedItem };
    await this.write(items);
    return items[idx];
  }

  async deleteItem(name) {
    const items = await this.read();
    const filteredItems = items.filter((item) => item.name !== name);
    await this.write(filteredItems);
    return { message: "Deleted" };
  }
}

module.exports = new DataStore();
