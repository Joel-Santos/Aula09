import LivroModel from "../models/LivroModel.js";
import AutorModel from "../models/AutorModel.js";
import CategoriaModel from "../models/CategoriaModel.js";
import { categorias } from "../data/banco.js";

export default class LivroController {
    static listar(req, res) {
        try {
            const livros = LivroModel.listar();
            if (!livros) {
                res.status(400).json({ msg: "Erro ao listar os livros" });
                return;
            }
            res.status(200).json(livros);

        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }

    static criar(req, res) {
        try {
            const { titulo, autorId, categoriaId, anoPublicacao, preco } = req.body;
            if (!titulo || !autorId || !categoriaId || !anoPublicacao || !preco) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos." });
                return;
            }
            if (!AutorModel.buscarPorId(autorId)) {
                res.status(400).json({ msg: "Autor inválido!" });
                return;
            }
            if (!CategoriaModel.buscarPorId(categoriaId)) {
                res.status(400).json({ msg: "Categoria inválida!" });
                return;
            }
            if (Number(anoPublicacao) <= 1800 || Number(anoPublicacao) > new Date().getFullYear()) {
                res.status(400).json({ msg: "Ano inválido!" });
                return;
            }
            if (Number(preco) <= 0) {
                res.status(400).json({ msg: "Preço deve ser maior que zero!" });
                return;
            }
            const novoLivro = {
                id: LivroModel.listar().length + 1,
                titulo: titulo,
                autorId: autorId,
                categoriaId: categoriaId,
                anoPublicacao: anoPublicacao,
                preco: preco
            };
            LivroModel.criar(novoLivro);
            res.status(201).json({ msg: "Livro criado com sucesso", livro: novoLivro });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar o livro", erro: error.message });
        }
    }

    static buscarPorId(req, res) {
        try {
            const id = req.params.id;
            const livro = LivroModel.buscarPorId(id);
            if (!livro) {
                res.status(404).json({ msg: "Livro não encontrado!" });
                return;
            }
            res.status(200).json(livro);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar livro", erro: error.message });
        }
    }
    static buscarPorAno(req, res) {
        try {
            const ano = req.params.ano;
            const livros = LivroModel.buscarPorAno(ano);
            if (livros.length === 0) {
                res.status(404).json({ msg: "Nenhum livro com este ano de publicação!" });
                return;
            }
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar os livros", erro: error.message });
        }
    }

    static buscarPorAutorId(req, res) {
        try {
            const id = req.params.id;
            const livro = LivroModel.buscarPorAutor(id);
            if (livro.length === 0) {
                res.status(404).json({ msg: "Livro não encontrado com esse autor ID!" });
                return;
            }
            res.status(200).json(livro);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar livro por autor id", erro: error.message });
        }
    }
    static buscarPorCategoriaId(req, res) {
        try {
            const id = req.params.id;
            const livro = LivroModel.buscarPorCategoria(id);
            if (livro.length === 0) {
                res.status(404).json({ msg: "Livro não encontrado com essa categoria ID!" });
                return;
            }
            res.status(200).json(livro);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar livro por categoria id ", erro: error.message });
        }
    }

    // static buscarPorNomeAutor(req, res){
    //     try {
    //      const nomeAutor = req.params.nomeAutor;
    //     const autores = AutorModel.buscarPorNome(nomeAutor);
    //     if(autores.length === 0){
    //         res.status(404).json({msg: "Nenhum livro encontrado com esse autor"});
    //         return;
    //     }
    //     const livrosAutores = [];

    //     const livros = LivroModel.listar();

    //     livros.forEach(l=>{

    //         autores.forEach(a=>{
    //             if(l.autorId === a.id){
    //                 const livro = {
    //                     titulo: l.titulo,
    //                     autor: a.nome,
    //                     nacionalidade: a.nacionalidade,
    //                     categoria: l.categoriaId,
    //                     preco: l.preco,
    //                     anoPublicacao: l.anoPublicacao
    //                 }
    //                 livrosAutores.push(livro);
    //             }
    //         });

    //     });
    //     res.status(200).json(livrosAutores);
    //     } catch (error) {
    //         res.status(500).json({msg: "Erro ao buscar o livro pelo autor", erro: error.message});
    //     }
    // }    

static buscarPorNomeAutor(req, res) {
    try {
        const nomeAutor = req.params.nomeAutor;
        const autores = AutorModel.buscarPorNome(nomeAutor);

        if (autores.length === 0) {
            return res.status(404).json({ msg: "Nenhum livro encontrado com esse autor" });
        }

        const autorMap = new Map(autores.map(autor => [autor.id, autor]));

        const livros = LivroModel.listar();
        const categorias = CategoriaModel.listar(); 
        const categoriaMap = new Map(categorias.map(cat => [cat.id, cat.nome]));

        const livrosAutores = livros
            .filter(livro => autorMap.has(livro.autorId))
            .map(livro => {
                const autor = autorMap.get(livro.autorId);
                const nomeCategoria = categoriaMap.get(livro.categoriaId) || "Categoria desconhecida";

                return {
                    titulo: livro.titulo,
                    autor: autor.nome,
                    nacionalidade: autor.nacionalidade,
                    categoria: nomeCategoria, 
                    preco: livro.preco,
                    anoPublicacao: livro.anoPublicacao
                };
            });

        return res.status(200).json(livrosAutores);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar o livro pelo autor", erro: error.message });
    }
}

static buscarPorNomeCategoria(req, res) {
    try {
        const nomeCategoria = req.params.nomeCategoria;
        const categorias = CategoriaModel.buscarPorNome(nomeCategoria);

        if (categorias.length === 0) {
            return res.status(404).json({ msg: "Nenhum livro encontrado com essa categoria" });
        }
        const autores = AutorModel.listar();
        const autorMap = new Map(autores.map(autor => [autor.id, autor]));

        const livros = LivroModel.listar();
        const categoriaMap = new Map(categorias.map(cat => [cat.id, cat.nome]));

        const livrosCategorias = livros
            .filter(livro => categoriaMap.has(livro.categoriaId))
            .map(livro => {
                const autor = autorMap.get(livro.autorId);
                const nomeCategoria = categoriaMap.get(livro.categoriaId) || "Categoria desconhecida";

                return {
                    titulo: livro.titulo,
                    autor: autor.nome,
                    nacionalidade: autor.nacionalidade,
                    categoria: nomeCategoria, 
                    preco: livro.preco,
                    anoPublicacao: livro.anoPublicacao
                };
            });

        return res.status(200).json(livrosCategorias);
    } catch (error) {
        return res.status(500).json({ msg: "Erro ao buscar o livro pela categoria", erro: error.message });
    }
}







}