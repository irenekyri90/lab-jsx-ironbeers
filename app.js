const express = require('express');
const erv = require('express-react-views');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// VIEW ENGINE SETUP
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', erv.createEngine());

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('Home');
});

app.get('/beers', (req, res) => {

  //const id = req.path;

  

  punkAPI
  .getBeers()
  .then(beersFromApi => {
    
    // Prepare the object to be passed/injected to `Beers` view
    const data = { beersFromApi: beersFromApi };

    // Render the `Beers` view and pass/inject to it the object containing the `beersFromApi`
    res.render('Beers', data);
  })
  .catch(error => console.log(error));

});

app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromApi => {

    
    // Prepare the object to be passed/injected to `Beers` view
    const data = { responseFromApi: responseFromApi };

    // Render the `Beers` view and pass/inject to it the object containing the `beersFromApi`
    res.render('RandomBeers', data);
  })
  .catch(error => console.log(error));
});


app.get('/beers/:id?', (req, res, next) =>{

  const id = req.params.id;
  console.log("THE ID IS :", id)
  punkAPI.getBeer(id).then(responseFromApi => {

    console.log(responseFromApi)
    // Prepare the object to be passed/injected to `Beers` view
    const data = { responseFromApi: responseFromApi };

    // Render the `Beers` view and pass/inject to it the object containing the `beersFromApi`
    res.render('RandomBeers', data);
  })
  .catch(error => console.log(error));

})

app.listen(3000, () => {
  console.log('🏃‍ on port 3000')
});