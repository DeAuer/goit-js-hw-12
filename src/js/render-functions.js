import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.btn-load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const clearGallery = () => {
  gallery.textContent = '';
  lightbox.refresh();
};

export const createGallery = images => {
  const galleryItems = images.map(image => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const stats = document.createElement('div');
    stats.classList.add('gallery-stats');
    stats.textContent = `Likes: ${image.likes} · Views: ${image.views} · Comments: ${image.comments} · Downloads: ${image.downloads}`;
    li.classList.add('gallery-item');
    a.classList.add('gallery-link');
    a.setAttribute('href', image.largeImageURL);
    img.classList.add('gallery-image');
    img.setAttribute('src', image.webformatURL);
    img.setAttribute('alt', image.tags);

    a.append(img);
    li.append(a);
    li.append(stats);
    return li;
  });

  gallery.append(...galleryItems);

  lightbox.refresh();
};

export const showLoader = () => {
  loader.classList.remove('is-hidden');
};

export const hideLoader = () => {
  loader.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  loadMore.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  loadMore.classList.add('is-hidden');
};
