const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22566981-b2c0de401259c0633e20b55b4';

export default class ApiServise {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchPictures() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  clearInput() {
    this.searchQuery.innerHTML = '';
  }
}
