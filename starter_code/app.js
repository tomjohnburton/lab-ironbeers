
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper();
const beer1 = punkAPI.getBeer(1)

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// const beerCheck = document.getElementsByClassName('beer-check')

// beerCheck.onclick = function(){

// }

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get ('/beer/:id', (req,res)=>{
  punkAPI.getBeer(req.params.id)
  .then(beers => {
    res.render('random-beers',{
      rand: beers
    });
  });
})

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(rand => {
    console.log('random')

    res.render('random-beers', {rand});
    
  })
  .catch(error=>{
    console.log('error')
  })
});


app.get('/beers', (req, res, next) => {


  punkAPI.getBeers()
  .then(beers => {
    console.log('are there beers')

    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});




app.listen(3000);
