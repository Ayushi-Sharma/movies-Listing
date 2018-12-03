import data from '../public/data';
import Block from './Elements/Elements';

var getElements = {
    searchInput: document.getElementById('search-input'),
    applyButton: document.getElementById('search-apply'),
    addMovieButton: document.getElementById('add-movie-button'),
    resultCount: document.getElementById('result-count'),
    sortTitle: document.getElementById('sort-title'),
    sortYear: document.getElementById('sort-year')
  },
  movieList = data,
  count = data.length;

var UI = {
  init: () => {
    for (let i = 0; i < movieList.length; i++) {
      new Block(movieList, movieList[i], i);
    }
  }
};

var Application = Object.assign(Object.create(UI), {
  search: getElements.searchInput.addEventListener('search', event => {
    searchMovies();
  }),
  add: getElements.addMovieButton.addEventListener('click', event => {
    addMovie();
  }),
  applyAction: getElements.applyButton.addEventListener('click', () => {
    searchMovies();
  }),
  sortByTitle: getElements.sortTitle.addEventListener('click', () => {
    sort(movieList, 'title');
  }),
  sortByYear: getElements.sortYear.addEventListener('click', () => {
    sort(movieList, 'year');
  })
});

function sort(array, key) {
  let newArray = array;
  for (var i = 0; i < newArray.length - 1; i++) {
    for (var j = i + 1; j < newArray.length; j++) {
      if (newArray[i][key] > newArray[j][key]) {
        let tmp = newArray[i];
        (newArray[i] = newArray[j]), (newArray[j] = tmp);
      }
    }
  }
  movieList = newArray;
  initialize();
}

function searchMovies() {
  count = 0;
  var elements = document.getElementsByClassName('content-box');
  for (let i = 0; i < data.length; i++) {
    var title = data[i].title.toLowerCase(),
      value = getElements.searchInput.value.toLowerCase();

    var result = title.includes(value);
    if (result) {
      count += 1;
    }
    elements[i]
      ? (elements[i].style.display = result ? 'inline-block' : 'none')
      : (count = 0);
  }
  if (count) {
    getElements.resultCount.innerHTML =
      'Showing ' + count + ' Result' + (count > 1 ? 's!' : '!');
  } else {
    getElements.resultCount.innerHTML = 'No Results found!';
  }
}

function addMovie() {
  var title = prompt('Enter Movie Title');
  var year = title
    ? prompt('Enter Year of Release for ' + title)
    : alert('Movie Name cannot be empty');
  var list = {
    title: title,
    year: year,
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'
  };
  new Block(movieList, list, movieList.length);
  data.push(list);
  title && year ? alert('Movie successfully added') : '';
  getElements.resultCount.innerHTML = 'Showing ' + (count + 1) + ' Results!';
}

function initialize() {
  let section = document.getElementById('content-section');
  section.parentNode.removeChild(section);
  const elem = document.createElement('div');
  elem.id = 'content-section';
  document.getElementById('main').appendChild(elem);
  UI.init();
}

function setupApp() {
  var app = Object.create(Application);
  (app.movieList = data), (app.count = data.length);

  return app;
}

var App = setupApp(UI);
App.init();
