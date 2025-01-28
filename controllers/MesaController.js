const prisma = require("../prisma/prismaClient");

class MesaController {
  // Buscar todas as mesas
  static async buscarMesa(req, res) {
    try {
      const mesas = await prisma.mesa.findMany();

      res.status(200).json({
        erro: false,
        mensagem: "Mesas listadas com sucesso",
        mesas,
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }

  // Cadastrar nova mesa
  static async novaMesa(req, res) {
    const { codigo, n_lugares } = req.body;

    if (!codigo || !n_lugares) {
      return res.status(422).json({
        erro: true,
        mensagem: "Código e número de lugares são obrigatórios",
      });
    }

    try {
      const mesa = await prisma.mesa.create({
        data: {
          codigo,
          n_lugares: parseInt(n_lugares),
        },
      });

      console.log(JSON.stringify(mesa));

      return res.status(201).json({
        erro: false,
        mensagem: "Mesa cadastrada com sucesso :)",
      });
    } catch (error) {
      return res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }

  // Consultar mesas disponíveis por data
  static async dispMesa(req, res) {
    const data = new Date(req.body.data);

    if (!data) {
      return res.status(422).json({
        erro: true,
        mensagem: "Data é obrigatória no formato yyyy-mm-dd",
      });
    }

    try {
      const mesasDisp = await prisma.mesa.findMany({
        include: {
          reservas: {
            where: { data: data },
          },
        },
      });

      res.status(200).json({
        erro: false,
        mensagem: "Mesas disponíveis listadas com sucesso",
        mesasDisp,
      });
    } catch (error) {
      return res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }
}

module.exports = MesaController;
