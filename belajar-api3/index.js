const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')

const { MongoClient } = require ('mongodb');
const { connect } = require('http2');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'belajar-api';

app.use (bodyParser.urlencoded({extended: false}))

app.use (bodyParser.json())


app.get('/products/v1:productId', async function (req, res){
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('productId');
  const insertOneResult = await collection.insertOne(req.body);
  console.log(insertOneResult)

  res.send(insertOneResult)
})

app.post('/products/v1', async function(req, res) {

  await client.connect();
  console.log('Connected successfully to server');
  
  const db = client.db(dbName);
  const collection = db.collection('products');
  const insertOneResult = await collection.insertOne(req.body);
  console.log(insertOneResult)

  res.send(insertOneResult)
})


app.listen(3000)