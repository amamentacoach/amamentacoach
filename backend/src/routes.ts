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


const maesController = new MaesController();
const bebesController = new BebesController();
const ordenhasController = new OrdenhasController();
const mensagensController = new MensagensController();
const perguntasController = new PerguntasController();
const respostasMaeController = new RespostasMaeController();
const respostasController = new RespostasController();
const uploadController = new UploadController()
const resultController = new ResultController()

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
 *          "moram_juntos":"2 anos", // caso nao more junto enviar NULL
 *          "escolaridade":"Ensino Medio Completo",
 *          "renda":"Entre 1 e 3 salarios minimos",
 *          "qtd_gravidez":2,
 *          "tempo_amamentacao":["Menos de 1 ano","2 anos"]
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
 *       {
 *       "id": 1,
 *       "email": "fulana@email.com",
 *       "nome": "Fulana de Tal",
 *       "ultimo_acesso": "2020-09-24T17:32:34.810Z",
 *       "imagem_mae": null,
 *       "imagem_bebe": null,
 *       "imagem_pai": null,
 *       "bebes": [
 *           {
 *           "id": 1,
 *           "nome": "Enzo Gabriel",
 *           "data_parto": "2020-08-28T03:00:00.000Z",
 *           "semanas_gest": 35,
 *           "dias_gest": 5,
 *           "peso": 2.5,
 *           "imagem_bebe": null,
 *           "tipo_parto": true,
 *           "local": "UCI",
 *           "mae_id": 1,
 *           "ordenhas": [
 *               {
 *               "id": 1,
 *               "qtd_leite": 100,
 *               "data_hora": "2020-09-24T17:40:31.501Z",
 *               "mama": "D",
 *               "duracao": 5
 *               }
 *           ]
 *           }
 *       ]
 *       }
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
 * @api {post} /bebes/:bebe_id/ordenhas Cadastro
 * @apiDescription Cadastra uma ordenha do bebe de id informado
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
routes.post('/bebes/:bebe_id/ordenhas',verifyJWT,ordenhasController.create);


/**
 * @api {get} /bebes/:bebe_id/ordenhas Listagem
 * @apiDescription Lista uma ordenha do bebe de id informado
 * @apiGroup Ordenhas
 * @apiHeader {String} authorization Token de acesso.
 *
 * 
 * 
 * @apiSuccessExample {json} Sucesso: Status 200
 * 
 *        {
 *         "id": 1,
 *         "nome": "Enzo Gabriel",
 *         "ordenhas": [
 *           {
 *             "id": 1,
 *             "data_hora": "2020-09-24T17:40:31.501Z",
 *             "qtd_leite": 100,
 *             "mama": "D",
 *             "duracao": 5,
 *             "bebe_id": 1
 *           }
 *         ]
 *       }
 *
 */
routes.get('/bebes/:bebe_id/ordenhas',verifyJWT,ordenhasController.show);

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
 * @api {get} /perguntas/:categoria Listagem de perguntas
 * @apiDescription Lista todas as perguntas de uma enquete<br/>
 *  Categoria das Enquetes:<br/>
 *      1 - Amamentar um prematuro<br/>
 *      2 - DIÁRIO: Sentimentos<br/>
 *      3 - DIÁRIO: Metas<br/>
 *      4 - DIÁRIO: Ajuda<br/>
 *      5 - Participação do pai<br/>
 * 
 *      
 * @apiGroup Enquetes
 *
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
routes.get('/perguntas/:categoria',perguntasController.index);


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

routes.get('/resultados',resultController.generate)

export default routes;