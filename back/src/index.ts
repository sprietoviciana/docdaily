import { Database } from "sqlite3";
import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";

const db = new Database(":memory:");

db.exec(fs.readFileSync(__dirname + "/../sql/tables.sql").toString());
db.exec(fs.readFileSync(__dirname + "/../sql/data.sql").toString());

const server: Express = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT ?? "3000";

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});

server.get("/", (req, res) => {
  res.send("Hello World From the Typescript Server!");
});

server.get("/doctors", (_, res) => {
  db.all("SELECT * FROM doctors", (_, result) => {
    res.status(200).json({
      doctors: result,
    });
  });
});

server.get("/doctors/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM doctors WHERE id = ?", [id], function (_, result) {
    res.status(200).json({
      doctors: result,
    });
  });
});

server.post("/doctors", (req, res) => {
  const { name, lastname } = req.body;
  db.run(
    "INSERT INTO doctors (name, lastname) VALUES (?,?)",
    [name, lastname],
    function () {
      res.status(201).json({
        id: this.lastID,
        name,
        lastname,
      });
    },
  );
});

server.put("/doctors/:id", (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  db.run(
    "UPDATE doctors SET name = ?, lastname = ? WHERE id = ?",
    [name, lastname, id],
    function () {
      res.status(200).json({
        id,
        name,
        lastname,
      });
    },
  );
});

server.delete("/doctors/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE from doctors WHERE id = ?", [id], function () {
    res.status(200).json({
      result: id,
    });
  });
});

server.get("/patients", (_, res) => {
  db.all("SELECT * FROM patients", (_, result) => {
    res.status(200).json({
      patients: result,
    });
  });
});

server.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  db.all("SELECT * FROM patients WHERE id = ?", [id], function (_, result) {
    res.status(200).json({
      patients: result,
    });
  });
});

server.post("/patients", (req, res) => {
  const { name, lastname } = req.body;
  db.run(
    "INSERT INTO patients (name, lastname) VALUES (?,?)",
    [name, lastname],
    function () {
      res.status(201).json({
        id: this.lastID,
        name,
        lastname,
      });
    },
  );
});

server.put("/patients/:id", (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  db.run(
    "UPDATE patients SET name = ?, lastname = ? WHERE id = ?",
    [name, lastname, id],
    function () {
      res.status(200).json({
        id,
        name,
        lastname,
      });
    },
  );
});

server.delete("/patients/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE from patients WHERE id = ?", [id], function () {
    res.status(200).json({
      result: id,
    });
  });
});
