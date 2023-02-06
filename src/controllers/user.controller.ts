
import { Request, Response } from "express";
import { usersList } from "../data/user";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { User } from "../models/user.model";
import { SuccessResponse } from "../util/response.success";

export class UserController {

    public includeUser(req: Request, res: Response) {
        try{  

        const { name, cpf, email, age } = req.body;
     
        const user = new User(name,cpf,email,age);

        usersList.push(user);

        return SuccessResponse.created(res, "User was successfully create", user)

        }
        catch (error: any) {
                return ServerError.genericError(res, error);
        }
    };

    public getUsers (req: Request, res: Response){
        try{
        const { name, email, cpf } = req.query;
        
        let resultList = usersList.map((users)=> users.toJson());

        if(name) {
            let filterName = resultList.filter((user) => user.name === name)
       return SuccessResponse.success(res, "Name search filter result.", filterName)
    } 
        if(email) {
            let filterEmail = resultList.filter((user) => user.email === email)
        return SuccessResponse.success(res, "Email search filter result.", filterEmail)
    } 
        if(cpf) {
            let filterCpf = resultList.filter((user) => user.cpf === (cpf))
        return SuccessResponse.success(res, "Cpf search filter result.", filterCpf)
    } 

        return SuccessResponse.success(res, "Users list", usersList);

    }
        catch(error: any){
            return ServerError.genericError(res, error);
        }          
        
    }

    public getId (req: Request, res: Response){
        try{
            const { id } = req.params;
    
            const user = usersList.find(user=> user.id === id);
    
            if(!user) {
                return RequestError.notFound(res, "User");
            }

            const idResult = user.toJson();

            return SuccessResponse.success(res,"Usuário:", idResult);
    
        } catch (error: any) {
            return ServerError.genericError(res, error);     
        };
        }
}

