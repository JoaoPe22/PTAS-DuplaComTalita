const {PrismaClient} = require ("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const app = express();

//Responde a qualquer requisição encaminhada para 
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");

//middleware//
app.use("/auth",authRoutes);

app.listen(8000);