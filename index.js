const {PrismaClient} = require ("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json());


//Responde a qualquer requisição encaminhada para 
// /auth/algumaCoisa
const authRoutes = require("./routes/authRoutes");

//middleware//
app.use("/auth",authRoutes);

app.listen(8000);