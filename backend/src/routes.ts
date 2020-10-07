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


const maesController = new MaesController();
const bebesController = new BebesController();
const ordenhasController = new OrdenhasController();
const mensagensController = new MensagensController();
const perguntasController = new PerguntasController();
const respostasMaeController = new RespostasMaeController();
const respostasController = new RespostasController();
const uploadController = new UploadController()

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
 *          "qtd_gravidez":2
 *      }
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "id":1
 *      }
 *
 */
routes.post('/maes',maesController.create);


/**
 * @api {get} /maes/:id Dados da mae
 * @apiDescription Retorna os dados da mae do id informado 
 * @apiGroup Mães
 *
 * @apiParam {Integer} id Id da mãe.
 * @apiHeader {String} authorization Token de acesso.
 * 
 * @apiSuccessExample {json} Sucesso:
 *       {
 *       "id": 1,
 *       "email": "fulana@email.com",
 *       "nome": "Fulana de Tal",
 *       "ultimo_acesso": "2020-09-24T17:32:34.810Z",
 *       "imagem_mae": null,
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
routes.get('/maes/:id', verifyJWT,maesController.show);


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
 *          "duracao":5
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

routes.post('/upload/:id/:tipo',uploadMiddleware.single('foto'),uploadController.create);

routes.post('/maes/:mae_id/respostas/:pergunta_id',respostasMaeController.create);
routes.get('/maes/:mae_id/respostas',respostasMaeController.index);

routes.post('/mensagens',verifyJWT,mensagensController.create);
routes.get('/mensagens',mensagensController.index);

routes.post('/perguntas',perguntasController.create);
routes.get('/perguntas/:categoria',perguntasController.index);

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

routes.get('/recuperar/:token',(req,res)=>{
    res.render('recuperar')
});

routes.post('/recuperar/:token',verifyJWT,maesController.recuperarSenha)



export default routes;