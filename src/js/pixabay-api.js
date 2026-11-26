import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '14949800-e039f54278abdd9b6e9eb4447';
export const perPage = 15;

export const getImagesByQuery = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    per_page: perPage,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get('/', { params });
  return response.data;
};
