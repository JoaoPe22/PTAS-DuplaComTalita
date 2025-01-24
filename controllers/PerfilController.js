const prisma = require("../prisma/prismaClient");

class PerfilController {
  //Ver perfil
  static async getPerfil(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: req.usuarioId },
        omit: { password: true },
      });

      if (!usuario) {
        return res.status(404).json({
          erro: true,
          mensagem: "Usuário não encontrado.",
        });
      }
      res.status(200).json({
        erro: false,
        mensagem: "Perfil encontrado com sucesso.",
        usuario,
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Erro ao buscar perfil: " + error.message,
      });
    }
  }

  static async atualizaPerfil(req, res) {
    const { nome, email } = req.body;

    if (!nome || nome.length < 6) {
      return res.status(422).json({
        erro: true,
        mensagem: "Caracteres insufientes (min. nome: 6)",
      });
    }

    if (!email || email.length < 10) {
      return res.status(422).json({
        erro: true,
        mensagem: "Caracteres insufientes (min. email: 10)",
      });
    }

    try {
      const usuarioAtt = await prisma.usuario.update({
        where: {
          id: req.usuarioId,
        },
        data: {
          email: email,
          nome: nome,
        },
      });
      res.status(200).json({
        erro: false,
        mensagem: "Perfil atualizado com sucesso.",
        usuario: usuarioAtt,
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Erro ao atualizar perfil: " + error.message,
      });
    }
  }

  static async listarPerfis(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany({
        omit: { password: true }
      });
      
      res.status(200).json({
        erro: false,
        mensagem: "Perfis listados com sucesso",
        usuarios,
      });
    }catch(error){
    res.status(500).json({
      erro: true,
      mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
    });
    }
  }
}

module.exports = PerfilController;
