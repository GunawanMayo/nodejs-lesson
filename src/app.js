const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();

const server = app.listen(3000, function () {
  console.log("node.js is listening to port:" + server.address().port)
})

app.disable("x-powered-by")
app.use(cors()).use(express.json());

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "sample"
});

connection.connect(function (error) {
  if (error) {
    console.log(`failed to connect to mysql: ${error}`);
    throw error;
  }
  console.log("connect mysql:");
});

app.get('/', (req, res) => {
  const sql = `
    select 
      id, 
      title, 
      description 
    from 
      todos
  `
  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;

  const sql = `
    insert into todos (title,description)
    values ("${todo.title}", "${todo.description}")
  `

  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.status(201).json(result.insertId);
  })
});
