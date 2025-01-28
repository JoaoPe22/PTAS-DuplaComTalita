const router = require("express").Router();

const AuthController = require("../controllers/AuthController");
const PerfilController = require("../controllers/PerfilController");

router.get("/", PerfilController.getPerfil);
router.patch("/", PerfilController.atualizaPerfil);
router.get("/todos", AuthController.verificaAdm, PerfilController.listarPerfis);

module.exports = router;
