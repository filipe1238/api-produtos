express = require("express");
data = require("../data");

const routerAPI = express.Router();

routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }));

routerAPI.get("/produtos", function (req, res) {
  res.json(data);
});

routerAPI.get("/produtos/:id", function (req, res) {
  const id = req.params.id;
  const produto = data.find((produto) => produto.id == id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

routerAPI.post("/produtos", function (req, res) {
  const produto = req.body;
  data.push(produto);
  console.log(data);
  res.status(201).json(produto);
});

routerAPI.put("/produtos/:id", function (req, res) {
  const id = req.params.id;
  const produto = req.body;
  const index = data.findIndex((produto) => produto.id == id);
  if (index >= 0) {
    data[index] = produto;
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

routerAPI.delete("/produtos/:id", function (req, res) {
  const id = req.params.id;
  const index = data.findIndex((produto) => produto.id == id);
  if (index >= 0) {
    data.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

module.exports = routerAPI;
