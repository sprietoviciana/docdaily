import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import mysql from "mysql2/promise";
import * as dotenv from 'dotenv';

dotenv.config();

const server: Express = express();

server.use(express.json());
server.use(cors());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: "docdaily",
  });
  connection.connect();
  return connection;
}

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});
