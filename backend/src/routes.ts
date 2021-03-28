import {Router, Request, Response} from 'express';
import multer from 'multer';
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
import sendPushNotification from './utils/sendPushNotification';
import ResultController from './controllers/ResultController';
import MamadasController from './controllers/MamadasController';
import DuvidasController from './controllers/DuvidasController';
import RelatorioDiarioController from './controllers/RelatorioDiarioController';
import RelatorioSemanalController from './controllers/RelatorioSemanalController';
import AcessosController from './controllers/AcessosController';
import AltaController from './controllers/AltaController';


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
 *          "tempo_amamentacao":"2,3", // tempo de amamentacao total | formato: ano,meses
 *          "whatsapp":"(43) 999999999",
 *          "gestacao_planejada": true,
 *          "primeira_visita": "12h",
 *          "primeiro_estimulo": true, // Massagem/ordenha = false | Sucção = true
 *          "tempo_primeiro_estimulo": "7-12h",
 *          "qtd_filhos_vivos": 3,
 *          "orientacao_prenatal": true,
 *          "ocupacao": true, // Em casa (do lar) = false | Fora de casa = true
 *          "licenca_maternidade": 6 // Qtd de meses de licenca maternidade - Caso nao tenha: null
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
 * @api {get} /maes Dados da mae
 * @apiDescription Retorna os dados da mae logada
 * @apiGroup Mães
 *
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiSuccessExample {json} Sucesso:
 *   {
 *   "id": 1,
 *   "email": "fulana@email.com",
 *   "nome": "Fulana de Tal",
 *   "ultimo_acesso": "2021-03-06T20:21:12.824Z",
 *   "imagem_mae": null,
 *   "imagem_bebe": null,
 *   "imagem_pai": null,
 *   "companheiro": true,
 *   "bebes": [
 *       {
 *          "id": 1,
 *          "nome": "Sabrina",
 *          "data_parto": "2020-08-28T03:00:00.000Z",
 *          "semanas_gest": 35,
 *          "dias_gest": 5,
 *          "peso": 2.5,
 *          "apgar1": 8,
 *          "apgar2": 10,
 *          "tipo_parto": true,
 *          "local": "UCI Neonatal",
 *          "mae_id": 1,
 *          "complicacoes": true,
 *          "mamadas": [
 *              {
 *              "id": 1,
 *              "data_hora": "2020-09-24T17:40:31.501Z",
 *              "mama": "D",
 *              "duracao": 10
 *              }
 *          ]
 *       }
 *   ],
 *   "ordenhas": [
 *       {
 *         "id": 2,
 *         "data_hora": "2020-09-24T17:40:31.501Z",
 *         "qtd_leite": 100,
 *         "mama": "D",
 *         "duracao": 5,
 *         "mae_id": 1
 *       }
 *   ]
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
 *          "complicacoes":true,
 *          "peso":2.5,
 *          "apgar1":8,
 *          "apgar2":10,
 *          "tipo_parto":true, // false: parto normal | true: cesaria
 *          "local":"UCI Neonatal"
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
 *          "local":"Casa" // locais de alta: "UCI Neonatal", "Alojamento Conjunto" e "Casa"
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
 *      {
 *          "id_bebe":7,
 *          "nome":"Enzo Gabriel",
 *          "data_parto":"2020-08-28",
 *          "semanas_gest": 35,
 *          "dias_gest":5,
 *          "peso":2.5,
 *          "tipo_parto":true, // false: parto normal | true: cesaria
 *          "local":"UCI",
 *      },
 *      {
 *          "id_bebe":8,
 *          "nome":"Valentina",
 *          "data_parto":"2020-08-28",
 *          "semanas_gest": 35,
 *          "dias_gest":5,
 *          "peso":2.7,
 *          "tipo_parto":true, // false: parto normal | true: cesaria
 *          "local":"UCI"
 *      }
 *    ]
 *
 */

routes.get('/bebes',verifyJWT,bebesController.index);

/**
 * @api {get} /bebes Buscar bebes que podem receber alta
 * @apiDescription Retorna a lista de bebes da mae que podem receber alta
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
 *          "mama":"D",
 *          "duracao":5,
 *          "data_hora":"2020-09-24T17:40:31.501Z"
 *      }
 * 
 *
 */
routes.post('/maes/ordenhas',verifyJWT,ordenhasController.create);


