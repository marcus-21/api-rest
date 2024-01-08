import NotFound from "../erros/NotFound.js";

export default function manipulador404(req, res, next) {
  const ERROR404 = new NotFound();
  next(ERROR404);
}