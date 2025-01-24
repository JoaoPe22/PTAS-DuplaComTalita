const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const MesaController = require("../controllers/MesaController");

router.get("/", MesaController.buscarMesa);

router.post(
  "/novo",
  AuthController.verificaAutenticacao,
  AuthController.verificaAdm,
  MesaController.novaMesa
);
router.get("/disponibilidade", MesaController.dispMesa);

module.exports = router;
