import { Router } from 'express';

import DestinationsController from './controllers/DestinationsController';

const routes = Router();

routes.get('/destinations/all', DestinationsController.index);
routes.get('/destinations/find/:id', DestinationsController.find);

routes.post('/destinations/new', DestinationsController.create);
routes.put('/destinations/update/:id', DestinationsController.update);
routes.delete('/destinations/delete/:id', DestinationsController.delete);

export default routes;
