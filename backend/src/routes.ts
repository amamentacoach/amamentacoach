import {Router, Request, Response} from 'express';
import MaesController from './controllers/MaesController';
import OrdenhasController from './controllers/OrdenhasController';
import MensagensController from './controllers/MensagensController';


const maesController = new MaesController();
const ordenhasController = new OrdenhasController();
const mensagensController = new MensagensController();

const routes = Router()

routes.get('/',(req : Request,res:Response)=>res.send('Hello World'));

routes.post('/maes',maesController.create);
routes.get('/maes', maesController.index);
routes.get('/maes/:id', maesController.show);

routes.post('/maes/:mae_id/ordenhas',ordenhasController.create);
routes.get('/maes/:mae_id/ordenhas',ordenhasController.show);

routes.post('/mensagens',mensagensController.create);
routes.get('/mensagens',mensagensController.index);

export default routes;