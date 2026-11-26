import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  if (input.value.trim() === '') {
    iziToast.show({
      message: 'Can not send an empty form!',
    });
    return;
  }
  clearGallery();

  showLoader();
  getImagesByQuery(input.value.trim())
    .then(res => {
      if (res.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(res);
    })
    .catch(err => {
      iziToast.show({
        title: err.code,
        message: err.message,
      });
    })
    .finally(() => hideLoader());
});
