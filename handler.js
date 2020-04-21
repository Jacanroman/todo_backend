//import express from "express"
// React apps get Transpiled
// This version of NodeJs does support impor statements and ther is no traspilation step

const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");

// Logically separate 4 sections of code according to the method of the HTTP request recieved

//Export a single function, called App

const app = express();
app.use(cors());


app.get("/tasks", function(request, response){
  //Should make a SELECT * FROM Tasks query to the DB and return the result
  //For now, it's just going to retur some dummy data

  //Request has loads of info about the request
  // Response has some useful methods for sending a response
  response.status(200).send({
    tasks : [
      {
        id: 1,
        text: "Wash the dishes",
      },
      {
        id:2,
        text: "Wash the car",
      },
    ]
  });
});



app.delete("/tasks/:id", function(request, response){
  
  // Should delete the task with the specified ID from the database
  // For now, just send back a text mesage (an status 200)
  response.status(200).send("delete some task for the TODO app")
});

app.post("/tasks", function(request, response){
  // Should insert into the database the new task
  // For now, just send back a text message
  response.status(200).send("Post to insert new task")
});

app.put("/tasks/:id", function(request, response){
  //should Update a task in the 
  // For now, just send back a text message
  response.status(200).send("Put to Upadate some of the task")
});


module.exports.app = serverlessHttp(app);