/**
 * @api {get} /maes/ordenhas/porData Listagem por data
 * @apiDescription Lista as ordenhas da data informada
 * @apiGroup Ordenhas
 * @apiHeader {String} authorization Token de acesso.
 *
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "date":"2020-03-20"
 *      }
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
routes.get('/maes/ordenhas/porData',verifyJWT,ordenhasController.showByDate);

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
 * @api {get} /perguntas/escalaealimentacao Perguntas da escala e da alimentacao
 * @apiDescription Perguntas da escala e da amamentacao: Responder quandoa acessar o App<br/>
 * 
 *      
 * @apiGroup Enquetes
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Exemplo Request:
 * {
 *  "escala": [
 *    {
 *      "id": 17,
 *      "categoria": 7,
 *      "descricao": "Eu consigo retirar leite suficiente da mama para o meu bebê.",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    },
 *    {
 *      "id": 18,
 *      "categoria": 7,
 *      "descricao": "Eu consigo lidar com o fato de que retirar leite da mama e amamentar podem ser demorados.",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    },
 *    {
 *      "id": 19,
 *      "categoria": 7,
 *      "descricao": "Eu consigo lidar bem com qualquer situação da amamentação (retirada de leite da mama e a amamentação em si) da mesma forma que faço com outras tarefas difíceis.",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    },
 *    {
 *      "id": 20,
 *      "categoria": 7,
 *      "descricao": "Eu consigo lidar com a amamentação de forma que eu me sinta satisfeita.",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    },
 *    {
 *      "id": 21,
 *      "categoria": 7,
 *      "descricao": "Eu continuo querendo amamentar",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    },
 *    {
 *      "id": 22,
 *      "categoria": 7,
 *      "descricao": "Eu estou satisfeita com a minha experiência de amamentar.",
 *      "alternativas": [
 *        "1",
 *        "2",
 *        "3",
 *        "4",
 *        "5"
 *      ],
 *      "outro": false,
 *      "multiplas": false,
 *      "alvo": "GERAL"
 *    }
 *  ],
 *  "alimentacao": {
 *    "id": 5,
 *    "categoria": 2,
 *    "descricao": "Como meu bebê está se alimentando:",
 *    "alternativas": [
 *      "Apenas no meu peito",
 *      "No meu peito, c/ complemento por copinho",
 *      "Por relactação/ translactação",
 *      "Apenas por copinho ",
 *      "Por chuca",
 *      "Por sonda"
 *    ],
 *    "outro": false,
 *    "multiplas": false,
 *    "alvo": "GERAL"
 *  }
 *}
 * 
 *
 */
routes.get('/perguntas/escalaealimentacao',verifyJWT,perguntasController.escalaEAlimentacao);

/**
 * @api {get} /perguntas/:categoria Listagem por categoria
 * @apiDescription Perguntas quando<br/>
 *  Categoria das Enquetes:<br/>
 *      1 - Amamentar um prematuro<br/>
 *      2 - DIÁRIO: Sentimentos<br/>
 *      3 - DIÁRIO: Metas<br/>
 *      4 - DIÁRIO: Ajuda<br/>
 *      5 - Participação do pai<br/>
 *      6 - Acoes Realizadas com o bebe<br/>
 *      7 - Escala
 * 
 *      
 * @apiGroup Enquetes
 * @apiHeader {String} authorization Token de acesso.
 * 
 * 
 * @apiSuccessExample {json} Exemplo Request:
 *      [
 *          {
 *              "id": 1,
 *              "categoria": 1,
 *              "descricao": "Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?",
 *              "alternativas": [
 *              "Sentimento de empoderamento (lidar com este desafio me faz acreditar que sou capaz de outras grandes coisas)",
 *              "Gratidão pela oportunidade (penso que muitas mulheres, por muitas razões, não conseguem nem tentar)",
 *              "A formação de um poderoso vínculo ao travar uma batalha em parceria com meu(a) pequeno(a)",
 *              "Não consigo identificar nada de bom"
 *              ],
 *              "outro": true, // Caso true ter um campo para preencher Outro
 *              "multiplas": true,
 *              "alvo": "GERAL" // Publico alvo da pergunta. Pode ser: "GERAL", "AC" ou "UCI/UTI"
 *          },
 *          {
 *              "id": 2,
 *              "categoria": 1,
 *              "descricao": "O que te motiva a continuar tentando amamentar?",
 *              "alternativas": [
 *              "Pensar que é o melhor para o meu bebê",
 *              "O incentivo que estou recebendo dos profissionais",
 *              "O incentivo que estou recebendo da minha família",
 *              "Pensar no custo da fórmula",
 *              "Outras motivações",
 *              "Não estou muito motivada a continuar"
 *              ],
 *              "outro": false,
 *              "multiplas": true,
 *              "alvo": "GERAL" // Publico alvo da pergunta. Pode ser: "GERAL", "AC" ou "UCI/UTI"
 *          },
 *          {
 *              "id": 3,
 *              "categoria": 1,
 *              "descricao": "Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?",
 *              "alternativas": [
 *              "Sim, tanto dos profissionais quanto da minha família",
 *              "Apenas da minha família",
 *              "Apenas dos profissionais",
 *              "Parcialmente, tanto dos profissionais quanto da minha família",
 *              "Não estou recebendo ajuda"
 *              ],
 *              "outro": false,
 *              "multiplas": false,
*               "alvo": "GERAL" // Publico alvo da pergunta. Pode ser: "GERAL", "AC" ou "UCI/UTI"
 *          }
 *      ]
 * 
 *
 */
