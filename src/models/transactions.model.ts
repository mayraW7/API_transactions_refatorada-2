import {v4 as uuidCreator} from 'uuid';

export class Transactions {
    public id: string;
            constructor(public title: string,public value: number,public type: string){
                this.id = uuidCreator();
            }
}