const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const itensRoutes = require("./routes/itensRoutes");
const UserRoutes = require("./routes/UserRoutes");

app.use(
  cors({
    origin: "https://e-commerce-veiculos.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/itens", itensRoutes);
app.use(
  "/ImagensVeiculos",
  express.static(path.join(__dirname, "banco/ImagensVeiculos"))
);
app.use(
  "/banco/ImagensVeiculos",
  express.static(path.join(__dirname, "banco/ImagensVeiculos"))
);

app.use("/api", UserRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
