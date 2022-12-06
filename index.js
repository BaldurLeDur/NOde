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
  app.get('/yolo/filter/:search', (req, res) => {
    const dbConnect = dbo.getDb();
    //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
    dbConnect.collection("pokepo").find({parti:{$in:[req.params.search]}}).toArray(function (err, result) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.json(result);
      }
    });
});
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/yolo/pokepo', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
    dbConnect.collection("pokepo").insertOne(body)
    res.json(body);
});
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/yolo/delete', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
    dbConnect.collection("pokepo").deleteOne(body)
    res.json(body);
});
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/yolo/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
    dbConnect.collection("pokepo").UpdateOne(body)
    res.json(body);
});


 app.listen(port, function () {
   console.log(`App listening on port ${port}!`);
 });