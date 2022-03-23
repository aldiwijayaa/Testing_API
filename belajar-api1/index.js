const express = require('express')
const app = express()
const bodyParser = require ('body-parser');

const { MongoClient } = require ('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName= 'belajar-api1';

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// app.get('/product/v1', async function (req, res) {

//   await client.connect();
//   console.log('connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('product');
//   const getTransectionResult = await collection.find({}). toArray();
//   console.log(getTransectionResult)

//   res.send(getTransectionResult)
// });

app.post('/product/v1', async function (req, res) {

  await client.connect();
  console.log('connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('product');
  const insertOneResult = await collection.insertOne(req.body);

  res.send(insertOneResult)
})
app.get('/product/v1/:detail', async function (req, res) {

  req.params.detail
  console.log('req.params.detail')
  const product1 = req.params.detail
  console.log('detail')
  await client.connect();
  console.log('connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('product');
  const getTransectionResult = await collection.findOne({productId: product1});


  // ['1','2'] => '1'

  console.log('dataAsli', getTransectionResult)

//   const newData = [];
//   for (let index = 0; index < getTransectionResult.length; index++) {
//     newData.push({
//       product : getTransectionResult [index].product,
//       name : getTransectionResult [index].name
//     })
//   }
// console.log (newData)
const dataBaru = [];
for (let index = 0; index < getTransectionResult.length; index++) {
  const element = getTransectionResult [index];

  dataBaru.push ({
    price : getTransectionResult [index].price,
    type : getTransectionResult [index].type
  })
  console.log(dataBaru)
  
}
  res.send(getTransectionResult)
});

app.listen(3000)