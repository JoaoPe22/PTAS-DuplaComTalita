const prisma = require("../prisma/prismaClient");
const { connect } = require("../routes/reservaRoutes");

class ReservaController {
  static async novaReserva(req, res) {
    const { mesaId, n_pessoas } = req.body;
    const data = new Date(req.body.data);

    const mesa = await prisma.mesa.findUnique({
      where: { id: mesaId },
      include: {
        reservas: {
          where: {
            data: data,
            status: true,
          },
        },
      },
    });

    //Verificar se a data da reserva é >= hoje
    const hoje = new Date();
    if (isNaN(data) || data < hoje) {
      return res.status(422).json({
        erro: true,
        mensagem: "A data da reserva deve ser válida e maior ou igual a hoje.",
      });
    }

    //Verificar se a mesa comporta a quantidade de pessoas indicada
    if (n_pessoas > mesa.n_lugares) {
      return res.status(422).json({
        erro: true,
        mensagem:
          "A mesa selecionada não comporta o número de pessoas indicado.",
      });
    }

    //Verificar se a mesa está disponível na data selecionada
    if (mesa.reservas.length > 0) {
      return res.status(422).json({
        erro: true,
        mensagem: "A mesa selecionada já esta reservada para esta data",
      });
    }

    prisma.reserva
      .create({
        data: {
          data: data,
          n_pessoas: n_pessoas,
          usuario: {
            connect: {
              id: req.usuarioId,
            },
          },
          mesa: {
            connect: {
              id: mesaId,
            },
          },
        },
      })
      .then(() => {
        return res.status(201).json({
          erro: false,
          mensagem: "Reserva realizada com sucesso :)",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          erro: true,
          mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
        });
      });
  }

  static async minhasReservas(req, res) {
    try {
      const reservas = await prisma.reserva.findMany({
        where: { usuarioId: req.usuarioId },
        include: {
          mesa: true,
        },
      });

      res.status(200).json({
        erro: false,
        mensagem: "Reservas listadas com sucesso",
        reservas,
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Erro ao listar reservas: " + error.mensagem,
      });
    }
  }

  static async cancelarReserva(req, res) {
    const { reservaId } = req.body;

    if (!reservaId) {
        return res.status(422).json({
          erro: true,
          mensagem: "O ID da reserva é obrigatório.",
        });
      }

    try {
      const reserva = await prisma.reserva.findUnique({
        where: { id: reservaId },
      });

      if (!reserva) {
        return res.status(404).json({
          erro: true,
          mensagem: "Reserva não encontrada.",
        });
      }

      await prisma.reserva.update({
        where: { id: reservaId },
        data: { status: false },
      });

      return res.status(200).json({
        erro: false,
        mensagem: "Reserva cancelada com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }

  static async listaReservas(req, res) {
    const data = new Date(req.body.data);

    if (!data || isNaN(data)) {
      return res.status(422).json({
        erro: true,
        mensagem: "A data é obrigatória no formato yyyy-mm-dd.",
      });
    }

    try {
      const reservas = await prisma.reserva.findMany({
        where: { data: data },
        include: {
          mesa: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              tipo: true
            },
          },
        },
      });

      res.status(200).json({
        erro: false,
        mensagem: "Reservas listadas com sucesso",
        reservas,
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }

  static async atualizarReserva(req, res) {
    const {n_pessoas, reservaId} = req.body

    if (!reservaId) {
        return res.status(422).json({
          erro: true,
          mensagem: "O ID da reserva é obrigatório.",
        });
      }

    try {
      const reserva = await prisma.reserva.findUnique({
        where: { id: reservaId },
      });

      if (!reserva) {
        return res.status(404).json({
          erro: true,
          mensagem: "Reserva não encontrada.",
        });
      }

      await prisma.reserva.update({
        where: { id: reservaId },
        data: { n_pessoas: parseInt(n_pessoas) },
      });

      return res.status(200).json({
        erro: false,
        mensagem: "Reserva atualizada.",
      });
    } catch (error) {
      res.status(500).json({
        erro: true,
        mensagem: "Ocorreu um erro, tente novamente mais tarde." + error,
      });
    }
  }
}

module.exports = ReservaController;
