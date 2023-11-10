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