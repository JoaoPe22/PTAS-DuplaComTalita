const prisma = require("./prisma/prismaClient");

const express = require("express");

const AuthController = require("./controllers/AuthController");

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

//Responde a qualquer requisição encaminhada para
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");

//middleware//
app.use("/auth", authRoutes);

// Teste
app.get("/privado", AuthController.verificaAutenticacao, (req, res) => {
  res.json({
    msg: "rota restrita",
  });
});

app.listen(8000);
