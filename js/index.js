const internalApi = "http://localhost:5000/PHOTOS"
let html = '';
const gallery = document.querySelector('.gallery');

//Sets loader to hidden when gallery is done being rendered
gallery.addEventListener("load",  () => {
    const loader = document.querySelector(".loader");
    return loader.classList += " hidden";
});

//fetches data from ap.js thru internalApi and returns fullfilled response in json format,if unsuccesful it will send a error message.
async function fetchPhotos() {
    try {
        const response = await fetch(internalApi);
        const photos = await response.json();
        return photos;
    } catch (error) {
        return sendErrMessageAndData(error)
    }
}

//Sends error message to the console and returns null.
function sendErrMessageAndData(error) {
    console.error(error, "Internal server denied acess 500 error");
    return null;
}

//Gets html template of either error/photo.
function getTemplate(htmlTemplate) {
    html += htmlTemplate;
    gallery.innerHTML = html;
}

//returns a error template that adds to the index.html in the gallery div. 
function errorTemplate() {
    const errHtmlTemplate = 
    `<div class="errorMessage">
        <h1 class="errorText">Server is not responding.Reload the page or come back later.</h1>
    </div>`
    return getTemplate(errHtmlTemplate)
}

//returns x amount of photo template with individual values that adds to the index.html in the gallery div. 
function photosTemplate(photografies) {
    photografies.forEach(photo => {
        const photoHTMLTemplate = 
        `<div class="photo">
            <img src="${photo.url_m}" alt="${photo.title}" >
        </div>`;
        return getTemplate(photoHTMLTemplate)
    });
}

//Chooses what to render depending on the value of photgrafies data
function pickRenderTemplate(photografies) {
    if(!photografies) {
        return errorTemplate()
    }
    return photosTemplate(photografies)
}

//render the entire sites main content in gallery.
async function renderSite() {
    const photografies = await fetchPhotos(internalApi);
    return pickRenderTemplate(photografies)
}

//call to render the entire content of site.Change at your own peril!
renderSite()