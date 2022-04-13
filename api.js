import express from "express"
import fetch from 'node-fetch';
import cors from "cors"
const externalApiLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3166afb88dcbdda3430eb6b70e26f510&tags=Star+wars&extras=url_m&per_page=10&format=json&nojsoncallback=1&auth_token=72157720839517229-3b782c535bf85a36&api_sig=3ed9825da5af426f95600e7ce01a7db6"
const galleryLink="http://127.0.0.1:5500"
//const cors = require("cors")
const app = express();
const PORT = 8080;


app.use(cors({
    origin:galleryLink
}))
app.listen(PORT, () =>
    console.log(PORT, `fuck you at http://localhost:${PORT}`)
)

function getExternaldata(externalApiLink,res) {
    fetch(externalApiLink)
    .then(res => res.json())
    .then(extData => {
        //console.log(extData.photos.photo)
        return res.status(200).send(extData.photos.photo)
    });
}
app.get("/PHOTOS", (reg, res) => {
    getExternaldata(externalApiLink,res)
})