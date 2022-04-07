import express from "express"
import bodyParser from "body-parser";


const app = express();
const PORT = 8080;
app.use(bodyParser.json())
app.listen(PORT,()=>
    console.log(PORT,`fuck you at http://localhost:${PORT}`)
)

app.get("/",(reg,res)=>{
    console.log("fuck you was taken")
    res.send("Fuck you")
})