import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Destination from '../models/Destination';
import destinationsView from '../views/destinations_view';

export default {
  async index(request: Request, response: Response) {
    const destinationsRepository = getRepository(Destination);

    const destinations = await destinationsRepository.find();

    //Order by Destination Meta, ascending
    destinations.sort(
      (dest1, dest2) =>
        new Date(`01/${dest1.meta}`).getTime() - new Date(`01/${dest2.meta}`).getTime()
    );

    return response.json(destinationsView.renderMany(destinations));
  },

  async find(request: Request, response: Response) {
    const { id } = request.params;

    const destinationsRepository = getRepository(Destination);

    const destination = await destinationsRepository.findOneOrFail(id);

    return response.json(destinationsView.render(destination));
  },

  async create(request: Request, response: Response) {
    const { country, location, meta, flag_url } = request.body;

    const destinationsRepository = getRepository(Destination);

    const data = {
      country,
      location,
      meta,
      flag_url,
    };

    const schema = Yup.object().shape({
      country: Yup.string().required(),
      location: Yup.string().required(),
      meta: Yup.string().required(),
      flag_url: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const locationAlreadyExists = await destinationsRepository.findOne({ location });

    if (locationAlreadyExists)
      return response.status(400).json({ error: 'Location already exists' });

    const destination = destinationsRepository.create(data);

    await destinationsRepository.save(destination);

    return response.status(201).json(destination);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { location, meta } = request.body;

    const destinationsRepository = getRepository(Destination);

    const destination = await destinationsRepository.findOneOrFail(id);

    if (!destination) return response.status(404);

    await destinationsRepository.update(id, {
      location,
      meta,
      updated_at: new Date(),
    });

    return response.status(204).send();
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const destinationsRepository = getRepository(Destination);
    const destination = await destinationsRepository.findOne(id);

    if (!destination) {
      return response.status(404).json({ error: 'Destination not found' });
    }

    await destinationsRepository.delete({ id });

    return response.status(204).json({ Success: 'Destination deleted' });
  },
};
