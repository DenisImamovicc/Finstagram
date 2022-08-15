# Finstagram
Photo gallery(Client) and REST API(Server).Both API and web server are hosted and live at Heroku.Live version link is in the About section. 

## Installation
Create a terminal,then acess the server to download necessary node files and dependencies
```bash
cd Server
npm install
```
## Activating Dev Api
Note:Flickr api key is required for proper function and not supplied in this git hosted repository.

Type in the terminal while in the Server directory...
```bash
npm start
```
Starts the api on localhost.If you want to shut down then in the terminal...
```bash
ctrl+c
```

## Activating Dev gallery web server
Type in the terminal while in the Server directory...
```bash
nodemon js/server.js
```
Starts the gallery page on a localhost in your browser.You have to change __filename variabel on server.js to your terminal path since it is set manually to:
```bash
C:/Users/Denis/Desktop/Visual studio/Arbetsprov/cygni-takeawaytest
```
If you want to see how gallery reacts without Api,to simulate server issues/error handling, then block api req in network tab and reload the page.Page has timed cache so you will need to go to browsers application tab/storage/localstorage delete and refresh to see diffent error handling.