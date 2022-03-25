import {Router, Request, Response} from 'express';
import multer from 'multer';
import path from 'path'
import uploadConfig from './config/upload';
import verifyJWT from './middleware/verifyJWT';

import MaesController from './controllers/MaesController';
import OrdenhasController from './controllers/OrdenhasController';
import MensagensController from './controllers/MensagensController';
import PerguntasController from './controllers/PerguntasController';
import RespostasMaeController from './controllers/RespostasMaeController';
import RespostasController from './controllers/RespostasController';
import UploadController from './controllers/UploadController';
import BebesController from './controllers/BebesController';
import sendPushNotification, { sendPushNotificationAlta } from './utils/sendPushNotification';
import ResultController from './controllers/ResultController';
import MamadasController from './controllers/MamadasController';
import DuvidasController from './controllers/DuvidasController';
import RelatorioDiarioController from './controllers/RelatorioDiarioController';
import RelatorioSemanalController from './controllers/RelatorioSemanalController';
import AcessosController from './controllers/AcessosController';
import AltaController from './controllers/AltaController';
import TelemetriaController from './controllers/TelemetriaController';
import AdminController from './controllers/AdminController';
import UserController from './controllers/UserController';


const maesController = new MaesController();
const bebesController = new BebesController();
const ordenhasController = new OrdenhasController();
const mensagensController = new MensagensController();
const perguntasController = new PerguntasController();
const respostasMaeController = new RespostasMaeController();
const respostasController = new RespostasController();
const uploadController = new UploadController();
const resultController = new ResultController();
const mamadasController = new MamadasController();
const duvidasController = new DuvidasController();
const relatorioDiarioController = new RelatorioDiarioController();
const relatorioSemanalController = new RelatorioSemanalController();
const acessosController = new AcessosController();
const altaController = new AltaController();
const telemetriaController = new TelemetriaController();
const adminController = new AdminController();
const userController = new UserController()

const routes = Router()
const uploadMiddleware = multer(uploadConfig);


/**
 * @api {post} /maes Cadastro
 * @apiGroup Mães
 *
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com",
 *          "senha":"abc123",
 *          "nome": "Fulana de Tal",
 *          "data_nascimento":"1990-05-05",
 *          "amamentou_antes":false,
 *          "companheiro":true,
 *          "moram_juntos":"2,0", // caso nao more junto enviar NULL | Formato ano,meses
 *          "escolaridade":"Ensino Medio Completo",
 *          "renda":"Entre 1 e 3 salarios minimos",
 *          "qtd_gravidez":2,
 *          "tempo_amamentacao": ["2,3", "1,0"], // tempo de amamentacao total de cada gestação | formato: ano,meses
 *          "whatsapp":"(43) 999999999",
 *          "gestacao_planejada": true,
 *          "qtd_filhos_vivos": 3,
 *          "orientacao_prenatal": true,
 *          "ocupacao": true, // Em casa (do lar) = false | Fora de casa = true
 *          "licenca_maternidade": 6, // Qtd de meses de licenca maternidade - Caso nao tenha: null
 *          "localizacao": "HU-UEL",
 *          "telefone2": "(43) 999999999",
 *          "qtd_abortos": 1,
 *          "numero_filhos_gestacao": 1,
 *          "consultas_prenatal": "5", // 0 caso não tenha realizado prenatal 
 *          "complicacoes_gestacao": "Sim, relacionadas ao COVID-19"
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNjczMDA5LCJleHAiOjE2MDUyNjUwMDl9.wFrGTEfQ3s_7DNlsFDV88NDYGtXPMrpT-mlWvSAEomg"
 *      }
 *
 */
routes.post('/maes',maesController.create);

