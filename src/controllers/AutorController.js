import AutorModel from "../models/AutorModel.js";

export default class AutorController{

    static listar(req, res){
        try {
            const autores = AutorModel.listar();
            if(!autores){
                res.status(400).json({msg: "Erro ao listar os autores."});
                return;
            }
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({msg: "Erro interno", erro: error.message});
        }
    }
    static buscarPorId(req, res){
        try {
            const id = req.params.id;
            const autor = AutorModel.buscarPorId(id);
            if(!autor){
                res.status(404).json({msg: "Autor não encontrado!"});
                return;
            }
            res.status(200).json(autor);
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar autor", erro: error.message});
        }
    }

static buscarPorNacionalidade(req, res){
        try {
            const nacionalidade = req.params.nacionalidade;
            const autores = AutorModel.buscarPorNacionalidade(nacionalidade);
            if(autores.length ===0){
                res.status(400).json({msg: "Nenhum autor com essa nacionalidade!"});
                return;
            }
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar autores", erro: error.message});
        }
}

static buscarPorNome(req, res){
        try {
            const nome = req.params.nome;
            const autores = AutorModel.buscarPorNome(nome);
            if(autores.length ===0){
                res.status(400).json({msg: "Nenhum autor com esse nome!"});
                return;
            }
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar autores", erro: error.message});
        }
}



static criar (req, res){
    try {
        const {nome, nacionalidade} = req.body;
        if(!nome || !nacionalidade){
            res.status(400).json({msg: "Preencha todos os campos."});
            return;
        }
        const autores = AutorModel.listar();
        const novo = {
            id: autores.length + 1,
            nome: nome,
            nacionalidade: nacionalidade
        }
        AutorModel.criar(novo);
        res.status(201).json({msg: "Autor Criado", autor: novo});
    } catch (error) {
        res.status(500).json({msg: "Erro ao criar autor", erro: error.message});
    }
}


static atualizar (req, res){
    try {
        const id = req.params.id;
        const {nome, nacionalidade} = req.body;
        if(!nome || !nacionalidade){
            res.status(400).json({msg: "Preencha todos os campos."});
            return;
        }
        const atualizado = AutorModel.atualizar(id, {nome, nacionalidade})
        if(!atualizado){
            res.status(404).json({msg: "Autor não Encotrado"})
            return;
        }
        res.status(200).json({msg: "Autor atualizado com sucesso", autor: atualizado});
    } catch (error) {
        res.status(500).json({msg: "Erro ao criar autor", erro: error.message});
    }
}

static deletar (req, res){
    try {
        const id = req.params.id;
        const status = AutorModel.deletar(id);
        if(!status){
            res.status(404).json({msg: "Autor não encontrado!"});
            return;
        }
        res.status(200).json({msg: "Autor excluído!"});
    } catch (error) {
         res.status(500).json({msg: "Erro ao criar autor", erro: error.message});
    }
}




}