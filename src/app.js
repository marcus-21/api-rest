import express from "express";
import dbConnect from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";


const conexao = await dbConnect();

conexao.on("error", (erro)=>{
  console.error("erro de conexão", erro);
});

conexao.once("open", ()=>{
  console.log("Conexão feita com sucesso");
});

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;
