const prisma = require("../prisma/prismaClient");

class MesaController {
    static async buscarMesa(req,res){
        const { codigo, n_lugares } = req.body;
    }

    static async novaMesa(req,res){
        const { codigo, n_lugares } = req.body;
        return res.json({mensagem: "sucesso ao acessar cadastro de mesa"});
    }

    static async dispMesa(req,res){
        const { data } = req.body;
    }
}

module.exports = MesaController