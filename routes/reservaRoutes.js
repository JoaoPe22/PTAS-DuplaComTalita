const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const ReservaController = require("../controllers/ReservaController");

router.post("/novo", ReservaController.novaReserva);

module.exports = router;