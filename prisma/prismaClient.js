const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

console.log("Prisma instanciado");
module.exports = prisma;
