import {Router, Request, Response} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

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
 * @api {post} /maes Cadastro das mães
 * @apiGroup Mães
 *
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "email":"fulana@email.com",
 *          "senha":"abc123",
 *          "nome": "Fulana de Tal",
 *          "data_nascimento":"1990-05-05",
 *          "companheiro":"Beltrano da Silva",
 *          "escolaridade":"Ensino Medio Completo",
 *          "renda":1500.00,
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


routes.get('/maes', maesController.index);


/**
 * @api {get} /maes/:id Retorna os dados da mae do id informado 
 * @apiGroup Mães
 *
 * @apiParam {Integer} id Id da mãe.
 * 
 * @apiSuccessExample {json} Sucesso:
 *      {
 *          "id":1
 *          "email":"fulana@email.com",
 *          "senha":"abc123",
 *          "nome": "Fulana de Tal",
 *          "data_nascimento":"1990-05-05",
 *          "companheiro":"Beltrano da Silva",
 *          "escolaridade":"Ensino Medio Completo",
 *          "renda":1500.00,
 *          "qtd_gravidez":2,
 *          "ultimo_acesso":"2020-08-29T10:30:15",
 *          "imagem_mae":"mae.jpg",
 *          "imagem_pai":"pai.jpg"
 *      }
 *
 */
routes.get('/maes/:id', maesController.show);


/**
 * @api {post} /maes/:id_mae/bebes Cadastro de bebê
 * @apiGroup Bebês
 *
 * @apiParam {Integer} id Id da mãe.
 * 
 * @apiParamExample {json} Exemplo Request:
 *      {
 *          "nome":"Enzo Gabriel",
 *          "data_parto":"2020-08-28",
 *          "semanas_gest": 35,
 *          "dias_gest":5,
 *          "peso":2.5,
 *          "tipo_parto":true, // false: parto normal | true: cesaria
 *          "local":"UCI",
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

routes.post('/maes/:id_mae/bebes', bebesController.create);

/**
 * @api {get} /maes/:id_mae/bebes Listagem dos bebes de uma determinada mãe
 * @apiGroup Bebês
 *
 * @apiParam {Integer} id Id da mãe.
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
 *          "local":"UCI",
 *      }
 *    ]
 *
 */

routes.get('/maes/:id_mae/bebes', bebesController.index);

routes.get('/bebes/:id', bebesController.show);

routes.post('/upload/:id/:tipo',uploadMiddleware.single('foto'),uploadController.create);

routes.post('/bebes/:bebe_id/ordenhas',ordenhasController.create);
routes.get('/bebes/:bebe_id/ordenhas',ordenhasController.show);

routes.post('/maes/:mae_id/respostas/:pergunta_id',respostasMaeController.create);
routes.get('/maes/:mae_id/respostas',respostasMaeController.index);

routes.post('/mensagens',mensagensController.create);
routes.get('/mensagens',mensagensController.index);

routes.post('/perguntas',perguntasController.create);
routes.get('/perguntas/:categoria',perguntasController.index);

routes.get('/perguntas/:pergunta_id/respostas',respostasController.show);

export default routes;