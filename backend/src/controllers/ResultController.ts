import { Request, Response } from 'express';
import path from 'path';
import knex from '../database/connection';  
import {createObjectCsvWriter} from 'csv-writer';
import moment from 'moment'
require('dotenv/config');

const alvosMap = new Map<string, number>();
alvosMap.set("Alojamento conjunto",0)
alvosMap.set("UCI Neonatal", 1)
alvosMap.set("UTI Neonatal", 2)

class ResultController{


    async dadosMaes(req:Request,res:Response){
        const pathCsv = `${path.resolve(__dirname, '..', '..','csv')}/saida.csv`
        const csv = createObjectCsvWriter({
            path: pathCsv,
            header: [
                {id:'nome', title:'Usuária'},
                {id:'grupo', title:'Grupo'},
                {id:'alocacao1', title:'AlocaçãoBB1'},
                {id:'alocacao2', title:'AlocaçãoBB2'},
                {id:'idade',title:'IdadeMãe'},
                {id:'planejada',title:'Gestação Planejada'},
                {id:'complicacoes',title:'Complicações na Gestação'},
                {id:'data_parto', title:'DataParto'},
                {id:'tipo_parto', title:'TipoParto'},
                {id:'idade_gestacional', title:'IG'},
                {id:'gemelar', title:'Gemelar'},
                {id:'pesobb1', title:'PesoBB1'},
                {id:'pesobb2', title:'PesoBB2'},
                {id:'apgar1bb1', title:'Apgar1BB1'},
                {id:'apgar5bb1', title:'Apgar5BB1'},
                {id:'apgar1bb2', title:'Apgar1BB2'},
                {id:'apgar5bb2', title:'Apgar5BB2'},
                {id:'primeira_visita', title:'Primeira visita'},
                {id:'primeiro_estimulo', title:'Tipo1ºEstimulo'},
                {id:'dias_internadosbb1', title:'DiasInternadosBB1'},
                {id:'dias_internadosbb2', title:'DiasInternadosBB2'},
                {id:'filhos_vivos', title:'NºFilhosVivos'},
                {id:'orientacao_amamentacao', title:'Orientada no PN sobre AM'},
                {id:'amamentou_antes', title:'AM antes'},
                {id:'tempo_amamentacao', title:'TempoTotalAM'},
                {id:'companheiro', title:'Companheiro'},
                {id:'mora', title:'Mora'},
                {id:'tempo_juntos', title:'TempoJuntos'},
                {id:'escolaridade', title:'Escolaridade'},
                {id:'ocupacao', title:'Ocupação'},
                {id:'licenca_maternidade', title:'Licença maternidade'},
                {id:'renda', title:'Renda'},
                {id:'score_1d', title:'BSES1'},
                {id:'score_alta', title:'BSESAlta'},
                {id:'score_15d', title:'BSES15d'},
                {id:'score_1m', title:'BSES1m'},
                {id:'alim_alta', title:'AlimAlta'},
                {id:'alim_15d', title:'Alim15d'},
                {id:'alim_1m', title:'Alim1m'}
            ]
        })
        const maes = await knex('mae').select('*').where('status',1);
        
        for(const mae of maes){
            mae['grupo'] = 1

            const diff = moment(new Date()).diff(moment(mae.data_nascimento));
            const anos = moment.duration(diff).asYears();  
            mae['idade'] = Math.trunc(anos)

            mae['planejada'] = mae['gestacao_planejada'] ? 1 : 0
            

            const bebes = await knex('bebe').select('*').where('mae_id',mae.id)
            let j = 1
            for (const bebe of bebes) {
                mae[`pesobb${j}`] = bebe.peso
                mae[`complicacoes`] = bebe.complicacoes ? 1 : 0
                mae[`data_parto`] = bebe.data_parto.toLocaleDateString('pt-br')
                mae[`tipo_parto`] = bebe.tipo_parto ? 1 : 0
                mae[`alocacao${j}`] = alvosMap.get(bebe.local)
                mae['idade_gestacional'] = bebe.semanas_gest
                mae[`apgar1bb${j}`] = bebe.apgar1
                mae[`apgar5bb${j}`] = bebe.apgar2
                if(bebe.data_alta){
                    const diff = moment(bebe.data_alta).diff(moment(bebe.data_parto));
                    const dias = moment.duration(diff).asDays();  
                    mae[`dias_internadosbb${j}`] = dias
                }
                
                j++
            }

            mae['gemelar'] = j > 1 ? 1 : 0

            mae['filhos_vivos'] = mae.qtd_filhos_vivos
            mae['orientacao_amamentacao'] = mae.orientacao_prenatal ? 1 : 0
            mae['amamentou_antes'] = mae.amamentou_antes ? 1 : 0
            mae['companheiro'] = mae.companheiro ? 1 : 0
            mae['mora'] = mae.moram_juntos ? 1 : 0
            mae['tempo_juntos'] = mae.moram_juntos
            mae['ocupacao'] = mae.ocupacao ? 1 : 0
            mae['licenca_maternidade'] = mae.licenca_maternidade ? mae.licenca_maternidade : 0

        }


        await csv.writeRecords(maes)
        res.download(pathCsv,"dados_gerais.csv")
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