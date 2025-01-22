const prisma = require("../prisma/prismaClient");

class MesaController {
    static async buscarMesa(req,res){
        const { codigo, n_lugares } = req.body;
    }

    static async novaMesa(req,res){
        const { codigo, n_lugares } = req.body;
    }

    static async dispMesa(req,res){
        const { codigo, n_lugares } = req.body;
    }
}

module.exports = MesaController