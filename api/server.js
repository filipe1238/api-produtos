import express from "express";
import data from "./data.js";
import bodyParser from "body-parser";

const app = express(); // Cria uma instância do Express
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Servidor rodando com Express");
});

app.get("/api/produtos", function (req, res) {
  res.json(data);
});

app.get("/api/produtos/:id", function (req, res) {
  const id = req.params.id;
  const produto = data.find((produto) => produto.id == id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.post("/api/produtos", function (req, res) {
  const produto = req.body;
  data.push(produto);
  console.log(data);
  res.status(201).json(produto);
});

app.put("/api/produtos/:id", function (req, res) {
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

app.delete("/api/produtos/:id", function (req, res) {
  const id = req.params.id;
  const index = data.findIndex((produto) => produto.id == id);
  if (index >= 0) {
    data.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

// Inicializa o servidor HTTP na porta 3000
const port = process.env.PORT || 3000;
const server = "127.0.0.1";

app.listen(port, function () {
  console.log(`Servidor rodando em http://${server}:${port}`);
});
