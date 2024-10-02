const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Insere usuário
  const novousuario = await prisma.usuario.create({
    data: {
      nome: "José Bonifácio",
      email: "jose.bonifacio@imperioptbr.com",
    },
  });

  console.log("Novo usuário: " + JSON.stringify(novousuario));

  //   Busca por usuário
  const usuarios = await prisma.usuario.findMany();
  console.log("Todos os usuários: " + JSON.stringify(usuarios));
}

main().catch((erro) => {
  console.log("Erro: " + erro);
});
