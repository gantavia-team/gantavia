import api from './api';

export const destinationService = {
  getAllDestinations: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/destinations?${params}`); // ✅ Fixed backticks
    return response.data;
  },

  getDestinationById: async (id) => {
    const response = await api.get(`/destinations/${id}`); // ✅ Fixed backticks
    return response.data;
  },

  getFeaturedDestinations: async () => {
    const response = await api.get('/destinations/featured');
    return response.data;
  },

  searchDestinations: async (query) => {
    const response = await api.get(`/destinations/search?q=${query}`); // ✅ Fixed backticks
    return response.data;
  },
};
