const express = require("express");
const app = express();

app.use(express.json());

let usuarios = [
  {
    id: 1,
    nome: "Alexandre Vezali Caetano",
    email: "vezali@gmail.com",
  },
  {
    id: 2,
    nome: "Sebastião",
    email: "teste@gmail.com",
  },
];

app.get("/usuarios", (req, res) => {
  res.send({
    usuarios,
    filter: { href: "usuarios/" + "id" },
  });
});

app.get("/usuarios/:id", (req, res) => {
  let usuario = usuarios.find((u) => u.id == req.params.id);
  if (!usuario) {
    res.status(404).send({
      error: "Usuário não encontrado",
    });
    return;
  }
  res.send({
    usuario,
    link_delete: { href: "usuarios/" + usuario.id },
    link_update: { href: "usuarios/" + usuario.id },
    link_get: { href: "usuarios/" + usuario.id },
  });
});

app.post("/usuarios", (req, res) => {
  let usuarioAdd = req.body;
  usuarioAdd.id = usuarios.length + 1;
  usuarios.push(usuarioAdd);
  res.status(201).send({
    usuarioAdd,
    link_delete: { href: "usuarios/" + usuarioAdd.id },
    link_update: { href: "usuarios/" + usuarioAdd.id },
    link_get: { href: "usuarios/" + usuarioAdd.id },
  });
});

app.put("/usuarios/:id", (req, res) => {
  let usuarioUpd = usuarios.find((u) => u.id == req.params.id);
  if (!usuarioUpd) {
    res.status(404).send({
      error: "Este usuário não existe em nossa base de dados!",
    });
    return;
  }
  usuarioUpd.nome = req.body.nome;
  usuarioUpd.email = req.body.email;
  res.status(200).send({
    usuarioUpd,
    link_delete: { href: "usuarios/" + usuarioUpd.id },
    link_update: { href: "usuarios/" + usuarioUpd.id },
    link_get: { href: "usuarios/" + usuarioUpd.id },
  });
});

app.delete("/usuarios/:id", (req, res) => {
  let usuarioDlt = usuarios.find((u) => u.id == req.params.id);
  if (!usuarioDlt) {
    res.status(404).send({
      error: "Usuário não encontrado em nossa base de dados",
    });
    return;
  }
  usuarios = usuarios.filter((u) => u.id != req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log("Listening on port 3000"));
