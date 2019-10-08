//===================
//====NodeJS Head====
//===================
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const crypto = require("crypto");
app.use(express.static("public"));
app.set("view engine", "ejs");


//=================
//====Variables====
//=================
const port = 806;
const url = "mongodb://localhost:27017";
const dbName = "Stugo_Halloween_Signup";

var operationPassword = "ac1082fe70f1a1ec37cb54a3038e8b45dd5f242800eb8415eeaa06e85869d3a6";
var maxPopulation = 15


//=================
//====Functions====
//=================
//insert entry function
function dbInsert(time, firstName, lastName, year, studentID) {
  //connect to mongo client
  MongoClient.connect(url, function(err, db) {
    if (err) console.log(err);
    var dbo = db.db(dbName);
    //create object
    var myobj = {Time: time, FirstName: firstName, lastName: lastName, Year: year, StudentID: studentID};

    //insert document
		dbo.collection("studentRecords").insertOne(myobj, function(err, res) {
      if (err) console.log(err);
      console.log("Entry added");
			db.close();
		});
  });
  return
};

//Remove entry function
function dbRemove(studentID) {
  MongoClient.connect(url, function(err, db) {
    if (err) console.log(err);
    var dbo = db.db(dbName);
    
    //remove entry
		dbo.collection("studentRecords").deleteOne({StudentID: studentID}, function(err, obj) {
			if (err) console.log(err);
			console.log("Entry removed");
			db.close();
		});
	});
};


//========================
//====Request Handling====
//========================
//Home page
app.get("/", function(req, res){
  res.render("index");
});

app.listen(port, function(){
  console.log("app started on port" + port);
});


//=================
//====Test Zone====
//=================
// console.log(crypto.createHmac('sha256', "string").digest('hex'));
// dbInsert("07:00-08:00", "Leon", "Lu", "10", "2220067");
// dbRemove("2220067");