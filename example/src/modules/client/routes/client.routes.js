import { Router } from 'express';
import {
  createClient,
  getClient,
  getAllClient,
  removeClient,
} from '../controllers/client.controller';

const routes = new Router();

routes.post('/', createClient);
routes.get('/', getAllClient);
routes.get('/:id', getClient);
routes.delete('/:id', removeClient);

export default routes;