/**
 * @api {post} /user Cadastro
 * @apiGroup Usuário
 *
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com",
 *          "senha":"abc123",
 *          "nome": "Fulana de Tal",
 *          "data_nascimento":"1990-05-05",
 *          "companheiro":true,
 *          "localizacao": "HU-UEL",
 *          "bebes": [
 *               {
 *                   "nome":"Enzo Gabriel",
 *                   "data_parto":"2020-08-28",
 *                   "local":"UCI Neonatal"
 *               }                
 *          ]
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNjczMDA5LCJleHAiOjE2MDUyNjUwMDl9.wFrGTEfQ3s_7DNlsFDV88NDYGtXPMrpT-mlWvSAEomg"
 *      }
 *
 */
 routes.post('/user', userController.create);

 /**
 * @api {put} /user Alteração de Cadastro
 * @apiGroup Usuário
 * 
 * @apiHeader {String} authorization Token de acesso.
 *
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com",
 *          "nome": "Fulana de Tal",
 *          "data_nascimento":"1990-05-05",
 *          "companheiro":true,
 *          "localizacao": "HU-UEL",
 *          "bebes": [
 *               {
 *                   "id": 1,
 *                   "nome":"Enzo Gabriel",
 *                   "data_parto":"2020-08-28",
 *                   "local":"UCI Neonatal"
 *               }                
 *          ]
 *      }
 * 
* @apiSuccessExample {json} Sucesso:
 *   {
 *       "id": 1,
 *       "email": "fulana@email.com",
 *       "nome": "Fulana de Tal",
 *       "data_nascimento": "1990-05-05T03:00:00.000Z",
 *       "amamentou_antes": false,
 *       "tempo_amamentacao": [
 *           "2,3",
 *           "1,0"
 *       ],
 *       "companheiro": true,
 *       "moram_juntos": "2,0",
 *       "escolaridade": "Ensino Medio Completo",
 *       "renda": "Entre 1 e 3 salarios minimos",
 *       "qtd_gravidez": 2,
 *       "ultimo_acesso": "2022-01-21T13:33:20.297Z",
 *       "primeiro_acesso": "2022-01-21T13:33:20.297Z",
 *       "imagem_mae": null,
 *       "imagem_pai": null,
 *       "imagem_bebe": null,
 *       "gestacao_planejada": true,
 *       "primeira_visita": null,
 *       "primeiro_estimulo": "false",
 *       "tempo_primeiro_estimulo": null,
 *       "qtd_filhos_vivos": "3",
 *       "orientacao_prenatal": true,
 *       "ocupacao": true,
 *       "licenca_maternidade": 6,
 *       "acesso_videos": false,
 *       "acessos_app": 1,
 *       "acessos_diario": 0,
 *       "user_id": null,
 *       "whatsapp": "(43) 999999999",
 *       "score_1d": null,
 *       "score_15d": null,
 *       "score_alta": null,
 *       "score_1m": null,
 *       "alim_15d": null,
 *       "alim_alta": null,
 *       "alim_1m": null,
 *       "acessos_msg": 0,
 *       "acessos_ordenha": 0,
 *       "acesso_inicio_videos": false,
 *       "status": 0,
 *       "motivo_revogacao": null,
 *       "localizacao": "HU-UEL",
 *       "telefone2": "(43) 999999999",
 *       "qtd_abortos": 1,
 *       "numero_filhos_gestacao": 1,
 *       "consultas_prenatal": "5",
 *       "complicacoes_gestacao": "Sim, relacionadas ao COVID-19",
 *       "bebes": [
 *       	{
 *       		"id": 1,
 *       		"nome": "Enzo Gabriel",
 *       		"data_parto": "2020-08-28T03:00:00.000Z",
 *       		"semanas_gest": 35,
 *       		"dias_gest": 5,
 *       		"peso": 2.5,
 *       		"apgar1": 8,
 *       		"apgar2": 10,
 *       		"tipo_parto": true,
 *       		"local": "UCI Neonatal",
 *       		"mae_id": 1,
 *       		"complicacoes": "Sim, relacionadas ao COVID-19",
 *       		"data_alta": null,
 *       		"local_cadastro": "UCI Neonatal",
 *       		"contato_pele": true,
 *       		"primeiro_estimulo": [
 *       			"Massagem/ordenha",
 *       			"Sucção"
 *       		],
 *       		"primeira_visita": "12h",
 *       		"tempo_primeiro_estimulo": "7-12h",
 *       		"mamadas": []
 *       	}
 *       ],
 *       "ordenhas": []
 *   }
 *
 */
  routes.put('/user', verifyJWT, userController.update);


