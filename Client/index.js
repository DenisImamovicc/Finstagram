let html = "";

//Sets loader to hidden when gallery is done being rendered
document.querySelector(".gallery").addEventListener("load", function(){
    const loader = document.querySelector(".loader");
    loader.classList += " hidden";
    return loader;
});

//fetch data and return fullfilled response in json format or a error message.
const getPhotos = async function(){
    const internalApi = "http://localhost:5000/PHOTOS";
    const fetchedPhotos = await fetch(internalApi).then(function(response){
            if (response.ok) {
                return response.json();
            }
          throw new Error("Server error 500-599");
        })
        .then(function(responseJson){
            return responseJson;
        })
        .catch(function(error){
            sendErrServerMessageAndData(error);
        });
    return fetchedPhotos;
};
//Sends error message log and return null.
const sendErrServerMessageAndData =function(error){
    const noPhotos = null;
    console.error(error.message);
    return noPhotos;
};

//Gets html template of either error/photo and .
const renderTemplate =function(htmlTemplate){
    const gallery = document.querySelector(".gallery");
    html += htmlTemplate;
    gallery.innerHTML = html;
};

//returns a error template that adds to the index.html in the gallery div.
const errorTemplate =function(){
    const errMessage="Server is not responding."+
                     "Reload the page or come back later.";
    const errHtmlTemplate =
        `<div class="errorMessage">`+
            `<h1 class="errorText">${errMessage}</h1>`+
        `</div>`;
    return renderTemplate(errHtmlTemplate);
};

//return photo templates that adds to the index.html in the gallery div.
const photosTemplate =function(photografies){
    photografies.forEach(function(photo){
        const photoHTMLTemplate =
            `<div class="photo">
                <img src="${photo.url_m}" alt="${photo.title}" >
            </div>`;
        return renderTemplate(photoHTMLTemplate);
    });
};

//Chooses what to render depending on the value of photgrafies data
const pickWhatToRenderTemplate = function(photografies){
    if (photografies) {
        return photosTemplate(photografies);
    }
    return errorTemplate();
};

//call to render the entire content of site.Change at your own peril!
const renderGallery = (async function(){
    const photografies = await getPhotos();
    return pickWhatToRenderTemplate(photografies);
}());