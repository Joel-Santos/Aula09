import { categorias } from "../data/banco.js";

export default class CategoriaModel{
    static listar(){
        return categorias;
    }
    static buscarPorId(id){
        return categorias.find(a => a.id === Number(id));
    }
    static buscarPorNome(nome){
        return categorias.filter(a => a.nome.toLowerCase() === nome.toLowerCase());
    }
    static criar(categoria){
        categorias.push(categoria);
        return categoria;
    }

    static atualizar(id, dados){
        const index = categorias.findIndex(a => a.id === Number(id));
        if(index === -1){
            return null
        }
        categorias[index] = {...categorias[index], ...dados};
        return categorias[index];
    }

    static deletar(id){
        const index = categorias.findIndex(a => a.id === Number(id));
        if(index === -1){
            return false;
        }
        categorias.splice(index, 1);
        return true;
    }
    



}