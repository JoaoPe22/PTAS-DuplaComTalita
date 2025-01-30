const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const ReservaController = require("../controllers/ReservaController");

router.post("/novo", ReservaController.novaReserva);
router.get("/", ReservaController.minhasReservas);
router.patch("/cancelar", ReservaController.cancelarReserva);
router.get("/list", AuthController.verificaAdm, ReservaController.listaReservas);
router.patch('/', AuthController.verificaAutenticacao, ReservaController.atualizarReserva)

module.exports = router;