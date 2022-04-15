
const externalApiLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c16d5aee0e63b31b7eefc8b5e0db5c4c&tags=powerlifting&per_page=3&format=json&nojsoncallback=1&auth_token=72157720839635019-60205b969c1fda88&api_sig=58dad857d012e4e8012274cb48bb5a35"
const internalApiLink = "http://localhost:5000/PHOTOS"


//dokument about function
async function fetchPhotos(internalApiLink) {
    try {
        const response = await fetch(internalApiLink, {
            method: 'GET',
            //credentials: ''
        });
        const photos = await response.json();
        console.log(photos);
        return photos;
    } catch (error) {
        console.error(error,"i shat my pants");
    }
}

//dokument about function
async function renderPhotos(internalApiLink) {
    const photografies = await fetchPhotos(internalApiLink);
    let html = '';
    let container = document.querySelector('.gallery');
    let body = document.querySelector('body');

    console.log(photografies);

    if (photografies===undefined) {
        body.innerHTML=`<div class="errorMessage">
                        <h1>Server is not responding.Reload the page or come back later.</h1>
                        </div>`
         
    }
    photografies.forEach(photo => {
        let htmlSegment = `<div class="photo">
                            <img src="${photo.url_m}" alt="${photo.title}" >
                            </div>`;

        html += htmlSegment;
    });
    container.innerHTML = html;
}



renderPhotos(internalApiLink)