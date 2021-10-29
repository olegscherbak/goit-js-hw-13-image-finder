import './sass/main.scss';

import refs from './js/refs';
import cardMarkup from './templates/card.hbs';
import ApiServise from './js/apiService';
import LoadMoreBtn from './js/loadMoreBtn';
const basicLightbox = require('basiclightbox');

const apiServise = new ApiServise();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.refs.button.addEventListener('click', onLoadBtn);
refs.cardsList.addEventListener('click', openModal);

function onSearchForm(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.query.value;

  if (apiServise.query.trim() === '') {
    return alert('Пожалуйста, введите ваш запрос');
  }

  loadMoreBtn.show();
  clearGallery();
  apiServise.resetPage();
  fetchHits();
  clearInput(e);
}

function onLoadBtn() {
  if (apiServise.query.trim() === '') {
    return alert('Ошибка при загрузке!');
  }

  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  apiServise.fetchPictures().then(r => {
    renderMarkup(r);
    scrollToRenderedMarkup();
    loadMoreBtn.enable();
  });
}

function renderMarkup(r) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(r));
}

function clearInput(e) {
  e.currentTarget.elements.query.value = '';
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function scrollToRenderedMarkup() {
  setTimeout(() => {
    loadMoreBtn.refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 250);
}

function openModal(event) {
  if (event.target.classList.contains('image')) {
    const instance = basicLightbox.create(
      `<img src=${event.target.getAttribute('data-src')} width="" height="">`,
    );
    instance.show();
    basicLightbox.visible();
  }
}