routes.get('/perguntas/:categoria',verifyJWT,perguntasController.index);

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
 *
 */
  routes.post('/responder/escala',verifyJWT,respostasMaeController.responderEscala);


   /**
 * @api {post} /responder/alimentacao Responder Amamentacao
 * @apiDescription Responde pergunta de amamentacao <br> Parametro "ocasiao" pode conter os seguintes valores</br>
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
 *          "descricao":"Por relactação/translactação"
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
 * @api {get} /testePush Teste de push
 * @apiDescription Envia notificacao para todas as maes que nao preencheram o diario nesse dia</br>
 *                  <b>Uso somente para testes!</b>
 * @apiGroup Testes
 * 
 */
routes.get('/testePush',async (req,res)=>{
    await sendPushNotification()
    res.sendStatus(200)
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
 *     "pergunta": "Pra você, qual é a melhor parte de dedicar-se a amamentar um bebê prematuro?",
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
 *     "pergunta": "O que te motiva a continuar tentando amamentar?",
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
 *     "pergunta": "Você sente que está recebendo toda a ajuda de que precisa para continuar tentando amamentar seu bebê?",
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

//routes.get('/resultados',resultController.generate)

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
 *          "mama":"D",
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
 *        "mamadas": [
 *          {
 *            "id": 5,
 *            "bebe": "Sabrina",
 *            "mama": "D",
 *            "duracao": 9,
 *            "data_hora": "2021-03-19T17:40:31.501Z"
 *          }
 *        ],
 *        "ordenhas": [
 *          {
 *            "id": 1,
 *            "mama": "D",
 *            "duracao": 5,
 *            "qtd_leite": 100,
 *            "data_hora": "2021-03-20T17:40:31.501Z"
 *          }
 *        ]
 *        "perguntas": [ // Retorna a pergunta que deve responder diariamente
 *          {            // É um array pois podem ser perguntas diferentes para cada Alvo   
 *            "id": 15,  // Só será retornado caso a mae ainda não tenha respondido
 *            "categoria": 6,
 *            "descricao": "Ações realizadas com meu bebê",
 *            "alternativas": [
 *              "Fiz canguru com meu bebê",
 *              "Retirei o leite sempre que precisei",
 *              "Ofereci meu leite fresco ao meu bebê sempre que precisou de complemento",
 *              "Realizei os cuidados sentindo-me segura",
 *              "Tive coragem para pedir ajuda",
 *              "Tive coragem para afastar pessoas que possam estar atrapalhando de alguma forma"
 *            ],
 *            "outro": false,
 *            "multiplas": true,
 *            "alvo": "AC"
 *          },
 *          {
 *            "id": 16,
 *            "categoria": 6,
 *            "descricao": "Ações realizadas com meu bebê",
 *            "alternativas": [
 *              "Fiquei mais tempo na Unidade",
 *              "Fiz mais canguru",
 *              "Retirei o leite mais vezes por dia",
 *              "Trouxe meu leite",
 *              "Ofereci leite fresco ao meu bebê",
 *              "Realizei mais cuidados junto ao meu bebê",
 *              "Tive coragem para pedir ajuda",
 *              "Procurei me informar + sobre meu bebê"
 *            ],
 *            "outro": false,
 *            "multiplas": true,
 *            "alvo": "UCI/UTI"
 *          }
 *        ]
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
 *      "pergunta": "Como me senti:",
 *      "respostas": [
 *        "Feliz",
 *        "Orgulhosa"
 *      ]
 *    },
 *    {
 *      "pergunta": "Como meu bebê esteve se alimentando:",
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": "Minhas Metas para Pensamentos e Sentimentos",
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": "Minhas Metas para Ações",
 *      "respostas": []
 *    },
 *    {
 *      "pergunta": "Precisei de uma ajuda específica...",
 *      "respostas": [
 *        "Sim"
 *      ]
 *    },
 *    {
 *      "pergunta": "Meu ombro amigo da semana:",
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

 routes.get('/login', (req,res) => res.render('login'))


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
 *  "acao":"RESPONDER_1D",
 * } 
 * 
 * @apiSuccessExample {json} Retorno quando bebe completar 15 dias  
 * {
 *  "acao":"RESPONDER_15D",
 * } 
 * 
 * @apiSuccessExample {json} Retorno quando bebe completar 1 mes  
 * {
 *  "acao":"RESPONDER_1M",
 * } 
 * 
 */

/**
 * @api {post} /acessos/diario Acessos Diario
 * @apiDescription Informa se mae acessou diario
 * @apiGroup Controle de Acessos
 * @apiHeader {String} authorization Token de acesso.
 */

routes.post('/acessos/:local', verifyJWT, acessosController.create)

export default routes;