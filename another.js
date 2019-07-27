const searchForm =  document.querySelector('#search-form');
const movie = document.querySelector('#movies')

function apiSearch(event) {
	event.preventDefault();

	const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=bebc4be9e383670121721c0529981fa6&language=ru-RU&query=' +
    searchText;
    movie.innerHTML = 'Loading...';
    requestApi(server)
    .then(function(result){
    	const output = JSON.parse(result)

		let inner = '';

		output.results.forEach(function (item){
			let nameItem = item.name || item.title;
			inner += inner + `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
		});

		movie.innerHTML = inner;

	

    })
    .catch(function(reason){
    	movie.innerHTML = 'something goes wrong';
    	console.log('error:' + reason.status);
    });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url){
	return new Promise (function (resolve, reject) {
		const request = new XMLHttpRequest();
		request.open('GET', url);

		request.addEventListener('load', function(){
			if (request.status !== 200){
				reject({status: request.status});
				return;
			}

			resolve(request.response);
		});

		request.addEventListener('error', function(){
			reject({status: request.status
			});
		});
		request.send();

	});
}


// 	request.addEventListener('readystatechange', function() {
// 		if (request.readyState !== 4){

// 			movie.innerHTML = 'Loading';
// 			return;
// 		}
	
// 		if(request.status !== 200) {
// 			movie.innerHTML = 'Something goes wrong';
// 			console.log('error: ' + request.status);
// 			return;
// 		}

		
// }