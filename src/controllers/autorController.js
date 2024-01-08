import { autores } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static async listarAutorPorId (req, res , next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findById(id);

      if (autorEncontrado) {
        res.status(200).json(autorEncontrado);
      }else {
        next( new NotFound("Id do autor não localizado"));
      } 
    }catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor (req, res , next) {
    try {
      const novoAutor = await autores.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res , next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findByIdAndUpdate(id, req.body);
      if (autorEncontrado  !== null) {
        res.status(200).json({ message: "Autor atualizado com sucesso" });
      }else {
        next( new NotFound("Id do autor não localizado, não foi possivel atualizar o autor"));
      }
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor (req, res ,next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findByIdAndDelete(id);
      if (autorEncontrado !== null){
        res.status(200).json({ message: "Autor excluído com sucesso" });
      }else {
        next( new NotFound("Id do autor não localizado, não foi possivel excluir"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;