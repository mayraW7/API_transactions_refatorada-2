import {v4 as uuidCreator} from 'uuid';
import { Transactions } from './transactions.model';
import { cpf as validCPF} from "cpf-cnpj-validator";


export class User {
    public _id: string;
    public transactions: Transactions[];

    constructor(public _name: string,public _cpf: number,public _email: string, public _age: number, private _password: string){
        this._id = uuidCreator();
        this.transactions = [];
    }

    public get id(){
        return this._id
    }

    public get name(){
        return this._name
    }

    public get cpf(){
        return this._cpf
    }

    public get email(){
        return this._email
    }

    public get age(){
        return this._age
    }
   
    public get password(){
        return this._password
    }

    public toJson(){
        return {
            id: this.id,
            name: this.name,
            cpf: validCPF.format(this.cpf.toString().padStart(11, "0")),
                    //capta number cpf, transforma em string, põe no início os zeros faltantes até o nº máximo determinado.Ex.:(11).
            email: this.email,
            age: this.age,
            password: this._password
        }
    }

}