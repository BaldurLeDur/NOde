const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

dbo.connectToServer();




/*
suite du code ici
*/
/* index.js code before... */
app.get("/yolo/pokepo", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("pokepo")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
      
  });

  
app.use(bodyParser.urlencoded({ extended: true }));


//cherche un pokepo selon les filtres indiqués
app.get('/pokepo/filter/:search', (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokepo").find({parti:{$in:[req.params.search]}}).toArray(function (err, result) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.json(result);
    }
  });
});

//ajouter un pokemon
app.post('/pokepo/insert', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("pokepo").insertOne(body)
  res.json(body);
});

//supprimer un pokemon
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/pokepo/delete', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("pokepo").deleteOne(body)
  res.json(body);
});


//update le nom d'un pokemon
app.post('/pokepo/updateName', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("pokepo").updateOne({name:body.name}, {$set:{name:body.to}})
  res.json(body);
});

//update le parti d'un pokemon
app.post('/pokepo/updateParti', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("pokepo").updateOne({name:body.name}, {$set:{parti:body.to}})
  res.json(body);
});


//DANS LE POKEDEX

//ajoute un pokemon au pokedex
app.use(bodyParser.urlencoded({ extended: true}))
app.post('/pokepo/insert', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("polidex").insertOne(body)
  res.json(body);
});

//supprimer un pokemon du pokedex
app.post('/pokepo/delete', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("polidex").deleteOne(body)
  res.json(body);
});

//cherche un pokepo dans le polidex selon les filtres indiqués
app.get('/pokepo/filter/:search', (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect.collection("polidex").find({parti:{$in:[req.params.search]}}).toArray(function (err, result) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.json(result);
    }
  });
});


app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});