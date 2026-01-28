const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.text({ limit: "10mb" }));
app.use(express.static("public"));

const DB = "scripts.json";

if (!fs.existsSync(DB)) fs.writeFileSync(DB, "[]");

// SALVAR SCRIPT
app.post("/save", (req, res) => {
  const scripts = JSON.parse(fs.readFileSync(DB));
  const id = scripts.length;

  scripts.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(scripts));

  res.end(id.toString());
});

// PEGAR RAW
app.get("/raw/:id", (req, res) => {
  const scripts = JSON.parse(fs.readFileSync(DB));
  const id = Number(req.params.id);

  if (!scripts[id]) {
    res.status(404).send("not found");
    return;
  }

  res.setHeader("Content-Type", "text/plain");
  res.send(scripts[id]);
});

// 🔥 LISTAR RAWs CRIADOS
app.get("/list", (req, res) => {
  const scripts = JSON.parse(fs.readFileSync(DB));
  res.json({
    total: scripts.length,
    ids: scripts.map((_, i) => i)
  });
});

app.listen(process.env.PORT || 3000);