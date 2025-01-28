const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const ReservaController = require("../controllers/ReservaController");

router.post("/novo", ReservaController.novaReserva);
router.post("/", ReservaController.minhasReservas);
router.delete("/", ReservaController.cancelarReserva);
router.get("/list", AuthController.verificaAdm, ReservaController.listaReservas);

module.exports = router;