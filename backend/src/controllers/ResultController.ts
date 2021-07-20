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

const enquete1Map = new Map<string, number>();
enquete1Map.set("Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)",1)
enquete1Map.set("Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)", 2)
enquete1Map.set("A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)", 3)
enquete1Map.set("Não consigo identificar nada de bom", 4)

const enquete2Map = new Map<string, number>();
enquete2Map.set("Pensar que é o melhor para o meu bebê",1)
enquete2Map.set("O incentivo que estou recebendo dos profissionais", 2)
enquete2Map.set("O incentivo que estou recebendo da minha família", 3)
enquete2Map.set("Pensar no custo da fórmula", 4)
enquete2Map.set("Outras motivações", 5)
enquete2Map.set("Não estou muito motivada a continuar", 6)

const enquete3Map = new Map<string, number>();
enquete3Map.set("Sim, tanto dos profissionais quanto da minha família",1)
enquete3Map.set("Apenas da minha família", 2)
enquete3Map.set("Apenas dos profissionais", 3)
enquete3Map.set("Parcialmente, tanto dos profissionais quanto da minha família", 4)
enquete3Map.set("Não estou recebendo ajuda", 5)

const enquete4Map = new Map<string, number>();
enquete4Map.set("Visita na Unidade de 1 a 2 vezes",1)
enquete4Map.set("Visita na Unidade mais de 2 vezes", 2)
enquete4Map.set("Canguru", 3)
enquete4Map.set("Me ajudou com a ordenha", 4)
enquete4Map.set("Ofereceu a dieta", 5)
enquete4Map.set("Limpou os olhinhos e boquinha do bebê", 6)
enquete4Map.set("Trocou fraldas", 7)
enquete4Map.set("Deu banho", 8)
enquete4Map.set("Ajudou mais em casa para que eu pudesse estar mais na Unidade", 9)
enquete4Map.set("Nenhuma das alternativas", 10)
enquete4Map.set("Canguru", 1)
enquete4Map.set("Me ajudou com a ordenha", 2)
enquete4Map.set("Limpou os olhinhos e boquinha do bebê", 3)
enquete4Map.set("Trocou fraldas", 4)
enquete4Map.set("Deu banho", 5)
enquete4Map.set("Fez dormir", 6)
enquete4Map.set("Estimulou e brincou", 7)
enquete4Map.set("Acompanhou consultas", 8)
enquete4Map.set("Ajudou mais em casa para que eu pudesse descansar", 9)
enquete4Map.set("Nenhuma das alternativas", 10)

const quadroBBMap = new Map<string, number>();
quadroBBMap.set("🙂 Continua como estava",0)
quadroBBMap.set("🙁 Piorou", 2)
quadroBBMap.set("😁 Melhorou", 1)

class ResultController{


    async dadosGerais(req:Request,res:Response){
        const pathCsv = `${path.resolve(__dirname, '..', '..')}/saida.csv`
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
                {id:'primeiro_estimulo2', title:'Tipo1ºEstimulo'},
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
                {id:'n_dias', title:'NºDiasVidaInícioApp'},
                {id:'score_1d', title:'BSES1'},
                {id:'score_alta', title:'BSESAlta'},
                {id:'score_15d', title:'BSES15d'},
                {id:'score_1m', title:'BSES1m'},
                {id:'alim_alta', title:'AlimAlta'},
                {id:'alim_15d', title:'Alim15d'},
                {id:'alim_1m', title:'Alim1m'},
                {id:'acessos_app', title:'NºAcessosAoApp'},
                {id:'acessos_diario', title:'NºAcessosDiário'},
                {id:'acesso_videos', title:'AcessosVideos'},
                {id:'enquete1', title:'Enquete1'},
                {id:'enquete2', title:'Enquete2'},
                {id:'enquete3', title:'Enquete3'},
                {id:'enquete4', title:'Enquete4'},
                {id:'acessos_msg', title:'AcessosMsg'},
                {id:'envios_msg', title:'EnviosMsg'},
                {id:'quadrobb1', title:'Quadro clínico do bebe 1'},
                {id:'quadrobb2', title:'Quadro clínico do bebe 2'},
                {id:'canguru', title:'Canguru'},
                {id:'cuidados', title:'Cuidados'},
                {id:'sentimentos_positivos', title:'N°SentimPosit/NºAcessosDiário'},
                {id:'sentimentos_negativos', title:'SentimNeg/NºRegistrosSentim'},
                {id:'alim_verde', title:'AlimVerde/NºRegistrosAlim'},
                {id:'alim_laranja', title:'AlimLaranj'},
                {id:'alim_vermelha', title:'AlimVerm'},
                {id:'n_metas', title:'N°RegistrosMetas'},
                {id:'menor3_acoes', title:'<3Ações'},
                {id:'3-4_acoes', title:'3-4ações'},
                {id:'maior4_acoes', title:'>4ações'},
                {id:'registros_ordenha', title:'RegistrosOrd/AcessoDiário'},
                {id:'registros_ajuda', title:'RegistrAjudaProfiss'},
                {id:'registros_apoio', title:'RegistrApoio'},
                {id:'acessos_ordenha', title:'NºAcessosOrd'},
                {id:'volum_ordenhas', title:'VolMéd3últimasOrdenhas'},
                {id:'media_mamadas', title:'MédiaMamadasDia'},
                {id:'baby_feed1', title:'BabyFeed1'},
                {id:'baby_feed2', title:'BabyFeed2'},
                {id:'baby_feed3', title:'BabyFeed3'},
                {id:'baby_feed4', title:'BabyFeed4'},
                {id:'baby_feed5', title:'BabyFeed5'},
                {id:'baby_feed6', title:'BabyFeed6'}
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
                    mae[`dias_internadosbb${j}`] = Math.floor(dias)
                }
                if(mae.primeiro_acesso){
                    const diff = moment(mae.primeiro_acesso).diff(moment(bebe.data_parto));
                    const dias = moment.duration(diff).asDays();
                    mae[`n_dias`] = Math.floor(dias)
                }