/**
 * @api {get} /maes Dados da mae
 * @apiDescription Retorna os dados da mae logada
 * @apiGroup Mães
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiSuccessExample {json} Sucesso:
 *   {
 *       "id": 1,
 *       "email": "fulana@email.com",
 *       "nome": "Fulana de Tal",
 *       "data_nascimento": "1990-05-05T03:00:00.000Z",
 *       "amamentou_antes": false,
 *       "tempo_amamentacao": [
 *           "2,3",
 *           "1,0"
 *       ],
 *       "companheiro": true,
 *       "moram_juntos": "2,0",
 *       "escolaridade": "Ensino Medio Completo",
 *       "renda": "Entre 1 e 3 salarios minimos",
 *       "qtd_gravidez": 2,
 *       "ultimo_acesso": "2022-01-21T13:33:20.297Z",
 *       "primeiro_acesso": "2022-01-21T13:33:20.297Z",
 *       "imagem_mae": null,
 *       "imagem_pai": null,
 *       "imagem_bebe": null,
 *       "gestacao_planejada": true,
 *       "primeira_visita": null,
 *       "primeiro_estimulo": "false",
 *       "tempo_primeiro_estimulo": null,
 *       "qtd_filhos_vivos": "3",
 *       "orientacao_prenatal": true,
 *       "ocupacao": true,
 *       "licenca_maternidade": 6,
 *       "acesso_videos": false,
 *       "acessos_app": 1,
 *       "acessos_diario": 0,
 *       "user_id": null,
 *       "whatsapp": "(43) 999999999",
 *       "score_1d": null,
 *       "score_15d": null,
 *       "score_alta": null,
 *       "score_1m": null,
 *       "alim_15d": null,
 *       "alim_alta": null,
 *       "alim_1m": null,
 *       "acessos_msg": 0,
 *       "acessos_ordenha": 0,
 *       "acesso_inicio_videos": false,
 *       "status": 0,
 *       "motivo_revogacao": null,
 *       "localizacao": "HU-UEL",
 *       "telefone2": "(43) 999999999",
 *       "qtd_abortos": 1,
 *       "numero_filhos_gestacao": 1,
 *       "consultas_prenatal": "5",
 *       "complicacoes_gestacao": "Sim, relacionadas ao COVID-19",
 *       "bebes": [
 *       	{
 *       		"id": 1,
 *       		"nome": "Enzo Gabriel",
 *       		"data_parto": "2020-08-28T03:00:00.000Z",
 *       		"semanas_gest": 35,
 *       		"dias_gest": 5,
 *       		"peso": 2.5,
 *       		"apgar1": 8,
 *       		"apgar2": 10,
 *       		"tipo_parto": true,
 *       		"local": "UCI Neonatal",
 *       		"mae_id": 1,
 *       		"complicacoes": "Sim, relacionadas ao COVID-19",
 *       		"data_alta": null,
 *       		"local_cadastro": "UCI Neonatal",
 *       		"contato_pele": true,
 *       		"primeiro_estimulo": [
 *       			"Massagem/ordenha",
 *       			"Sucção"
 *       		],
 *       		"primeira_visita": "12h",
 *       		"tempo_primeiro_estimulo": "7-12h",
 *       		"mamadas": []
 *       	}
 *       ],
 *       "ordenhas": []
 *   }
 *
 */
routes.get('/maes', verifyJWT,maesController.show);


/**
 * @api {post} /bebes Cadastro
 * @apiGroup Bebês
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "nome":"Enzo Gabriel",
 *          "data_parto":"2020-08-28",
 *          "semanas_gest": 35,
 *          "dias_gest":5,
 *          "complicacoes": "Sim, relacionadas ao COVID-19",
 *          "peso":2.5,
 *          "apgar1":8,
 *          "apgar2":10,
 *          "tipo_parto":true, // false: parto normal | true: cesaria
 *          "local":"UCI Neonatal",
 *          "contato_pele": true,
 *          "primeira_visita": "12h",
 *          "primeiro_estimulo": ["Massagem/ordenha", "Sucção"],
 *          "tempo_primeiro_estimulo": "7-12h"
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "id_bebe":7,
 *          "nome":"Enzo Gabriel"
 *      }
 *
 */

routes.post('/bebes', verifyJWT, bebesController.create);

/**
 * @api {post} /bebes/:id/alta Informar Alta do bebe
 * @apiGroup Bebês
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "local":"Casa" // locais de alta: "UCI Neonatal", "Alojamento Conjunto", "Casa" e "Não se aplica",
 *          "data":'2022-01-04' // data da alta
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *
 */

 routes.post('/bebes/:id/alta', verifyJWT, altaController.create);



