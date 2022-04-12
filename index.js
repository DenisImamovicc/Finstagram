const externalApiLINK = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605fcb167973d5a9f74b205695b5e0f2&tags=Star+wars&extras=url_m&per_page=3&format=json&nojsoncallback=1&auth_token=72157720839396359-d3d488a8c496fb50&api_sig=5cfd7a42dc793d72dc2a96dfceef6fdf"
const apiAdress = "http://localhost:8080/PHOTOS"

async function fetchPhotos(externalApiLINK) {
    try {
        const response = await fetch(externalApiLINK, {
            method: 'GET',
            //credentials: ''
        });
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error(error);
    }
}


async function renderPhotos(externalApiLINK) {
    const photos = await fetchPhotos(externalApiLINK);
    const photografies = photos.photos.photo
    let html = '';
    console.log(photografies);
    photografies.forEach(photo => {
        let htmlSegment = `<div class="photo">
                            <img src="${photo.url_m}" >
                        </div>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.container');
    container.innerHTML = html;
}



renderPhotos(externalApiLINK)