const API_KEY='api_key=3655ee9c7ada9894390d9da7a47b4968';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL + '/search/movie?query=';

const main=document.getElementById('main');
const form=document.getElementById('form');
const search= document.getElementById('search');
const button=document.getElementById('searchbutton');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data=>{
       showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML='';

    data.forEach(movie => {
        const{title,poster_path,vote_average,overview}=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <div class="eachmovie">
        <img src="${IMG_URL+poster_path}" alt="${title}">   
        <div class="movie-info">   
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        </div>
        `
        main.appendChild(movieEl);
    });
}

function getColor(vote){
    if(vote>=8){
        return "green";
    }else if(vote>=5){
        return "orange";
    }else{
        return "red";
    }
}

searchbutton.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchTerm=search.value;

    if(searchTerm){
        getMovies(searchURL+searchTerm+'&'+API_KEY);
    }
    else{
        getMovies(API_URL);
    }
}) 