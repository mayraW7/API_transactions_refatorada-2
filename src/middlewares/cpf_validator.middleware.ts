import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { cpf as validCPF} from "cpf-cnpj-validator";
import { ServerError } from "../errors/server.error";
import { usersList } from "../data/user";

export class CPFvalidatorMiddleware {
    public static cpfValidMiddleware (
        req: Request, res: Response, next: NextFunction
    ){
        try{
            const { cpf } = req.body;

            if (!cpf) {
                return RequestError.fieldNotProvided(res, "CPF")
            }
            const cpfText = cpf.toString().padStart(11, "0");
            let isValid = validCPF.isValid(cpfText);
            if(!isValid){
                return RequestError.invalid(res, "CPF")
            }

            next();
        }
        catch (error: any){
            return ServerError.genericError(res, error)
        }
    }
    public static cpfAlreadyExists(
        req: Request, res: Response, next:NextFunction
    ){
        try {
            const { cpf } = req.body;
            const userDatabase = usersList.find((user) => user.cpf === cpf);
            if(userDatabase){
                    return res.status(400).send({
                        ok:false,
                        message: "CPF already exists."
                    });
            }
            next();
        }catch(error: any){
            return ServerError.genericError(res, error);
        }
    }
}
export const cpfMiddlewares = [
    CPFvalidatorMiddleware.cpfValidMiddleware,
    CPFvalidatorMiddleware.cpfAlreadyExists,
];