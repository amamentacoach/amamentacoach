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


const maesController = new MaesController();
const ordenhasController = new OrdenhasController();
const mensagensController = new MensagensController();
const perguntasController = new PerguntasController();
const respostasMaeController = new RespostasMaeController();
const respostasController = new RespostasController();
const uploadController = new UploadController()

const routes = Router()
const uploadMiddleware = multer(uploadConfig);

routes.get('/',(req : Request,res:Response)=>res.send('Hello World'));

routes.post('/maes',maesController.create);
routes.get('/maes', maesController.index);
routes.get('/maes/:id', maesController.show);

routes.post('/maes/:mae_id/upload/:tipo',uploadMiddleware.single('foto'),uploadController.create);

routes.post('/maes/:mae_id/ordenhas',ordenhasController.create);
routes.get('/maes/:mae_id/ordenhas',ordenhasController.show);

routes.post('/maes/:mae_id/respostas/:pergunta_id',respostasMaeController.create);
routes.get('/maes/:mae_id/respostas',respostasMaeController.index);

routes.post('/mensagens',mensagensController.create);
routes.get('/mensagens',mensagensController.index);

routes.post('/perguntas',perguntasController.create);
routes.get('/perguntas/:categoria',perguntasController.index);

routes.get('/perguntas/:pergunta_id/respostas',respostasController.show);

export default routes;