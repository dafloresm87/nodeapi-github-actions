const express = require("express");
const app = express();
app.use(express.json());

let items = [];

// GET
app.get("/items", (req, res) => {
  res.json(items);
});

// POST
app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// PUT
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  if (items[id]) {
    items[id] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (items[id]) {
    items.splice(id, 1);
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