/**
 * @api {get} /bebes Listagem
 * @apiDescription Listagem dos bebes de uma determinada mãe
 * @apiGroup Bebês
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *       {
 *           "id": 1,
 *           "nome": "Enzo Gabriel",
 *           "data_parto": "2020-08-28T03:00:00.000Z",
 *           "semanas_gest": 35,
 *           "dias_gest": 5,
 *           "peso": 2.5,
 *           "apgar1": 8,
 *           "apgar2": 10,
 *           "tipo_parto": true,
 *           "local": "UCI Neonatal",
 *           "mae_id": 1,
 *           "complicacoes": "Sim, relacionadas ao COVID-19",
 *           "data_alta": null,
 *           "local_cadastro": "UCI Neonatal",
 *           "contato_pele": true,
 *           "primeiro_estimulo": [
 *               "Massagem/ordenha",
 *               "Sucção"
 *           ],
 *           "primeira_visita": "12h",
 *           "tempo_primeiro_estimulo": "7-12h",
 *           "mamadas": []
 *       }
 *   ]
 *
 */

routes.get('/bebes',verifyJWT,bebesController.index);

/**
 * @api {get} /bebes/alta Buscar bebes que podem receber alta
 * @apiDescription Retorna a list“Motivacao”a de bebes da mae que podem receber alta
 * @apiGroup Bebês
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *          "nome": "Joao",
 *          "id": 5,
 *          "local": "UTI Neonatal",
 *          "data_parto": "2020-08-28T03:00:00.000Z"
 *      }
 *    ]
 *
 */

 routes.get('/bebes/alta',verifyJWT,altaController.show);

/**
 * @api {post} /login Login
 * @apiDescription Realiza o login da mae e retorna o token de acesso.
 * @apiGroup Mães
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com",
 *          "senha":"abc123"
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-ge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM",
 *      }
 *
 */
routes.post('/login',maesController.auth);

/**
 * @api {post} /maes/ordenhas Cadastro
 * @apiDescription Cadastra uma ordenha da mae logada
 * @apiGroup Ordenhas
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "qtd_leite":100,
 *          "mama":"D", // Caso seja nas duas mamas passar no formato "D,E"
 *          "duracao":5,
 *          "data_hora":"2020-09-24T17:40:31.501Z"
 *      }
 * 
 *
 */
routes.post('/maes/ordenhas',verifyJWT,ordenhasController.create);


/**
 * @api {get} /maes/ordenhas/:date Listagem por data
 * @apiDescription Passar data no formato yyyy-mm-dd
 * @apiGroup Ordenhas
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        [
 *           {
 *             "id": 1,
 *             "data_hora": "2020-09-24T17:40:31.501Z",
 *             "qtd_leite": 100,
 *             "mama": "D",
 *             "duracao": 5,
 *             "bebe_id": 1
 *           }
 *         ]
 *
 */
routes.get('/maes/ordenhas/:date',verifyJWT,ordenhasController.showByDate);

/**
 * @api {get} /maes/ordenhas Listagem
 * @apiDescription Lista as ordenhas da mãe logada informado
 * @apiGroup Ordenhas
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        [
 *           {
 *             "id": 1,
 *             "data_hora": "2020-09-24T17:40:31.501Z",
 *             "qtd_leite": 100,
 *             "mama": "D",
 *             "duracao": 5,
 *             "bebe_id": 1
 *           }
 *         ]
 *
 */
 routes.get('/maes/ordenhas',verifyJWT,ordenhasController.show);

routes.get('/bebes/:id', bebesController.show);


/**
 * @api {post} /upload/mae Upload foto da mae
 * @apiDescription Faz o upload da foto da mae
 * @apiGroup Uploads
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParam {File} foto Foto da mae
 * 
 * @apiSuccess filename Endpoint da imagem: /uploads/picture-1602090536124.jpg
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        {
 *              "filename": "picture-1602090536124.jpg"
 *        }
 *
 */

 /**
 * @api {post} /upload/pai Upload foto do pai
 * @apiDescription Faz o upload da foto do pai
 * @apiGroup Uploads
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParam {File} foto Foto do pai
 * 
 * @apiSuccess filename Endpoint da imagem: /uploads/picture-1602090536124.jpg
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        {
 *              "filename": "picture-1602090536124.jpg"
 *        }
 *
 */

