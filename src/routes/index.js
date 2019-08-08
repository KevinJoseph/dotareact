const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const CircularJSON = require('circular-json');

//models

//connect server to mongoDB 
var url = "mongodb+srv://root:qwerty2019@dbnodernak-pyzkd.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true });



router.get('/', (req,res) => {
    res.render('index');
});


router.get('/demo', (req,res) => {

  let url = 'https://api.opendota.com/api/players/19';

  axios({
      method:'get',
      url
  })
  .then(function (response) {
      console.log('beni: '+ response.data.tracked_until);
      res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
      console.log(error);
  });

});

router.get('/register', (req,res) => {    
    res.render('register');
});

router.post('/create', (req,res) => {    
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    
    let url = "https://api.opendota.com/api/players/"+ req.body.id;

    axios({
      method:'get',
      url
  })
  .then(function (response) {
    console.log('beni: '+ JSON.stringify(response.data));
    if(response.data.rank_tier !== null){
      var myobj = {id: req.body.id, name: req.body.name, email: req.body.email, telefono: req.body.telefono, sugerencia: req.body.sugerencia};
     dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inser");
      db.close();
    });

    } else {
      console.log("no te puedes resgistrasdsfr");
      res.send('no te puedes registrar.');
      }
  })
  .catch(function (error) {
      console.log(error);

  });



});

});



router.get('/todo', (req, res) => {

  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://root:qwerty2019@dbnodernak-pyzkd.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  var mySet = new Set();
  var a = [];
  MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const collection = client.db("test").collection("users");
    collection.find({}).toArray(function (err, results) {
      if (err) {
        console.log(err)
        res.send([])
        return
      } 
     // console.log(results.id);
      //console.log(results[item].id);
      const apiarray=[];

      for (item in results) {
        apiarray[item] = "https://api.opendota.com/api/players/"+results[item].id;
      }
      const arraypromesas = [];
      var i =0;
      apiarray.forEach(function(element) {
        console.log(element);
        arraypromesas[i] = axios.get(element+"");
        i++;
      });

      Promise.all([
        Promise.all(arraypromesas),
    ])
    .then((values) => {
      var prevjson =CircularJSON.stringify(values);
      var array = JSON.parse(prevjson);
      //Object.assign({}, array);
      
    

      res.send(array[0]);

    });
    });
    client.close();

});

});


router.get('/recentMatch', (req, res) => {

  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://root:qwerty2019@dbnodernak-pyzkd.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  var mySet = new Set();
  var a = [];
  MongoClient.connect(uri, function(err, client) {
    if(err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }
    console.log('Connected...');
    const collection = client.db("test").collection("users");
    collection.find({}).toArray(function (err, results) {
      if (err) {
        console.log(err)
        res.send([])
        return
      } 
     // console.log(results.id);
      //console.log(results[item].id);
      const apiarray=[];

      for (item in results) {
        apiarray[item] = "https://api.opendota.com/api/players/"+results[item].id+"/recentMatches";
      }
      const arraypromesas = [];
      var i =0;
      apiarray.forEach(function(element) {
        console.log(element);
        arraypromesas[i] = axios.get(element+"");
        i++;
      });

      Promise.all([
        Promise.all(arraypromesas),
    ])
    .then((values) => {
      var prevjson =CircularJSON.stringify(values);
      var array = JSON.parse(prevjson);
      //Object.assign({}, array);
      
    

      res.send(array[0]);

    });
    });
    client.close();

});

});
module.exports = router;