                const quadro = await knex('resposta').select('descricao').where('mae_id',mae.id).where('pergunta_id',5).orderBy('data','desc').first()
                if(quadro){
                    const resul = quadroBBMap.get(quadro.descricao)
                    if(resul)
                        mae[`quadrobb${j}`] = resul
                }
                
                j++
            }

            mae['gemelar'] = mae['alocacao2'] !== null && mae['alocacao2'] !== undefined ? 1 : 0

            mae['filhos_vivos'] = mae.qtd_filhos_vivos
            mae['orientacao_amamentacao'] = mae.orientacao_prenatal ? 1 : 0
            mae['amamentou_antes'] = mae.amamentou_antes ? 1 : 0
            mae['companheiro'] = mae.companheiro ? 1 : 0
            mae['mora'] = mae.moram_juntos ? 1 : 0
            mae['primeiro_estimulo2'] = mae.primeiro_estimulo === true ? 1 : 2
            mae['tempo_juntos'] = mae.moram_juntos
            mae['ocupacao'] = mae.ocupacao ? 1 : 0
            mae['licenca_maternidade'] = mae.licenca_maternidade ? mae.licenca_maternidade : 0

            const [count1] = await knex('mensagem').count().where('mae_id',mae.id)
            mae['envios_msg'] = count1['count']
            mae['acesso_videos'] = mae.acesso_inicio_videos ? 1 : 0

            const resposta1 = await knex('resposta').select('descricao').where('mae_id',mae.id).where('pergunta_id',1).orderBy('data','desc').first()
            if(resposta1){
                const resul = enquete1Map.get(resposta1.descricao)
                if(resul){
                    mae['enquete1'] = resul
                }else mae['enquete1'] = 5
            }else mae['enquete1'] = 0

            const resposta2 = await knex('resposta').select('descricao').where('mae_id',mae.id).where('pergunta_id',2).orderBy('data','desc').first()
            if(resposta2){
                const resul = enquete2Map.get(resposta2.descricao)
                if(resul)
                    mae['enquete2'] = resul
            }else mae['enquete2'] = 0

            const resposta3 = await knex('resposta').select('descricao').where('mae_id',mae.id).where('pergunta_id',3).orderBy('data','desc').first()
            if(resposta3){
                const resul = enquete3Map.get(resposta3.descricao)
                if(resul)
                    mae['enquete3'] = resul
            }else mae['enquete3'] = 0

            const resposta4 = await knex('resposta').select('descricao').where('mae_id',mae.id).where('pergunta_id',13).orWhere('pergunta_id',14).orderBy('data','desc').first()
            if(resposta4){
                const resul = enquete4Map.get(resposta4.descricao)
                if(resul)
                    mae['enquete4'] = resul
            }else mae['enquete4'] = 0

            const [count2] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','like', '%canguru%').where('pergunta_id',15).orWhere('pergunta_id',16)
            mae[`canguru`] = count2['count']

            const [count3] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','like', '%cuidados%').where('pergunta_id',15).orWhere('pergunta_id',16)
            mae[`cuidados`] = count3['count']

            const [feed1] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'Apenas no meu peito').where('pergunta_id',6)
            mae[`baby_feed1`] = feed1['count'] == 0 ? 0 : 1

            const [feed2] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'No meu peito, c/ complemento por copinho').where('pergunta_id',6)
            mae[`baby_feed2`] = feed2['count'] == 0 ? 0 : 1

            const [feed3] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'Por relactação/translactação').where('pergunta_id',6)
            mae[`baby_feed3`] = feed3['count'] == 0 ? 0 : 1

            const [feed4] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'Apenas por copinho').where('pergunta_id',6)
            mae[`baby_feed4`] = feed4['count'] == 0 ? 0 : 1

            const [feed5] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'Por chuca').where('pergunta_id',6)
            mae[`baby_feed5`] = feed5['count'] == 0 ? 0 : 1

            const [feed6] = await knex('resposta').count().where('mae_id',mae.id).where('descricao','=', 'Por sonda').where('pergunta_id',6)
            mae[`baby_feed6`] = feed6['count'] == 0 ? 0 : 1

            const [registros_ordenha] = await knex('ordenha').count().where('mae_id',mae.id)
            const reg : any = registros_ordenha['count']
            if(mae.acessos_diario !== 0)
                mae[`registros_ordenha`] =  reg/mae.acessos_diario

            const [registros_ajuda] = await knex('resposta').count().where('mae_id',mae.id).where('pergunta_id',11)
            mae[`registros_ajuda`] = registros_ajuda['count'] == 0 ? 0 : 1

            const [registros_apoio] = await knex('resposta').count().where('mae_id',mae.id).where('pergunta_id',12)
            mae[`registros_apoio`] = registros_apoio['count'] == 0 ? 0 : 1
            
            if(mae.primeiro_acesso){
                const [media_mamadas] = await knex('mamada').count()
                        .join('bebe','bebe.id','=','bebe_id')
                        .where('bebe.mae_id',mae.id)
                const reg_mamadas : any = media_mamadas['count']
                const diff = moment(new Date()).diff(mae.primeiro_acesso);
                const dias = moment.duration(diff).asDays();
                const dias_app = Math.floor(dias)
                console.log(dias_app)
                if(dias_app !== 0)
                    mae[`media_mamadas`] =  reg_mamadas/dias_app
                else mae['media_mamadas'] = reg_mamadas
            }

            const ultimas_ordenhas = await knex('ordenha').where('mae_id',mae.id).orderBy('data_hora','desc').limit(3)
            let qtd_leite = 0
            for (const ordenha of ultimas_ordenhas) {
                qtd_leite+=ordenha.qtd_leite
            }
            if(ultimas_ordenhas.length != 0)
                mae['volum_ordenhas'] = qtd_leite/ultimas_ordenhas.length

            const [metas] = await knex('resposta').count().where('mae_id',mae.id).whereIn('pergunta_id',[8,9,10])
            mae['n_metas'] = metas['count']

            if(mae.acessos_diario !== 0){
                const [countSentPos] = await knex('resposta').count()
                        .where('mae_id', mae.id).where('pergunta_id', 4)
                        .where('descricao', 'like', '%Feliz%')
                        .orWhere('descricao', 'like', '%Confiante%')
                        .orWhere('descricao', 'like', '%Orgulhosa%')
                const sentimentos_positivos : any = countSentPos['count']
                mae['sentimentos_positivos'] = sentimentos_positivos / mae.acessos_diario

                const [countSentNeg] = await knex('resposta').count()
                        .where('mae_id', mae.id).where('pergunta_id', 4)
                        .where('descricao', 'like', '%Ansiosa%')
                        .orWhere('descricao', 'like', '%Triste%')
                        .orWhere('descricao', 'like', '%Desanimada%')
                        .orWhere('descricao', 'like', '%Preocupada%')
                const sentimentos_negativos : any = countSentNeg['count']
                mae['sentimentos_negativos'] = sentimentos_negativos / mae.acessos_diario

                const [countVerdes] = await knex('resposta').count()
                        .where('mae_id', mae.id).where('pergunta_id', 6)
                        .where('descricao', 'Apenas no meu peito')
                const alim_verdes : any = countVerdes['count']
                const [countLaranja] = await knex('resposta').count()
                        .where('mae_id', mae.id).where('pergunta_id', 6)
                        .where('descricao', 'like', '%complemento%')
                        .orWhere('descricao', 'like', '%relactação%')
                const alim_laranja : any = countLaranja['count']
                const [countVerm] = await knex('resposta').count()
                        .where('mae_id', mae.id).where('pergunta_id', 6)
                        .where('descricao', 'like', '%copinho%')
                        .orWhere('descricao', 'like', '%chuca%')
                        .orWhere('descricao', 'like', '%sonda%')
                const alim_verm : any = countVerm['count']
                mae['alim_verde'] = alim_verdes / mae.acessos_diario
                mae['alim_laranja'] = alim_laranja / mae.acessos_diario
                mae['alim_vermelha'] = alim_verm / mae.acessos_diario


                const acoes = await knex('resposta').count().where('mae_id',mae.id)
                    .where('pergunta_id',15).orWhere('pergunta_id',15)
                    .groupByRaw('date_trunc(\'day\', data)')

                mae['menor3_acoes'] = 0,
                mae['3-4_acoes'] = 0,
                mae['maior4_acoes'] = 0
                
                for (const acao of acoes){
                    if(acao['count']<3) mae['menor3_acoes']++
                    else if(acao['count']>4) mae['maior4_acoes']++
                    else mae['3-4_acoes']++
                }
            }
        }


        await csv.writeRecords(maes)
        //res.sendStatus(200)
        res.download(pathCsv,"dados_gerais.csv")
    }
}

export default ResultController;