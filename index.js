//Padrão Singleton
const prisma = require("./prisma/prismaClient");
const AuthController = require("./controllers/AuthController");
const express = require("express");

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

//Rota de autenticação
const authRoutes = require("./routes/authRoutes");
//middleware//
app.use("/auth", authRoutes);

const perfilRoutes =  require("./routes/perfilRoutes");
app.use("/perfil", AuthController.autenticar, perfilRoutes); 

const mesaRoutes =  require("./routes/mesaRoutes");
app.use("/mesa", AuthController.autenticar, mesaRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando na porta 8000.");
});
