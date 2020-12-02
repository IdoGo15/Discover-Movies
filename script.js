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

var customSelect, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
customSelect = document.getElementsByClassName("custom-select");
l = customSelect.length;
for (i = 0; i < l; i++) {
  selElmnt = customSelect[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  customSelect[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            if(s.options[i].value == 1){
              getMovies(API_URL);
              console.log(1);
            } else if(s.options[i].value == 2) {
              getMovies(REVENUE_API_URL);
              console.log(2);
            } else if(s.options[i].value == 3) {
              getMovies(VOTE_COUNT_API_URL);
              console.log(3);
            } else if(s.options[i].value == 4) {
              getMovies(DATE_API_URL);
              console.log(4);
            }
            break;
          }
        }
        h.click();
        
    });
    b.appendChild(c);
  }
  customSelect[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);





