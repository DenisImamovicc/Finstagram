import express from "express"
import fetch from 'node-fetch';
import cors from "cors"

const flickrApiKey = "904552878bd72bf5143028f71ca3411e"
const allowedServer="http://127.0.0.1:8080"
const api = express();
const PORT = 5000;
const flickrApi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&text=Star+wars&extras=url_m&per_page=20&format=json&nojsoncallback=1`

//Fetches none specified json data from flickrApi with the flickrApi and returns data,if res is status 200, in json form of photo array containing x amount of picture/s.
function getExternaldata(req,res) {
    fetch(flickrApi)
    .then(res => res.json())
    .then(rawData => {
        const filteredData = res.status(200).send(rawData.photos.photo)
        return filteredData
    });
}

//.use() method allows a server,allowedServer,to fetch data from this API without our beloved cors being in the way :).
api.use(cors({
    origin:allowedServer
}))

api.listen(PORT, () =>
    console.log(PORT, `Api live at http://localhost:${PORT}`)
)

//Creates /PHOTOS API route and responds to requests made by allowed servers by calling getExternaldata() function.
api.get("/PHOTOS", (req,res) => {
    getExternaldata(req,res)
})