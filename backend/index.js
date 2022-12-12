const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

dbo.connectToServer();

// Ce code va en haut de votre fichier index.js, dans vos requires
var cors = require('cors');
const { ObjectID, ObjectId } = require("bson");

//celui-ci après la déclaration de la variable app
app.use(cors())


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
    }
    res.json(result);
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
{/*app.post('/polidex/insert', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body)
  toImport = () => dbConnect.collection("pokepo").find({name:"Emmanuel Macron"}).toArray(function(err, result){
    if (err){console.log("niksamer")}
    
  }).then( console.log(toImport(), "rr"))
  //const toImport = dbConnect.collection("pokepo").findOne({name:body.name})//.then(
    //() => console.log(toImport), console.log("ggg")//(toImport)=>dbConnect.collection("polidex").insertOne(toImport)
  //);
  res.json(toImport());
});*/}


{/*app.post('/polidex/insert', jsonParser, (req, res) => {
  const body=req.body;
  const dbconnect=dbo.getDb();
  dbconnect.collection("pokepo").findOne({_id:ObjectId(body._id)})
  .then(function(error, result){
    if(error){res.json(body)};
    {dbconnect.collection("polidex").insertOne(result),
    {//, {forceServerObjectId: false}},
    console.log("ojuonbcb"),
  res.json({body})}
})
})*/}


//ajouter un pokemon
app.post('/polidex/insert', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("polidex").insertOne(body)
  res.json(body);
});


//afficher le polidex
app.get("/polidex/print", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("polidex")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
});


//supprimer un pokemon du pokedex
app.post('/polidex/delete', jsonParser, (req, res) => {
  const dbConnect = dbo.getDb();
  const body = req.body;
  console.log('Got body:', body);
  dbConnect.collection("polidex").deleteOne(body)
  res.json(body);
});

//cherche un pokepo dans le polidex selon les filtres indiqués
app.get('/polidex/filter/:search', (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect.collection("polidex").find({parti:{$in:[req.params.search]}}).toArray(function (err, result) {
    if (err) {
      res.status(400).send(err.message);
    }
    res.json(result);
  });
});


app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});