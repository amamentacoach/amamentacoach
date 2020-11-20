import { Request, Response } from 'express';
import path from 'path';
import knex from '../database/connection';  
import {createObjectCsvWriter} from 'csv-writer';
require('dotenv/config');

class ResultController{


    async generate(req:Request,res:Response){
        const csv = createObjectCsvWriter({
            path: `${path.resolve(__dirname, '..', '..','csv')}/saida.csv`,
            header: [
                {id:'nome', title:'Nome'},
                {id:'email', title:'Email'},
                {id:'data_nascimento', title:'Dat. Nascimento'},
                {id:'escolaridade', title:'Escolaridade'},
                {id:'teste',title:'Teste'}
            ]
        })
        const data = await knex('mae').select('nome','email','data_nascimento','escolaridade')
        data.forEach((v,i,a)=>{
            v['data_nascimento'] = v['data_nascimento'].toLocaleDateString('pt-BR')
            v['teste'] = 'testando'
        })
        await csv.writeRecords(data)
        res.sendStatus(200)
    }
}

export default ResultController;