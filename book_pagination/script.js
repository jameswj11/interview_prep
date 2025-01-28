const offset = 20;
let numPages = 0;
let numResults;
let bottom = false;
let isActive = false;

async function getData() {
    if (isActive) return;

    isActive = true;

    const url = "https://openlibrary.org/search/authors.json?q=hello&limit=20&offset=" + (offset * numPages);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }
        
        const json = await response.json();
        numResults = json.numFound;

        parseData(json);
    } catch (error) {
        console.error(error);
    }
}

function parseData(json) {
    json.docs.forEach((element)=> {
        let card = document.createElement('div');
        let name = document.createElement('h2');
        let topWork = document.createElement('h5');

        card.setAttribute('class', 'card')
        name.innerHTML = 'Name: ' + element.name;
        topWork.innerHTML = 'Top Work: ' + element.top_work;

        card.append(name)
        card.append(topWork);
        document.getElementById('mainContainer').append(card);
        
        isActive = false;
    })
}

function checkScrollPos(e) {
    // scroll calculation from https://stackoverflow.com/questions/9439725/how-to-detect-if-browser-window-is-scrolled-to-bottom
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) { 
        numPages++;
        getData();
    }
}

window.addEventListener('scroll', checkScrollPos);
getData();