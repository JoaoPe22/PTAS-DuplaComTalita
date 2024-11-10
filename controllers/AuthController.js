const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcryptjs = require("bcryptjs");
const jwt = require("bcryptjs");

class AuthController {
  static async cadastro(req, res) {
    const { nome, email, password} = req.body;

    if (!nome || nome.length < 6) {
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. nome: 6)",
      });
    }

    if (!email || email.length < 10){
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. email: 10)",
      });
    }

    if (!password || password.length < 10){
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. senha: 8)",
      });
    }

    const existe = await prisma.usuario.count({
      where:{
        email: email,
      },
    });

    if (existe != 0){
      return res.json({
        erro: true,
        mensagem: "Usuário já existe"
      })
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    try{
      const usuario = await prisma.usuario.create({
        data:{
          nome: nome,
          email: email,
          password: hashPassword,
          tipo: "cliente",
        },
      });

      return res.json({
        erro: false,
        mensagem: "Usuário cadastrado"
      });
    } catch  (error) {
      return res.json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
    
  }

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
