const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Item = require("../models/item");

router.get("/", async (req, res) => {
  try {
    const itens = await Item.find();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Veículo não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../banco/ImagensVeiculos"));
  },
  filename: function (req, file, cb) {
    const nomeUnico = Date.now() + "-" + file.originalname;
    cb(null, nomeUnico);
  },
});

const upload = multer({ storage: storage });

router.post("/cadastroProduto", upload.single("imagem"), async (req, res) => {
  const {
    marca,
    modelo,
    cor,
    valor,
    descricao,
    status,
    ano,
    quilometragem,
    categoria,
  } = req.body;
  const detalhesTecnicos = JSON.parse(req.body.detalhesTecnicos || "{}");
  const caminhoImagem = req.file
    ? `/banco/ImagensVeiculos/${req.file.filename}`
    : "";

  const novoItem = new Item({
    marca,
    modelo,
    cor,
    valor,
    descricao,
    status,
    ano,
    quilometragem,
    categoria,
    imagem: caminhoImagem,
    detalhesTecnicos,
  });

  await novoItem.save();
  res.status(201).json({ message: "Veículo cadastrado." });
});

router.delete("/:id", async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item não encontrado." });
  res.status(200).json({ message: "Item vendido e removido com sucesso." });
});

module.exports = router;