/**
 * @api {post} /upload/bebe Upload foto do bebe
 * @apiDescription Faz o upload da foto da bebe
 * @apiGroup Uploads
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParam {File} foto Foto do bebe
 * 
 * @apiSuccess filename Endpoint da imagem: /uploads/picture-1602090536124.jpg
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        {
 *              "filename": "picture-1602090536124.jpg"
 *        }
 *
 */
routes.post('/upload/:tipo',verifyJWT,uploadMiddleware.single('foto'),uploadController.create);


 /**
 * @api {post} /responder/escala Responder Escala
 * @apiDescription Responde a escala <br> Parametro "ocasiao" pode conter os seguintes valores</br>
 *              "1" : Caso esteja respondendo a escala no primeiro uso (primeira vez).</br>
 *              "ALTA" : Quando o bebe recebeu alta.</br>
 *              "15D" : Quando completou 15 dias</br>
 *              "1M" : Quando completou 1 mes
 *  
 * @apiGroup Enquetes
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "ocasiao": "15D", // Esta respondendo a escala quando bebe completou 15 dias
 *          "respostas":[ // um array com todas as respostas da escala
 *                {"pergunta_id":17,"descricao":"3"},
 *                {"pergunta_id":18,"descricao":"4"},
 *                {"pergunta_id":19,"descricao":"5"},
 *                {"pergunta_id":20,"descricao":"4"},
 *                {"pergunta_id":21,"descricao":"3"},
 *                {"pergunta_id":22,"descricao":"2"},
 *                {"pergunta_id":23,"descricao":"4"},
 *                {"pergunta_id":24,"descricao":"4"},
 *                {"pergunta_id":25,"descricao":"5"},
 *                {"pergunta_id":26,"descricao":"2"},
 *                {"pergunta_id":27,"descricao":"3"},
 *                {"pergunta_id":28,"descricao":"4"},
 *                {"pergunta_id":29,"descricao":"5"},
 *                {"pergunta_id":30,"descricao":"3"},
 *                {"pergunta_id":31,"descricao":"3"},
 *                {"pergunta_id":32,"descricao":"4"},
 *                {"pergunta_id":33,"descricao":"4"},
 *                {"pergunta_id":34,"descricao":"5"}
 *          ] 
 *      }
 * 
 * @apiSuccessExample {json} Exemplo Resposta:
 *      {
 *          "score":54
 *      }
 * 
 *
 */
  routes.post('/responder/escala',verifyJWT,respostasMaeController.responderEscala);


   /**
 * @api {post} /responder/alimentacao Responder Alimentacao
 * @apiDescription Responde pergunta de alimentação <br> Parametro "ocasiao" pode conter os seguintes valores</br>
 *              "ALTA" : Quando o bebe recebeu alta.</br>
 *              "15D" : Quando completou 15 dias</br>
 *              "1M" : Quando completou 1 mes
 *  
 * @apiGroup Enquetes
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "ocasiao": "15D", // Esta respondendo a alimentacao quando bebe completou 15 dias
 *          "respostas": ["Por relactação/translactação", "Apenas por chuca"]
 *      }
 * 
 *
 */
routes.post('/responder/alimentacao',verifyJWT,respostasMaeController.responderAlimentacao);

 /**
 * @api {post} /responder/:pergunta_id Responder pergunta
 * @apiDescription Responde uma pergunta
 * @apiGroup Enquetes
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "respostas":["O incentivo que estou recebendo dos profissionais"] // um array para caso selecione mais de uma opcao
 *      }
 * 
 * @apiSuccessExample {json} Exemplo Resposta quando houver feedback (MOSTRAR POPUP):
 *      {
 *          "feedback":"Continue firme, Fulana! Talvez o conteúdo “Emoções e Amamentação” possa te ajudar hoje.",
 *          "redirect":"EmotionsAndBreastfeeding"
 *      }
 *
 */
routes.post('/responder/:pergunta_id',verifyJWT,respostasMaeController.create);


routes.get('/maes/:mae_id/respostas',verifyJWT,respostasMaeController.index);

routes.post('/maes/:id/:acao',maesController.aprovar);

 /**
 * @api {post} /mensagens Enviar Mensagem
 * @apiDescription Envia uma nova mensagem
 * @apiGroup Mensagens
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "conteudo":"Ola mamaes, como estao?" // um array para caso selecione mais de uma opcao
 *      }
 *
 */
