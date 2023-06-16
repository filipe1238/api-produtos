express = require("express");

const routerAPI = express.Router();

const { route } = require("express/lib/application.js");
const knewConfig = require("../../knexfile.js");

knex =  require ("knex") (knewConfig.development);

routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }));

routerAPI.get("/produtos", function (req, res) {
  knex
    .select("*")
    .from("produtos")
    .then((produtos) => {
      res.json(produtos);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

routerAPI.get("/produtos/:id", function (req, res) {
  const id = req.params.id;
  knex
    .select("*")
    .from("produtos")
    .where("id", id)
    .first()
    .then((produto) => {
      if (!produto) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.json(produto);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

routerAPI.post("/produtos", function (req, res) {
  const produto = req.body;
  knex("produtos")
    .insert(produto)
    .then((dados) => {
      res.status(201).json({ id: dados[0] });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

routerAPI.put("/produtos/:id", function (req, res) {
  const id = req.params.id;
  const produto = req.body;
  knex("produtos")
    .update(produto)
    .where("id", id)
    .then((dados) => {
      if (!dados) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});


routerAPI.patch("/produtos/:id", function (req, res) {
  const id = req.params.id;
  const produto = req.body;
  knex("produtos")
    .update(produto)
    .where("id", id)
    .then((dados) => {
      if (!dados) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

routerAPI.delete("/produtos/:id", function (req, res) {
  const id = req.params.id;
  knex("produtos")
    .where("id", id)
    .delete()
    .then((dados) => {
      if (!dados) {
        res.status(404).json({ message: "Produto não encontrado" });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = routerAPI;
