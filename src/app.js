import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";


const conexao = await dbConnect();

conexao.on("error", (erro)=>{
  console.error("erro de conexão", erro)
});

conexao.once("open", ()=>{
  console.log("Conexão feita com sucesso");
})

const app = express();
routes(app);


app.get("/livros/:id", (req, res) => {
  const index = buscarLivroPorId(req.params.id);
  res.status(201).json(livros[index]);
  
})

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro criado com sucesso ✅");
})

app.put("/livros/:id", (req, res) => {
  const index = buscarLivroPorId(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros)
})

app.delete("/livros/:id", (req, res) => {
  const index = buscarLivroPorId(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro excluido com sucesso ✅");
})

export default app;


// const livros = [
//   {
//     id: 1,
//     titulo: "O Senhor dos Aneis"
//   },
//   {
//     id: 2,
//     titulo: "As Crônicas de Gelo e Fogo"
//   }
// ]

// function buscarLivroPorId(id){
//   return livros.findIndex((livros)=>{
//     return livros.id === Number(id)
//   })
// }