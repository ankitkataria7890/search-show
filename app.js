const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
//port
const port = process.env.PORT || 4000;
//path
const static_path = path.join(__dirname, '/public');
const template_path = path.join(__dirname, '/views');
const partials_path = path.join(__dirname, '/partials');
//set engine
const app = express();
app.set('view engine', 'ejs');
app.set('views', template_path);
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('main.ejs')
})
app.post("/search", (req, res) => {
    const query = req.body.query;
    console.log(query)
    const api = fetch('http://api.tvmaze.com/search/shows?q=' + query).then(res =>
        res.json()
    ).then(data => {
        if(data[0])
        res.render('movie', { shows: data })
        else res.send('<script> alert("Sorry! Nothing Found With Your Keywords Please Try With Other Keywords Such as Avengers ,Tim ,Girls..");window.location.href="/" ;</script> ');
    }).catch((err)=>{
        res.send('<script> alert("Please Check Internet Connection . Problem In Fetching Data");window.location.href="/" ;</script> ');
        console.log("error")
     })
})
app.get('/movie', (req, res) => {
    res.redirect('movie')
})
app.get('/image',(req,res)=>{
    res.render('image')
})
app.get('/img/:key', (req, res) => {
    let id = req.params.key
    fetch('https://api.tvmaze.com/shows/'+id).then(res =>
        res.json()
    ).then(data => {
        res.render('image', { data: data })
    })
})

app.listen(port, () => {
    console.log("this port is" + port)
})
