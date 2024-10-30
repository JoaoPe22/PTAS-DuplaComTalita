const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcryptjs = require("bcryptjs");
const jwt = require("bcryptjs");

class AuthController {
  static async cadastro(req, res) {
    const { nome, email, password, tipo } = req.body;

    if (!nome || nome.length < 6) {
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes",
      });
    }

    return res.json({
      erro: false,
      mensagem: "Usuário cadastrado",
      token: "dfsdfvsdsdvxv578s",
    });
  }

//   const salt = 

  static async login(req, res) {
    const {email, password} = req.body;

    const usuario = await prisma.usuario.findUnique({
        where:{

        }


    })
    const token = jwt.sing({id: usuario.id}, "1234567890", {
        expiresIn: "1h",


    })
    res.json({
        erro: false,
        mensagem:"Autenticado "    
    })
  }
}

module.exports = AuthController;
