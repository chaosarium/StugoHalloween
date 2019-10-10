//===================
//====NodeJS Head====
//===================
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const crypto = require("crypto");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set("view engine", "ejs");


//=================
//====Variables====
//=================
const port = 806;
const url = "mongodb://localhost:27017";
const dbName = "Stugo_Halloween_Signup";

const operationPasswordHash = "ac1082fe70f1a1ec37cb54a3038e8b45dd5f242800eb8415eeaa06e85869d3a6";
const maxPopulation = 15


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
    var myobj = {Time: time, FirstName: firstName, LastName: lastName, Year: year, StudentID: studentID};

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
    
    //remove document
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
//Home Page
app.get("/", function(req, res){
  var T1Count = 0
  var T2Count = 0
  var T3Count = 0
  var T4Count = 0
  var T5Count = 0
  var T6Count = 0
  
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		var dbo = db.db(dbName)
		dbo.collection("studentRecords").find({}).toArray(function(err, result) {
			if (err) throw err
			for (var i = 0; i < result.length; i++) {
				if (result[i].Time == "19:00-19:15") {
          T1Count++
        }
				if (result[i].Time == "19:15-19:30") {
          T2Count++
        }
        if (result[i].Time == "19:30-19:45") {
          T3Count++
        }
        if (result[i].Time == "19:45-20:00") {
          T4Count++
        }
        if (result[i].Time == "20:00-20:15") {
          T5Count++
        }
        if (result[i].Time == "20:15-20:30") {
          T6Count++
        }
      }
      console.log("count result: " + "|" + T1Count + "|" + T2Count + "|" + T3Count + "|" + T4Count + "|" + T5Count + "|" + T6Count + "|")
      db.close()   
      res.render('index', {T1Count: T1Count, T2Count: T2Count, T3Count: T3Count, T4Count: T4Count, T5Count: T5Count, T6Count: T6Count, maxPopulation: maxPopulation})
		})
  })
});

//Signup Page
app.get("/signup/:timeSelect", function(req, res){
  var timeSelect = req.params.timeSelect;
  console.log("selected time is " + timeSelect)
  var T1Count = 0
  var T2Count = 0
  var T3Count = 0
  var T4Count = 0
  var T5Count = 0
  var T6Count = 0
  
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		var dbo = db.db(dbName)
		dbo.collection("studentRecords").find({}).toArray(function(err, result) {
			if (err) throw err
			for (var i = 0; i < result.length; i++) {
				if (result[i].Time == "19:00-19:15") {
          T1Count++
        }
				if (result[i].Time == "19:15-19:30") {
          T2Count++
        }
        if (result[i].Time == "19:30-19:45") {
          T3Count++
        }
        if (result[i].Time == "19:45-20:00") {
          T4Count++
        }
        if (result[i].Time == "20:00-20:15") {
          T5Count++
        }
        if (result[i].Time == "20:15-20:30") {
          T6Count++
        }
      }
      console.log("count result: " + "|" + T1Count + "|" + T2Count + "|" + T3Count + "|" + T4Count + "|" + T5Count + "|" + T6Count + "|")
      db.close()   
      res.render('signup', {T1Count: T1Count, T2Count: T2Count, T3Count: T3Count, T4Count: T4Count, T5Count: T5Count, T6Count: T6Count, timeSelect: timeSelect, maxPopulation: maxPopulation})
		})
  })
});

//Data Page
app.get("/data", function(req, res){
  var T1Count = 0
  var T2Count = 0
  var T3Count = 0
  var T4Count = 0
  var T5Count = 0
  var T6Count = 0
  
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		var dbo = db.db(dbName)
		dbo.collection("studentRecords").find({}).toArray(function(err, result) {
			if (err) throw err
      for (var i = 0; i < result.length; i++) {
				if (result[i].Time == "19:00-19:15") {
          T1Count++
        }
				if (result[i].Time == "19:15-19:30") {
          T2Count++
        }
        if (result[i].Time == "19:30-19:45") {
          T3Count++
        }
        if (result[i].Time == "19:45-20:00") {
          T4Count++
        }
        if (result[i].Time == "20:00-20:15") {
          T5Count++
        }
        if (result[i].Time == "20:15-20:30") {
          T6Count++
        }
      }
      console.log("count result: " + "|" + T1Count + "|" + T2Count + "|" + T3Count + "|" + T4Count + "|" + T5Count + "|" + T6Count + "|")
      db.close()   
      res.render('data', {T1Count: T1Count, T2Count: T2Count, T3Count: T3Count, T4Count: T4Count, T5Count: T5Count, T6Count: T6Count, dataList: result, maxPopulation: maxPopulation})
		})
  })
});

//Cancel Page
app.get("/cancel", function(req, res){
  res.render('cancel');
});

//Signup POST
app.post("/signup", function(req, res){
  console.log("sugnup post request recieved")
  //get post info
  var time = req.body.time
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var year = req.body.year
  var studentID = req.body.studentID
  console.log("request info: " + "|" + time + "|" + firstName + "|" + lastName + "|" + year + "|" + studentID + "|");

  //check availability
  var availabilityCount = 0
  
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		var dbo = db.db(dbName)
		dbo.collection("studentRecords").find({}).toArray(function(err, result) {
			if (err) throw err
			for (var i = 0; i < result.length; i++) {
				if (result[i].Time == time) {
          availabilityCount++
        }
      }
      console.log("Avalibility count:" + availabilityCount)
      db.close()
      
      //control flow
      if (availabilityCount < 15) {
        //add entry to database
        console.log("Availabiligy check passed, adding to database")
        dbInsert(time, firstName, lastName, year, studentID);
      }
      else{
        console.log("OOPS, ERROR, too many sign-ups")
        //Some Error Reporting Machanism
      }
		});
  });

  //response
  res.send("post done");
});

//Cancel POST
app.post("/cancel", function(req, res){
  console.log("cancel post request recieved")
  //get post info
  var studentID = req.body.studentID
  var operationPassword = req.body.operationPassword
  console.log("request info: " + "|" + studentID + "|" + operationPassword + "|");
  
  //check password
  if (crypto.createHmac('sha256', operationPassword).digest('hex') == operationPasswordHash) {
    //Check ID availability
      MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db(dbName)
        dbo.collection("studentRecords").find({StudentID: studentID}).toArray(function(err, result) {
          if (err) throw err
          if (result.length > 0) {
            dbRemove(studentID);
            res.send("correct password, student ID valid, operation sucessful, " + studentID + " has been removed")
          }
          else {
            res.send("student ID not available, try again")
          }
        });
      });
  }
  else {
    res.send("wrong password, try again");
  }
});

//Listen
app.listen(port, function(){
  console.log("app started on port" + port);
});


//=================
//====Test Zone====
//=================
// console.log(crypto.createHmac('sha256', "string").digest('hex'));
// dbInsert("07:00-08:00", "Leon", "Lu", "10", "2220067");
// dbRemove("2220067");
// console.log(dbCheck("124543"))