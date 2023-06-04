import express from "express";
import data from "./data.js";
import bodyParser from "body-parser";

const app = express(); // Cria uma instância do Express
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

app.get("/api/*", function (req, res) {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// Inicializa o servidor HTTP na porta 3000
const port = process.env.PORT || 3000;
const server = "0.0.0.0";

app.listen(port, server, function () {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
