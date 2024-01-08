import ErroBase from "../erros/erroBase.js";

export default class RequisicaoIncorreta extends ErroBase {
  constructor(message = "Um ou mais dados fornecidos estão incorretos.") {
    super(message, 400);
  }
}