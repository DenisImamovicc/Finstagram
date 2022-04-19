let html = '';

//Sets loader to hidden when gallery is done being rendered
document.querySelector('.gallery').addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    return loader.classList += " hidden";
});

//fetches data from ap.js thru internalApi and returns fullfilled response in json format,if unsuccesful it will send a error message.
const getPhotos = async () => {
    const internalApi = "http://localhost:5000/PHOTOS"
    const fetchedPhotos = await fetch(internalApi).then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch((error) => {
            sendErrServerMessageAndData(error)
        });
    return fetchedPhotos
}
//Sends error message to the console and returns null when api server is at fault.
const sendErrServerMessageAndData = (error) => {
    const noPhotos = null
    console.error(error.message, "Server error 500-599");
    return noPhotos;
}

//Gets html template of either error/photo and .
const renderTemplate = (htmlTemplate) => {
    const gallery = document.querySelector('.gallery');
    html += htmlTemplate;
    gallery.innerHTML = html;
}

//returns a error template that adds to the index.html in the gallery div. 
const errorTemplate = () => {
    const errHtmlTemplate =
        `<div class="errorMessage">
            <h1 class="errorText">Server is not responding.Reload the page or come back later.</h1>
        </div>`
    return renderTemplate(errHtmlTemplate)
}

//returns x amount of photo template with individual values that adds to the index.html in the gallery div. 
const photosTemplate = (photografies) => {
    photografies.forEach(photo => {
        const photoHTMLTemplate =
            `<div class="photo">
                <img src="${photo.url_m}" alt="${photo.title}" >
            </div>`;
        return renderTemplate(photoHTMLTemplate)
    });
}

//Chooses what to render depending on the value of photgrafies data
const pickWhatToRenderTemplate = (photografies) => {
    if (photografies) {
        return photosTemplate(photografies)
    }
    return errorTemplate()
}

//call to render the entire content of site.Change at your own peril!
const renderGallery = (async () => {
    const photografies = await getPhotos();
    return pickWhatToRenderTemplate(photografies)
})()