import { Transactions } from "../models/transactions.model";
import { User } from "../models/user.model";

export const usersList: User[] = [
    new User("maria", 66535152570, "m@g.com", 30, "12345"),
    new User("joao", 63272471804,"j@g.com",55, "123"),
    new User("julio", 42426862858, "jj@g.com",40,"5555")
];

usersList[0].transactions.push(new Transactions("mensalidade", 200, "outcome"));usersList[0].transactions.push(new Transactions("mercado", 500, "outcome"));usersList[0].transactions.push(new Transactions("salario", 30000, "income"));usersList[0].transactions.push(new Transactions("aluguel", 1200, "outcome"));