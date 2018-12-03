import totalMovieList from '../../public/data';

var count = totalMovieList.length;

export default class Block {
  constructor(movieList, data, index) {
    this.elm = document.createElement('div');
    this.elm.setAttribute('class', 'content-box');
    this.elm.addEventListener('click', evt => {
      var remove = confirm('Are you sure you wish to remove this Listing?');
      if (remove) {
        count -= 1;
        movieList.splice(index, 1);
        this.elm.parentNode.removeChild(this.elm);
        document.getElementById('result-count').innerHTML =
          'Showing ' + count + ' Results!';
      }
    });

    this.figure = document.createElement('figure');
    this.image = document.createElement('img');
    this.figcaption = document.createElement('figcaption');
    this.image.setAttribute('class', 'movie-poster');
    this.image.setAttribute('src', data.poster);
    this.image.setAttribute('alt', data.title);
    this.figure.appendChild(this.image);
    this.figure.appendChild(this.figcaption);

    this.title = document.createElement('h3');
    this.title.setAttribute('class', 'movie-title');
    this.title.innerHTML = data.title;

    this.year = document.createElement('div');
    this.year.setAttribute('class', 'year-text');
    this.year.innerHTML = '<b>Year of Release: </b>' + data.year;

    this.elm.appendChild(this.figure);
    this.elm.appendChild(this.title);
    this.elm.appendChild(this.year);

    document.getElementById('content-section').appendChild(this.elm);
    document.getElementById('result-count').innerHTML =
      'Showing ' + count + ' Results!';
  }
}
