import ErroBase from "./erroBase.js";

export default class NotFound extends ErroBase {
  constructor( message = "Página não encontrada") {
    super(message , 404);
  }
  
}