import config from '../config/constants';
import clientRoutes from './client/routes/client.routes';

export default (app) => {
  app.use(`${config.ROOT_URL}/client`, clientRoutes);
};
