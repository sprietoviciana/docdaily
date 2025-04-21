const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const server = express();

//para variables de estado
require("dotenv").config();

server.use(cors());
server.use(express.json());

//para conectarte a la bd
async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "docdaily",
  });
  connection.connect();
  return connection;
}

//puerto donde corre el back y mensaje para terminal
const port = 5001;
server.listen(port, () => {
  console.log(`Server is running. Go to http://localhost:${port}`);
});

server.get("/", function (req, res) {
  res.send("Hello World!");
});

/*fichero estatico para ver front en back 
 const staticServerPath = path.join(__dirname, "../../web/dist");
 console.log(staticServerPath);
 server.use(express.static(staticServerPath));*/
