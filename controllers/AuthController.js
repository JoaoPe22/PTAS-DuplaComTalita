const {PrismaClient} = require ("@prisma/client");
const prisma = new PrismaClient();

class AuthController{
    static async cadastro(req,res){
    }

    static async login(req,res){
        res.json({
            email: req.body.email,
            password: req.body.password,
        });
    }

    static async loginForm(req,res){
        res.send(
            "<form action = 'auth/login' method = 'post'><input type = 'email' name = 'email'/><input type = 'password' name = 'password'/><input type = 'submit' value = 'Entrar'></form>"
        );
    }
}

module.exports = AuthController;