const router = require("express").Router();

const PerfilController = require("../controllers/PerfilController");

router.get("/", PerfilController.getPerfil);
router.patch("/", PerfilController.atualizaPerfil);
router.get("/todos", PerfilController.listarPerfis);

module.exports = router;