routes.post('/mensagens',verifyJWT,mensagensController.create);
 /**
 * @api {get} /mensagens Listar Mensagens
 * @apiDescription Retorna no maximo 7 mensagens por pagina
 *  </br>Ordenadas de mais recente para mais antiga
 *  </br>O header X-Total-Count Retorna a quantidade total de mensagens.
 * @apiGroup Mensagens
 * @apiHeader {String} authorization Token de acesso.
 *
 * @apiParam {Integer} page Numero da pagina.
 * 
 * @apiSuccessExample {json} Exemplo Resposta:
 *      [
 *          {
 *              "nome": "Fulana de Tal",
 *              "conteudo": "Ola mamaes, como estao?",
 *              "data": "2020-11-13T11:18:13.069Z"
 *          }
 *      ]
 * 
 *
 */
routes.get('/mensagens',verifyJWT,mensagensController.index);

routes.post('/perguntas',perguntasController.create);


routes.get('/perguntas/:pergunta_id/respostas',respostasController.show);

/**
 * @api {post} /esqueceusenha Esqueceu sua senha
 * @apiDescription Mãe recebe um email com um link para alteração da sua senha.
 * @apiGroup Mães
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com"
 *      }
 *
 */
routes.post('/esqueceusenha',maesController.forgot);

/**
 * @api {post} /alterarsenha Alterar senha
 * @apiDescription Altera a senha da mãe logada
 * @apiGroup Mães
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "senha":"novasenha"
 *      }
 *
 */
routes.post('/alterarsenha',verifyJWT,maesController.alterarSenha)

/**
 * @api {post} /subscribe Inscricao para PushNotification
 * @apiDescription Informa o userId retornado pelo OneSignal para o recebimento de Push Notifications
 * @apiGroup Mães
 * @apiHeader {String} authorization Token de acesso.
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "userId":"aabd2dcd-d5d6-4dba-9959-89019e66e78c"
 *      }
 *
 */
routes.post('/subscribe',verifyJWT,maesController.subscribe);

routes.get('/recuperar/:token',(req,res)=>{
    res.render('recuperar')
});

routes.post('/recuperar/:token',verifyJWT,maesController.recuperarSenha)

/**
 * @api {get} /enviarNotificacoes Notificações diárias
 * @apiDescription Envia notificacao para todas as maes que nao preencheram o diario nesse dia</br>
 * @apiGroup Notificação
 * 
 */
routes.get('/enviarNotificacoes',async (req,res)=>{
    const resp = await sendPushNotification()
    return res.send(resp)
})

/**
 * @api {get} /enviarNotificacoesAlta Notificação de alta
 * @apiDescription Envia notificacao de alta para as mães de bebes internados</br>
 * @apiGroup Notificação
 * 
 */
 routes.get('/enviarNotificacoesAlta',async (req,res)=>{
    const resp = await sendPushNotificationAlta()
    return res.send(resp)
})

/**
 * @api {get} /amamentacao/resultados Resultado da enquete amamentacao
 * @apiDescription Retorna todas as perguntas, alternativas e total de respostas da enquete
 * @apiGroup Enquetes
 * 
 * @apiSuccessExample {json} Exemplo Resposta:
 * [
 *   {
 *     "id": 1,
 *     "alternativas": [
 *       {
 *         "descricao": "Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)",
 *         "total": "1"
 *       },
 *       {
 *         "descricao": "Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)",
 *         "total": "1"
 *       },
 *       {
 *         "descricao": "Outro",
 *         "total": "4"
 *       },
 *       {
 *         "descricao": "A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)",
 *         "total": "4"
 *       },
 *       {
 *         "descricao": "Não consigo identificar nada de bom",
 *         "total": "13"
 *       }
 *     ]
 *   },
 *   {
 *     "id": 2,
 *     "alternativas": [
 *       {
 *         "descricao": "O incentivo que estou recebendo da minha família",
 *         "total": "3"
 *       },
 *       {
 *         "descricao": "Outras motivações",
 *         "total": "9"
 *       },
 *       {
 *         "descricao": "Não estou muito motivada a continuar",
 *         "total": "10"
 *       }
 *     ]
 *   },
 *   {
 *     "id": 3,
 *     "alternativas": [
 *       {
 *         "descricao": "Parcialmente, tanto dos profissionais quanto da minha família",
 *         "total": "7"
 *       },
 *       {
 *         "descricao": "Apenas dos profissionais",
 *         "total": "2"
 *       },
 *       {
 *         "descricao": "Sim, tanto dos profissionais quanto da minha família",
 *         "total": "1"
 *       },
 *       {
 *         "descricao": "Não estou recebendo ajuda",
 *         "total": "10"
 *       }
 *     ]
 *   }
 * ]
 * 
 */
