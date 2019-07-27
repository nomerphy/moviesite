const searchForm =  document.querySelector('#search-form');
const movie = document.querySelector('#movies')
const urlPoster = 'https://image.tmdb.org/t/p/w500';
function apiSearch(event) {
	event.preventDefault();

	const searchText = document.querySelector('.form-control').value;
    if(searchText.trim().length === 0){
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Введите что-то</h2>'
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=bebc4be9e383670121721c0529981fa6&language=ru-RU&query=' +
    searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
    .then(function(value){
        console.log();
        if(value.status !== 200){
            return Promise.reject(value);
        }

    	return value.json();
    })
    .then(function(output){
    	let inner = '';
        if(output.results.length === 0){
            inner = '<h2 class="col-12 text-center text-warning">Ничего не найдено</h2>';

        };
		output.results.forEach(function (item){
			let nameItem = item.name || item.title;
            const poster = item.poster_path ? urlPoster + item.poster_path : 'noposter.png'; // if no banner for movie
            let dataInfo = '';
            inner += `
            <div class="col-12 col-md-6 col-xl-3 item">
            <img src="${poster}" class="poster" alt="${nameItem}">
            <h5>${nameItem}</h5>

            </div>

            `;
		});

		movie.innerHTML = inner;

        addEventMedia();
    })
    .catch(function(reason){
    	movie.innerHTML = 'something goes wrong';
    	console.error('error ' + reason.status);
    });
}



searchForm.addEventListener('submit', apiSearch);

function addEventMedia(){
      const media = movie.querySelectorAll('img[data-id]');
        media.forEach(function(elem){
        elem.style.cursor = 'pointer'
        elem.addEventListener('click', showFullInfo);
        });
}

function showFullInfo(){

}

