const express = require("express");
const mysql = require("mysql");
const cors = require("cors")
const bodyParser = require("body-parser");

const dbConfig = require("./config/db.config");

const accountRouter = require("./routes/accountRouter")
const transactionRouter = require("./routes/transactionRouter")
const transfersRouter = require("./routes/transfersRouter")

const app = express();
const port = 5001;

app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

app.use(bodyParser.json());


accountRouter(app, connection);
transactionRouter(app, connection);
transfersRouter(app, connection);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});