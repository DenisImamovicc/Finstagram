
const externalApiLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3166afb88dcbdda3430eb6b70e26f510&tags=Star+wars&extras=url_m&per_page=10&format=json&nojsoncallback=1&auth_token=72157720839517229-3b782c535bf85a36&api_sig=3ed9825da5af426f95600e7ce01a7db6"
const internalApiLink = "http://localhost:8080/PHOTOS"



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
        console.error(error);
    }
}


async function renderPhotos(internalApiLink) {
    const photografies = await fetchPhotos(internalApiLink);
    let html = '';
    console.log(photografies);
    photografies.forEach(photo => {
        let htmlSegment = `<div class="photo">
                            <img src="${photo.url_m}" alt="${photo.title}" >
                            </div>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.gallery');
    container.innerHTML = html;
}



renderPhotos(internalApiLink)