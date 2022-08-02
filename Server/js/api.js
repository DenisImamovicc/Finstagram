import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const flickrapikey = "904552878bd72bf5143028f71ca3411e";
const allowedserver = "*";
const api = express();
const port = 5000;
const flickrapi = `https://www.flickr.com/services/rest/` +
                  `?method=flickr.photos.search` +
                  `&api_key=${flickrapikey}&text=Star+wars&extras=url_m` +
                  `&per_page=20&format=json&nojsoncallback=1`;

//Fetch and return  succesful data with x amount of photos and specified theme;
function getExternaldata(req,res) {
    fetch(flickrapi)
    .then((res) => res.json())
    .then((rawData)=> res.status(200).send(rawData.photos.photo))
    .catch(function (err) {
        console.error("sent from catch",err.message);
        throw new Error(res.status(500).send(err));
    });
}

//Allows a server to fetch data from this API without cors being in the way :).
api.use(cors({
    origin: allowedserver
}));

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));

///Route responds to requests by calling getExternaldata().
api.get("/PHOTOS", function (req, res) {
    getExternaldata(req, res);
});