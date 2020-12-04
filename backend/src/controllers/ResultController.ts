import { Request, Response } from 'express';
import path from 'path';
import knex from '../database/connection';  
import {createObjectCsvWriter} from 'csv-writer';
require('dotenv/config');

class ResultController{


    async dadosMaes(req:Request,res:Response){
        const csv = createObjectCsvWriter({
            path: `${path.resolve(__dirname, '..', '..','csv')}/saida.csv`,
            header: [
                {id:'nome', title:'Nome'},
                {id:'email', title:'Email'},
                {id:'data_nascimento', title:'Dat. Nascimento'},
                {id:'amamentou_antes',title:'AM Antes'},
                {id:'tempo_amamentacao',title:'Tempo AM'},
                {id:'companheiro',title:'Companheiro'},
                {id:'moram_juntos',title:'TempoJuntos'},
                {id:'escolaridade', title:'Escolaridade'},
                {id:'renda', title:'Renda'},
            ]
        })
        const data = await knex('mae').select('*').orderBy('nome','asc');
        data.forEach((v,i,a)=>{
            v['data_nascimento'] = v['data_nascimento'].toLocaleDateString('pt-BR')
            v['amamentou_antes'] = v['amamentou_antes'] ? 'Sim' : 'Não'
            v['companheiro'] = v['companheiro'] ? 'Sim' : 'Não'
            v['moram_juntos'] = v['moram_juntos'] ? v['moram_juntos'] : ''
        })
        await csv.writeRecords(data)
        res.sendStatus(200)
    }

    async dadosBebes(req:Request,res:Response){
        const csv = createObjectCsvWriter({
            path: `${path.resolve(__dirname, '..', '..','csv')}/saida.csv`,
            header: [
                {id:'mae', title:'Mae'},
            ]
        })
        const data = await knex('bebe').join('mae','mae.id','=','bebe.mae_id').select('*').orderBy('mae.nome','asc');
        console.log(data)
        /*data.forEach((v,i,a)=>{
            v['']
        })*/
        await csv.writeRecords(data)
        res.sendStatus(200)
    }
}

export default ResultController;