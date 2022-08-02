let html = "";
const REFRESH_TIME=60000;

//Sets loader to hidden when gallery is done being rendered
document.querySelector(".gallery").addEventListener("load", function(){
    const loader = document.querySelector(".loader");
    loader.classList += " hidden";
    return loader;
});

//Gets html template of either error/photo and.
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
            `<article class="photo" aria-labelledby="main article">
                <img src="${photo.url_m}" alt="${photo.title}" >
            </article>`;
        return renderTemplate(photoHTMLTemplate);
    });
};

//Chooses what to render depending on the value of photgrafies data
const pickWhatToRenderTemplate = function(photografies){
    //console.log(photografies);
    if (photografies) {
        return photosTemplate(photografies);
    }
    return errorTemplate();
};

//Updates gallery content every REFRESH_TIME when called.
const updateLocalStorage = setTimeout(
    ()=>localStorage.removeItem("storedData"), REFRESH_TIME);

//fetch data and return localstorage data/new data or render err mssg.
const fetchData = async function() {
    const internalApi = "http://localhost:5000/PHOTOS";
    if (localStorage.getItem("storedData")) {
        updateLocalStorage;
        return pickWhatToRenderTemplate(JSON.parse(localStorage.getItem("storedData")));
    }
    
    const fetchPhotos = await fetch(internalApi).then(function(response){
        if (response.ok) {return response.json();}
        throw new Error("Server error 500-599")
    })
    .then(function(responseJson){
        localStorage.setItem("storedData",JSON.stringify(responseJson));
        return pickWhatToRenderTemplate(responseJson);
    })
    .catch(function(error){
        console.error(error,"error happ");
        pickWhatToRenderTemplate(false)
    });
    return fetchPhotos;
}();