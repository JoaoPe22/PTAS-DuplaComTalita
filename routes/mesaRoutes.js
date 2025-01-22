const router = require("express").Router();

const MesaController = require("../controllers/MesaController");

router.get("/", MesaController.buscarMesa);
router.post("/novo", MesaController.novaMesa);
router.get("/disponibilidade", MesaController.dispMesa);

module.exports = router;