routes.get('/amamentacao/resultados',respostasController.results)

routes.get('/resultados',resultController.dadosGerais)

/**
 * @api {get} /bebes/:bebe_id/mamadas/:date Listagem por data
 * @apiDescription Passar data no formato yyyy-mm-dd
 * @apiGroup Mamadas
 * @apiHeader {String} authorization Token de acesso.
 * 
  * @apiSuccessExample {json} Sucesso: Status 200
  * 
  *        {
  *         "id": 1,
  *         "nome": "Enzo Gabriel",
  *         "mamadas": [
  *           {
  *             "id": 1,
  *             "data_hora": "2020-09-24T17:40:31.501Z",
  *             "mama": "D",
  *             "duracao": 5,
  *             "bebe_id": 1
  *           }
  *         ]
  *       }
 *
 */
 routes.get('/bebes/:bebe_id/mamadas/:date',verifyJWT,mamadasController.showByDate);

/**
 * @api {post} /bebes/:bebe_id/mamadas Cadastro
 * @apiDescription Cadastra uma mamada do bebe de id informado
 * @apiGroup Mamadas
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "mama":"D", // Caso seja nas duas mamas passar no formato "D,E"
 *          "duracao":5,
 *          "data_hora":"2020-09-24T17:40:31.501Z"
 *      }
 * 
 *
 */
 routes.post('/bebes/:bebe_id/mamadas',verifyJWT,mamadasController.create);


 /**
  * @api {get} /bebes/:bebe_id/mamadas Listagem
  * @apiDescription Lista as mamadas do bebe de id informado
  * @apiGroup Mamadas
  * @apiHeader {String} authorization Token de acesso.
  *
  * 
  * 
  * @apiSuccessExample {json} Sucesso: Status 200
  * 
  *        {
  *         "id": 1,
  *         "nome": "Enzo Gabriel",
  *         "mamadas": [
  *           {
  *             "id": 1,
  *             "data_hora": "2020-09-24T17:40:31.501Z",
  *             "mama": "D",
  *             "duracao": 5,
  *             "bebe_id": 1
  *           }
  *         ]
  *       }
  *
  */
 routes.get('/bebes/:bebe_id/mamadas',verifyJWT,mamadasController.show);

 /**
 * @api {post} /duvidas Cadastro
 * @apiDescription A mãe cadastra uma dúvida
 * @apiGroup Canal de comunicacao
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "descricao":"Como informo minhas ordenhas?"
 *      }
 * 
 *
 */
 routes.post('/duvidas', verifyJWT, duvidasController.create);

 routes.get('/duvidas', duvidasController.show)

 routes.post('/duvidas/:id/resolver', duvidasController.resolver)

/**
 * @api {get} /duvidas/frequentes Listagem de Dúvidas
 * @apiDescription Listagem de duvidas frequentes
 * @apiGroup Canal de comunicacao
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *          "descricao": "Como cadastrar minhas ordenhas?",
 *          "resposta": "Basta acessar o diário"
 *      }
 *    ]
 *
 */


routes.get('/duvidas/frequentes',verifyJWT, duvidasController.list)

