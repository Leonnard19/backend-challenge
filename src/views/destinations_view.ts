import Destination from '../models/Destination';

export default {
  render(destination: Destination) {
    return {
      id: destination.id,
      country: destination.country,
      location: destination.location,
      meta: destination.meta,
      flag_url: destination.flag_url,
      created_at: destination.created_at,
      updated_at: destination.updated_at,
    };
  },

  renderMany(destinations: Destination[]) {
    return destinations.map((destination) => this.render(destination));
  },
};
