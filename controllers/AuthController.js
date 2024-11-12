const prisma = require("../prisma/prismaClient");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  static async cadastro(req, res) {
    const { nome, email, password } = req.body;

    if (!nome || nome.length < 6) {
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. nome: 6)",
      });
    }

    if (!email || email.length < 10) {
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. email: 10)",
      });
    }

    if (!password || password.length < 10) {
      return res.json({
        erro: true,
        mensagem: "Caracteres insufientes (min. senha: 8)",
      });
    }

    const existe = await prisma.usuario.count({
      where: {
        email: email,
      },
    });

    if (existe != 0) {
      return res.json({
        erro: true,
        mensagem: "Usuário já existe",
      });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    try {
      const usuario = await prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          password: hashPassword,
          tipo: "cliente",
        },
      });
      console.log(JSON.stringify(usuario));

      const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.json({
        erro: false,
        mensagem: "Usuário cadastrado com sucesso :)",
        token: token,
      });
    } catch (error) {
      return res.json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.json({
        erro: true,
        mensagem: "Usuario não foi encontrado",
      });
    }

    //Verificação da senha

    const senhaCorreta = bcryptjs.compareSync(password, usuario.password);

    if (!senhaCorreta) {
      return res.json({
        erro: true,
        mensagem: "Senha Incorreta, tente novamente.",
      });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      erro: false,
      mensagem: "Autenticado com sucesso :)",
      token: token,
    });
  }
}

module.exports = AuthController;