/**
 * @api {get} /relatorios/diario Exibição do relatório diário
 * @apiDescription Exibição do relatório diário<br>
 *          Retorna as mamadas, as ordenhas e uma pergunta sobre as ações realizadas no bebe
 * @apiGroup Relatórios
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *        "bebes": [
 *          {
 *            "nome": "Joao",
 *            "id": 5,
 *            "mamadas": [
 *              {
 *                "id": 3,
 *                "data_hora": "2021-04-01T00:00:00.000Z",
 *                "mama": "D",
 *                "duracao": 9,
 *                "bebe_id": 5
 *              }
 *            ]
 *          }
 *        ],
 *        "ordenhas": []
 *      }
 *
 */

 routes.get('/relatorios/diario',verifyJWT, relatorioDiarioController.show)

 /**
 * @api {get} /relatorios/semanal Exibição do relatório semanal
 * @apiDescription Exibição do relatório semanal<br>
 *          Retorna a resposta da mãe sobre algumas perguntas nos ultimos 7 diass
 * @apiGroup Relatórios
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *  [
 *    {
 *      "pergunta": 4,
 *      "respostas": [
 *        "Feliz",
 *        "Orgulhosa"
 *      ]
 *    },
 *    {
 *      "pergunta": 5,
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": 8,
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": 9,
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": 10,
 *      "respostas": [
 *        "Sim"
 *      ]
 *    },
 *    {
 *      "pergunta": 11,
 *      "respostas": []
 *    }
 *  ]
 *
 */
 routes.get('/relatorios/semanal',verifyJWT, relatorioSemanalController.show)

 
 routes.post('/administrativo/acesso', (req, res) =>{
    const {password} = req.body
    res.send(password===process.env.ADMIN_PASSWORD)
 })

 routes.post('/admin/auth', adminController.auth);

 routes.post('/admin/verify', verifyJWT, (req, res) => res.send(true))

 routes.get('/admin/mothers', verifyJWT, adminController.showMothers)

 routes.get('/admin/mothers/:id', verifyJWT, adminController.showMother)

 routes.put('/admin/mothers/:id', verifyJWT, adminController.saveMother)

 routes.get('/admin/mothers/:id/babies', verifyJWT, adminController.showBabies)

 routes.get('/admin/babies/:id', verifyJWT, adminController.showBaby)

 routes.put('/admin/babies/:id', verifyJWT, adminController.saveBaby)

 routes.get('/login', (req,res) => res.render('login'))

 /**
 * @api {post} /acessos/videos-inicio Acessos Inicio dos Videos
 * @apiDescription Informa se mae acessou o inicio dos videos
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

/**
 * @api {post} /acessos/videos Acessos Videos
 * @apiDescription Informa se mae acessou videos
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

/**
 * @api {post} /acessos/app Acessos App
 * @apiDescription Informa se mae acessou app e retorna caso necessite uma acao a ser tomada</br>
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiSuccessExample {json} Retorno do primeiro acesso
 * {
 *  "acao":"1D",
 * } 
 * 
 * @apiSuccessExample {json} Retorno quando bebe completar 15 dias  
 * {
 *  "acao":"15D",
 * } 
 * 
 * @apiSuccessExample {json} Retorno quando bebe completar 1 mes  
 * {
 *  "acao":"1M",
 * } 
 * 
 */

/**
 * @api {post} /acessos/diario Acessos Diario
 * @apiDescription Informa se mae acessou diario
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

/**
 * @api {post} /acessos/ordenha Acessos Ordenha
 * @apiDescription Informa se mae acessou a ordenha
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

/**
 * @api {post} /acessos/mensagens Acessos Mensagens
 * @apiDescription Informa se mae acessou as mensagens
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

routes.post('/acessos/:local', verifyJWT, acessosController.create)

routes.get('/aprovar',maesController.esperandoAprovacao);

routes.get('/download', (req, res) =>{
    const pathApk = `${path.resolve(__dirname, '..','apk')}/amamenta-coach.apk`
    res.download(pathApk,"amamentacoach.apk")
})

routes.get('/politica-de-privacidade',(req,res)=>{
    res.render('politica-de-privacidade')
});

/**
 * @api {post} /maes/revogar Revogar consentimento  
 * @apiDescription Mae revoga consentimento e deve ser redirecionada para pagina de login
 * @apiGroup Mães
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "motivo":"Nao me senti segura informando  meus dados"
 *      }
 *
 */
 routes.post('/maes/revogar',verifyJWT,maesController.revogar);

 /**
 * @api {post} /telemetria Informar acao 
 * @apiDescription Informa as acoes da mae no App
 * @apiGroup Telemetria
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      [
 *          {
 *              "action":0,
 *              "context":{
 *                  "screen":0,
 *                  "target":"SUBMIT_BTN"
 *              },
 *              "created_at": "2021-09-15T11:38:23.846Z"
 *          }
 *      ]
 *
 */
  routes.post('/telemetria',verifyJWT,telemetriaController.create);

export default routes;