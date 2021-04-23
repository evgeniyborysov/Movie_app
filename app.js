window.onload = () => {

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1c72b657d9a077a9e86fd0a692d417c2';
const image = 'https://image.tmdb.org/t/p/w500';
const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=1c72b657d9a077a9e86fd0a692d417c2&query=';
const main = document.querySelector('main');
// const overview = document.querySelector('p');
// console.log(title);
// const test = 'https://api.themoviedb.org/3/find/{external_id}?api_key=1c72b657d9a077a9e86fd0a692d417c2&language=en-US&external_source=615457';
const test = 'http://api.themoviedb.org/3/movie/615457?api_key=1c72b657d9a077a9e86fd0a692d417c2';

const pages = document.querySelector('.pages');
// const buttons = document.querySelectorAll('button');

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);
    console.log(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, overview, poster_path : posterImg } = movie;
        let poster = image + posterImg;
        // console.log(poster);
        let newDiv = document.createElement("div");
        // let over = document.createElement('p');
        // let tit = document.createElement('h3');
        // movie.title = tit.innerHTML;
        // tit.innerHTML = movie.title;
        // over.innerHTML = movie.overview;

        main.appendChild(newDiv);
        newDiv.innerHTML = `
        <img src="${poster}" alt="">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>` ;
        // document.body.appendChild(over);
        // console.log(image + movie[0].poster_path);
        // overview.innerHTML = movies[movie].overview;
    });
    // console.log(image + movie[0].poster_path);
    // title.innerHTML = movies[0].original_title;
    // overview.innerHTML = movies[0].overview;
}

getMovies(API_URL);

pages.addEventListener('click', (e) => {
    if (e.target && e.target.tagName == "BUTTON") {
        let nextPage = API_URL + '&' + e.target.value;
        getMovies(nextPage);
    }

});

const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(API_SEARCH + search.value + "&" + "page=2");
    getMovies(API_SEARCH + search.value);
});


};
