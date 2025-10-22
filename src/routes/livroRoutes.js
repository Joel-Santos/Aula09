import express from "express";
import LivroController from "../controllers/LivroController.js";
const router = express.Router();

router.get("/", LivroController.listar);
router.post("/", LivroController.criar);
router.get("/:id", LivroController.buscarPorId);
router.get("/ano/:ano", LivroController.buscarPorAno);
router.get("/autor/:id", LivroController.buscarPorAutorId);
router.get("/categoria/:id", LivroController.buscarPorCategoriaId);
router.get("/autor/nome/:nomeAutor", LivroController.buscarPorNomeAutor);
router.get("/categoria/nome/:nomeCategoria", LivroController.buscarPorNomeCategoria);


export default router;