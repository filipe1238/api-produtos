const routerAPI = require("./router/routerAPI1.js");

express = require("express");
routerAPI2 = require("./router/routerAPI2.js");
bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send(`Servidor rodando com Express, repositorio git: <a href="https://github.com/filipe1238/api-produtos" target="_blank">GitHub page</a> <br/> `+
  "endpoints da atividade 1: GET /api/produtos GET /api/produtos/:id POST /api/produtos/ PUT /api/produtos/:id DELETE /api/produtos/:id <br/>"+
  "Atividade 2 nao funcionara no servidor da vercel <br/>"+
  "endpoints da atividade 2: GET /api/v1/produtos GET /api/v1/produtos/:id POST /api/v1/produtos/ PATCH /api/v1/produtos/:id PUT /api/v1/produtos/:id DELETE /api/v1/produtos/:id <br/>");
});

app.use("/api/v1", routerAPI2);
app.use("/api", routerAPI);

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
