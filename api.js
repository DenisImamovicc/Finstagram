import express from "express"
import bodyParser from "body-parser";
import fetch from 'node-fetch';


const app = express();
const PORT = 8080;
const LINK= "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605fcb167973d5a9f74b205695b5e0f2&tags=Star+wars&extras=url_m&per_page=3&format=json&nojsoncallback=1&auth_token=72157720839396359-d3d488a8c496fb50&api_sig=5cfd7a42dc793d72dc2a96dfceef6fdf"



//app.use(bodyParser.json())
app.listen(PORT,()=>
    console.log(PORT,`fuck you at http://localhost:${PORT}`)
)

app.get("/PHOTOS",(reg,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(fetch(LINK)
    .then(res =>  res.json())
    .then(data))
})