import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

export default class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const MENSAGENS_ERROS_VALIDACAO = Object.values(erro.errors).map(erro => erro.message).join("; ");
    super( `Os seguintes erros foram encontrados:${MENSAGENS_ERROS_VALIDACAO} Verifique e tente novamente.`);
  }
}