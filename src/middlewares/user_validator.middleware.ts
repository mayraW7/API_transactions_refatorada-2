import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";


export class UserValidMiddleware {
  public static validationsRequiredFields(
    req: Request,res: Response, next: NextFunction
  ){
    try{
        const {name, cpf, email, age } = req.body;

        if(!name){
            return RequestError.fieldNotProvided(res, "Nome");
        }
        if (!cpf){
            return RequestError.fieldNotProvided(res, "CPF");
        }
        if (!email){
            return RequestError.fieldNotProvided(res, "Email");
        }
        if(!age){
            return RequestError.fieldNotProvided(res, "Age");
        }
        next()
    }
    catch(error: any){
        return ServerError.genericError(res, error);
    }
  }
}

export const validationsRequired = [UserValidMiddleware.validationsRequiredFields];