import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";


export class TransactionValidMiddleware {
  public static validationsTransaction(
    req: Request,res: Response, next: NextFunction
  ){
    try{
        const { title, value, type} = req.body;
        if(!title){
            return RequestError.fieldNotProvided(res,"Title not provided.");
        }
        if(!value){
            return RequestError.fieldNotProvided(res,"Value not provided.");
        }
        if(!type){
            return RequestError.fieldNotProvided(res,"Type not provided.");
        }
        if(type !== 'income' && type !== 'outcome'){
            return RequestError.invalid(res, "Type value")
        }

        next()
    }
    catch(error: any){
        return ServerError.genericError(res, error);
    }
  }
}

export const validTransaction = [TransactionValidMiddleware.validationsTransaction];