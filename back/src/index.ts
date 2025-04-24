import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const server: Express = express();

server.use(express.json());
server.use(cors());

server.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
