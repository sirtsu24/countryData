const express = require('express');
const bodyParser = require('body-parser');

const axios = require ('axios');
const ejs = require('ejs');
const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', ejs);
app.get('/', (req, res) =>{
    res.render("index.ejs", {countryData: ''});

});

app.post('/', (req, res) => {
    let countryData = req.body.country;
    let url = `https://restcountries.eu/rest/v2/name/${countryData}?fullText=true`;
    
    axios.get(url)
    .then(function(response){
        let countryObj = response.data[0];
        console.log(countryObj.languages[0].name);
        res.render("index.ejs", {countryData: countryObj})
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})