import express from "express"
import fetch from 'node-fetch';
import cors from "cors"
const externalApiLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c16d5aee0e63b31b7eefc8b5e0db5c4c&tags=powerlifting&extras=url_m&per_page=3&format=json&nojsoncallback=1&auth_token=72157720839635019-60205b969c1fda88&api_sig=e1e24adecff6eae0e60e70da90e3296a"
const galleryLink="http://127.0.0.1:8080"
//const cors = require("cors")
const app = express();
const PORT = 5000;


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