import { livros, autores } from "../models/index.js";
import NotFound from "../erros/NotFound.js";

class LivroController{
 
  static async listarLivros (req, res, next) {
    try {
      const buscarLivros = livros.find();

      req.resultado = buscarLivros;

      next();
    }catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body; 
    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc}};
      const livroCriado = await livros.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }
  
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas , maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) busca.paginas = { $gte: minPaginas };
  if (maxPaginas) busca.paginas = { $lte: maxPaginas };
  if ( nomeAutor ) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if(autor !== null) {
      busca.autor = autor._id;
    }else{
      return busca = null;
    }
  }
  return busca;
}

export default LivroController;