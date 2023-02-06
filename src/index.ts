import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { appRoutes } from './routes/user.routes';

dotenv.config();
//npm install dotenv cors;
//import * as dotenv from 'dotenv';
// npm install -D @types/cors;
const app = express();
app.use(express.json());
app.use(cors()); // config qualquer um pode acessar;

app.use("/users", appRoutes());


//http://localhost:7007
app.listen(process.env.PORT, ()=>{
    console.log(`servidor rodando na porta ${process.env.PORT}!`);
});