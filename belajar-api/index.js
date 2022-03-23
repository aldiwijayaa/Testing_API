const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// import mongoClient
const { MongoClient } = require('mongodb');

// mongodb configuration
// url 
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'belajar-api';



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// GET , PUT, POST, DELETE, PATCH
 
app.get('/products/v1', async function (req, res) {
    // req.query
    // req.params
    await client.connect();
    console.log('connected successfully to server');

    
    const db = client.db(dbName);
    const collection = db.collection('products');
    const getProductResult = await collection.find({}).toArray();
    console.log(getProductResult)
    
  res.send(getProductResult)
});

app.post('/products/v1', async function(req, res) {

    // konek ke mongodb
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db(dbName);
    const collection = db.collection('products');
    const insertOneResult = await collection.insertOne(req.body);
    console.log(insertOneResult)

    res.send(insertOneResult)
})
 
app.listen(3000)