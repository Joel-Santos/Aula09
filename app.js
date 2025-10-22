import express from "express";
import 'dotenv/config';
import autorRoutes from "./src/routes/autorRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import livroRoutes from "./src/routes/livroRoutes.js";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/autores", autorRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/livros", livroRoutes);

app.get("/", (req,res) =>{
    res.status(200).send("API de Livros!");
})

app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
})