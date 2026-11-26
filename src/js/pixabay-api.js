import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '14949800-e039f54278abdd9b6e9eb4447';

export const getImagesByQuery = query => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  return axios.get('/', { params }).then(response => response.data.hits);
};
