
const serverlessHttp = require("serverless-http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");  // para leer los json con serverless
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:"Tasks"
});

// Logically separate 4 sections of code according to the method of the HTTP request recieved
//Export a single function, called App

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.get("/tasks", function(request, response){
  //Should make a SELECT * FROM Tasks query to the DB and return the result
  //Request has loads of info about the request
  // Response has some useful methods for sending a response

  connection.query("SELECT * FROM Task", function(err,data){
    if(err){
      console.log("Error from MySQL",err);
      response.status(500).send(err);
    }else{
      response.status(200).send(data)
    }
  });

});



app.delete("/tasks/:id", function(request, response){
  
  const id = request.params.id;
  const query = `DELETE FROM Task WHERE TaskId = ?`;

  connection.query(query, [id], function(err){
    if(err){
      console.log("Error from MySQL",err);
      response.status(500).send(err);
    }else{
      response.status(200).send(`Deleted task with ID: ${id}`)
    }
  });
  
  // Should delete the task with the specified ID from the database
  //response.status(200).send(`Deleted task with ID ${id}!`);
});



app.post("/tasks", function(request, response){
  
  const data = request.body; 

  //SQL INJECTION PROBLEM
  /*const query = `INSERT INTO Task (Description, Completed, DueDate) VALUES ("${data.Description}", FALSE, "${data.DueDate}")`;
  NO USAMOS EL QUERY ANTERIOR PORQUE ES MUY INSEGURO*/
  //to avoid the SQL injection we "escaping" user-provided values

  //const query = `INSERT INTO Task (Description, Completed, DueDate) VALUES(?,?,?)`;

  const query = `INSERT INTO Task (Description, Completed, DueDate, UserId) VALUES(?,?,?,?)`;


  connection.query(query,[data.Description,false, data.DueDate, data.UserId],function(err,results){
  //connection.query(query,[data.Description,false, data.DueDate],function(err,results){
    if(err){
      console.log("Error from MySQL",err);
      response.status(500).send(err);
    } else{
      // Send back the newly created task
      // Because the frontend(client) migh want to know the ID
      connection.query(`SELECT * FROM Task WHERE TaskId = ${results.insertId}`, function(err,results){
        if(err){
          console.log("Error from MySQL",err);
          response.status(500).send(err);
        }else{
          response.status(201).send(results[0]);
        }

      });
    }

  });
  
  //response.status(201).send(`New task of ${data.text} created`);
});



app.put("/tasks/:id", function(request, response){
  
  const data = request.body;
  const id = request.params.id;

  const query = "UPDATE Task SET Description = ?, Completed = ?, DueDate = ?, UserId = ? WHERE TaskId = ?";

  connection.query(query, [data.Description, data.Completed, data.DueDate, data.UserId, id],function(err){
    if(err){
      console.log("Error from MySQL",err);
      response.status(500).send(err);
    }else{
      response.status(205).send(`Updated task with ID: ${id}`);
      //response.status(205).json({product: data});
    }
  })
  //should Update a task in the 
  // For now, just send back a text message
  //response.status(200).send(`Update task with ID ${id}! and data ${JSON.stringify(data)}`);

});


module.exports.app = serverlessHttp(app);


