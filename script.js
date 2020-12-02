const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a73709ff3e6826674938dab18c5c2c15&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a73709ff3e6826674938dab18c5c2c15&query=';
const DATE_API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=a73709ff3e6826674938dab18c5c2c15&sort_by=release_date.desc&page=1-3&year=2020';
const REVENUE_API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=a73709ff3e6826674938dab18c5c2c15&sort_by=revenue.desc&page=1';
const VOTE_COUNT_API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=a73709ff3e6826674938dab18c5c2c15&sort_by=vote_count.desc&page=1';

const logo = document.getElementById('logo'); 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const sortBy = document.getElementById('sortBy');

logo.addEventListener('click', () => {
  window.location.reload();
});

//Get initial movies
getMovies(API_URL);

async function getMovies (url) {
  const data = await fetch(url)
  .then(res => res.json())
  .catch(err => console.log(err));

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
    <div class"left-col">
      <h3>${title}</h3>
      <h5>${release_date}</h5>
    </div>  
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
    `
    main.appendChild(movieEl);
  })
}

function getClassByRate(vote) {
  if(vote >= 8) {
    return 'green';
  } else if(vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
})




