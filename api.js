import express from "express"
import bodyParser from "body-parser";
import fetch from 'node-fetch';
import {
    response
} from "express";


const app = express();
const PORT = 8080;
const externalApiLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3166afb88dcbdda3430eb6b70e26f510&tags=Star+wars&extras=url_m&per_page=3&format=json&nojsoncallback=1&auth_token=72157720839517229-3b782c535bf85a36&api_sig=57e590e339ce21ac5a315ef8939a044e"

//app.use(bodyParser.json())
app.listen(PORT, () =>
    console.log(PORT, `fuck you at http://localhost:${PORT}`)
)

function getExternaldata(externalApiLink,res) {
    fetch(externalApiLink)
    .then(res => res.json())
    .then(extData => {
        //console.log(extData.photos.photo)
        return res.send(extData.photos.photo)
    });
}
app.get("/PHOTOS", (reg, res) => {
    getExternaldata(externalApiLink,res)
})