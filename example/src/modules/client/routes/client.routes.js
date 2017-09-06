import { Router } from 'express';
import {
  createClient,
  getClient,
  getAllClient,
  updateClient,
  removeClient,
} from '../controllers/client.controller';

const routes = new Router();

routes.post('/', createClient);
routes.get('/', getAllClient);
routes.get('/:id', getClient);
routes.put('/:id', updateClient);
routes.delete('/:id', removeClient);

export default routes;
