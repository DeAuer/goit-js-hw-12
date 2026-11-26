import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, perPage } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMore = document.querySelector('.btn-load-more');
let query;
let page = 1;

hideLoadMoreButton();

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;

  hideLoadMoreButton();

  query = document.querySelector('input[name="search-text"]').value.trim();

  if (query === '') {
    iziToast.show({
      message: 'Can not send an empty form!',
    });
    return;
  }
  clearGallery();

  showLoader();
  try {
    const res = await getImagesByQuery(query, page);

    if (res.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(res.hits);

    const totalPages = Math.ceil(res.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.show({
      title: err.code,
      message: err.message,
    });
  } finally {
    hideLoader();
  }
});

const loadImages = async () => {
  try {
    showLoader();
    const { hits, totalHits } = await getImagesByQuery(query, page + 1);
    page += 1;
    createGallery(hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    iziToast.show({
      title: err.code,
      message: err.message,
    });
  } finally {
    hideLoader();
  }
};

loadMore.addEventListener('click', loadImages);
