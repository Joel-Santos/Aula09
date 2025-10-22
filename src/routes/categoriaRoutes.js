import express from "express";
import CategoriaController from "../controllers/CategoriaController.js";
const router = express.Router();

router.get("/", CategoriaController.listar);
router.get("/:id", CategoriaController.buscarPorId);
router.get("/nome/:nome", CategoriaController.buscarPorNome);
router.post("/", CategoriaController.criar);
router.put("/:id", CategoriaController.atualizar);
router.delete("/:id", CategoriaController.deletar);


export default router;