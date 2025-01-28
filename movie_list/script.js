async function getData() {
    const params = {
        type: 'movie',
        r: 'json',
        s: 'Hello'
    }
    const url = 'http://www.omdbapi.com/?apikey=a1eed56d&' + new URLSearchParams(params).toString();
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json();
        populateSearchResults(json);
        return json;
    } catch (error) {
        console.log(error.message)
    }
}

function populateSearchResults(data) {
    data.Search.forEach((element) => {
        let movieListing = document.createElement('p');

        movieListing.innerHTML = element.Title + ', ' + element.Year;
        movieListing.setAttribute('imdb', element.imdbID);
        movieListing.setAttribute('url', element.Poster);
        movieListing.addEventListener('click', getMovieDetails)

        document.getElementById('mainContainer').append(movieListing)
    });
}

async function getMovieDetails(e) {
    let imdbID = e.target.getAttribute('imdb');
   
    const url = 'http://www.omdbapi.com/?apikey=a1eed56d&' + 'i=' + imdbID;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status)
        }

        const json = await response.json()
        createModal(json)
    } catch (error) {
        console.log(error.message)
    }
}

function createModal(json) {
    let modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    let details = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('h1');
    let closeBtn = document.createElement('p');

    closeBtn.innerHTML = 'X';
    closeBtn.setAttribute('class', 'closeBtn');
    closeBtn.addEventListener('click', closeModal);

    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'detailModal');
    img.setAttribute('src', json['Poster']);

    modal.append(closeBtn);
    modal.append(img);
    modal.append(title);
    modal.append(details);
    
    let detailsBox = document.createElement('div'); 
    detailsBox.setAttribute('id', 'detailsBox');
    modal.append(detailsBox)

    Object.keys(json).forEach((element)=> {
        let text = document.createElement('p');

        if (element != 'Ratings') {
            text.innerHTML = element + ': ' + json[element];
            detailsBox.appendChild(text)
        }
    })

    modalContainer.append(modal);
    modal.classList.add("open");
}

function closeModal(e) {
    let modal = document.getElementById("detailModal");
    let modalContainer = document.getElementById("modalContainer")
    modal.classList.remove("open");
    modal.classList.add("closing");

    setTimeout(function() {
        modalContainer.innerHTML = '';
    }, 1500)
}

getData();