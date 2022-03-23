const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "belajar-api2";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/solution/v1", async function (req, res) {
  await client.connect();
  console.log("connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("solution");
  const insertOneResult = await collection.insertOne(req.body);
  console.log("insertOneResult");

  res.send(insertOneResult);
});
app.get("/solution/v1/:solutions", async function (req, res) {
  req.params.detail;
  console.log("req.params.solutions");
  const project1 = req.params.solutions;
  console.log("solutions");
  await client.connect();
  console.log("connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("solution");
  // const getTransectionResult = await collection.find({}).toArray();
  const getTransectionResult = await collection.findOne({
    solutiontId: project1,
  });
  console.log("dataAsli", getTransectionResult);

  res.send({
    solutionName: getTransectionResult.solutionName,
  });
});
app.listen(4000);
