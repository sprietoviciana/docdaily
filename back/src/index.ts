import express, { Express, Request, Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const server: Express = express();

server.use(express.json());
server.use(cors());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER_DB ?? "user",
    password: process.env.PASSWORD ?? "12345678",
    database: "docdaily",
  });
  connection.connect();
  return connection;
}

const port = process.env.PORT ?? "3000";

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});
