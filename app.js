window.onload = () => {

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1c72b657d9a077a9e86fd0a692d417c2';
const image = 'https://image.tmdb.org/t/p/w500';
const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=1c72b657d9a077a9e86fd0a692d417c2&query=';
const main = document.querySelector('main');
// const overview = document.querySelector('p');
// console.log(document.querySelector('h3'));
// const test = 'https://api.themoviedb.org/3/find/{external_id}?api_key=1c72b657d9a077a9e86fd0a692d417c2&language=en-US&external_source=615457';

const test = 'http://api.themoviedb.org/3/movie/16535?api_key=1c72b657d9a077a9e86fd0a692d417c2';


const pages = document.querySelector('.pages');
// const buttons = document.querySelectorAll('button');
let isFlag = false;

const nextPage = document.getElementById("btn-next");
const form = document.getElementById("form");
const search = document.getElementById("search");
const favorite = document.getElementById("favorite");
const home = document.getElementById("home");
// console.log(favorite);


const myStorage = window.localStorage;
// console.log(myStorage);

async function getMovies(url) {
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    // console.log(data);

    // showMovie(data);
    showMovies(data.results);
    // console.log(data.results);
}

function favoriteMovie(storage) {
    console.log(storage);
    for(let i = 0; i < storage.length; i++) {
        let key = storage.key(i);
        // console.log(key);
        let test = `http://api.themoviedb.org/3/movie/${storage.key(i)}?api_key=1c72b657d9a077a9e86fd0a692d417c2`;
        console.log(test);
        getMovies(test);
    }    
    
}



function showMovie(movie) {
    // console.log(movie.title);
    const { title, overview, poster_path : posterImg, id } = movie;
    let poster = image + posterImg;

    let newDiv = document.createElement("div");

    main.appendChild(newDiv);
    newDiv.innerHTML = `
    <img src="${poster}" alt="">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <button value="${id}" name="${movie.title}">Like</button> `;    
    
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, overview, poster_path : posterImg, id } = movie;
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
        <p>${movie.overview}</p>
        <button value="${id}" name="${movie.title}">Like</button> `;
        // document.body.appendChild(over);
        // console.log(image + movie[0].poster_path);
        // overview.innerHTML = movies[movie].overview;
    });
    // console.log(image + movie[0].poster_path);
    // title.innerHTML = movies[0].original_title;
    // overview.innerHTML = movies[0].overview;
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(API_SEARCH + search.value + "&" + "page=2");
    getMovies(API_SEARCH + search.value);
    isFlag = true;
    console.log(isFlag);
});

let ctn = 1;

console.log(ctn);
pages.addEventListener('click', (e) => {
    ctn++;

    console.log(ctn);
    if (isFlag == true) {
        if (e.target && e.target.tagName == "BUTTON") {
            getMovies(API_SEARCH + search.value + '&' + e.target.value);
        }
    } else if (nextPage) {
        let next = API_URL + '&' + 'page=' + ctn;
        console.log(next);
        getMovies(next);
    }

    // console.log(isFlag);
});


main.addEventListener('click', (e) => {
    if (e.target && e.target.tagName == "BUTTON") {
        console.log(e.target.value);
        console.log(e.target.name);
        // console.log(e);
        myStorage.setItem(e.target.value, e.target.name);
        console.log(myStorage);
    }
    // myStorage.clear();
});

favorite.addEventListener('click', (e) => {
    console.log("Done");
    if (myStorage.length === 0) {
        alert("Пусто");
    }else {
        // favoriteMovie(myStorage);
    }
});

home.addEventListener('click', (e) => {
    getMovies(API_URL);
});


getMovies(API_URL);
// getMovies(test);

};