import { Router } from 'express';
import { TransactionsController } from '../controllers/transactions.controller';
import { UserController } from '../controllers/user.controller';
import { cpfMiddlewares} from '../middlewares/cpf_validator.middleware';
import { validTransaction } from '../middlewares/transaction_validator.middleware';
import { validationsRequired } from '../middlewares/user_validator.middleware';


export const appRoutes = () => {
// http://localhost:7007/
const app = Router();

// POST http://localhost:7007/users -> Esta rota permite criar um novo usuário, possui validações para requisição e também valida se de fato é um CPF verdadeiro e se já existe no app.
app.post("/", validationsRequired, cpfMiddlewares, new UserController().includeUser);
//                          -------

// GET http://localhost:7007/users -> Esta rota retorna todos os usuários, também possui filtros de busca via query params para buscar um usuário existente através do name, email ou cpf.
app.get("/", new UserController().getUsers);

//                          -------

// GET http://localhost:7007/users/:id -> Esta rota retorna o usuário conforme o ID informado via route params. É necessário saber o id para conseguir acessar esta rota.
app.get("/:id", new UserController().getId);

//                          -------

//POST http://localhost:7007/users/:userId/transactions -> Esta rota cria uma nova transação para o usuário identificado pelo ID da rota. Terá validação nos dados da transação captados pelo body params no momento da requisição.
app.post("/:userId/transactions", validTransaction, new TransactionsController().createTransaction);

//                          -------

//GET http://localhost:7007/users/:userId/transactions/:id -> Esta rota retorna a transação conforme os IDs(usuário e transação), informados via route params. É necessário informar ambos IDs para conseguir acessar esta rota.
app.get("/:userId/transactions/:id", new TransactionsController().transactionId)
//                          -------

//GET http://localhost:7007/users/:userId/transactions -> A rota retorna uma list do Usuário(ID) via route params com suas transações, total entradas, retiradas e total de crédito. Nesta rota tbm poderá filtrar as transações pelo título e tipo via query params.
app.get("/:userId/transactions/", new TransactionsController().transactionExtract);
//                          -------

//PUT http://localhost:7007/users/:userId/transactions/:id -> Esta rota permite editar a transação via body params.
app.put("/:userId/transactions/:id", new TransactionsController().update
);
//                          -------

//DELETE http://localhost:7007/users/:userId/transactions/:id -> Esta rota permite deletar a transação, é necessário informar os IDs via route params.
app.delete("/:userId/transactions/:id", new TransactionsController().delete);
//                          -------

app.post("/login", new UserController().loginUser);


return app;

};
