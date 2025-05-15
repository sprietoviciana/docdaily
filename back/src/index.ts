import express, { Express, Request, Response } from "express";
import cors from "cors";
import mysql, { ResultSetHeader } from "mysql2/promise";

const server: Express = express();

server.use(express.json());
server.use(cors());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER_DB ?? "root",
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

server.get("/doctors", async (req: Request, res: Response) => {
  const connection = await getDBConnection();
  const sqlQuery = "SELECT * FROM doctors";
  const [result] = await connection.query(sqlQuery);
  connection.end();

  res.status(200).json({
    doctors: result,
  });
});

server.post("/doctor", async (req: Request, res: Response) => {
  const { name, lastname, email } = req.body;
  const connection = await getDBConnection();

  const query = "INSERT INTO doctors (name, lastname) VALUES (?,?)";

  const [queryResult] = await connection.query(query, [name, lastname]);
  connection.end();

  const result = queryResult as ResultSetHeader;

  res.status(201).json({
    id: result.insertId,
    name,
    lastname,
  });
});

server.delete("/doctor/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const connection = await getDBConnection();
  const query = "DELETE from doctors WHERE id = ?";
  const [result] = await connection.query(query, [id]);

  res.status(200).json({
    result: result,
  });
});


server.get("/patients", async (req: Request, res: Response) => {
  const connection = await getDBConnection();
  const sqlQuery = "SELECT * FROM patients";
  const [result] = await connection.query(sqlQuery);
  connection.end();

  res.status(200).json({
    patients: result,
  });
});

server.post("/patients", async (req: Request, res: Response) => {
  const { name, lastname, email } = req.body;
  const connection = await getDBConnection();

  const query = "INSERT INTO patients (name, lastname) VALUES (?,?)";

  const [queryResult] = await connection.query(query, [name, lastname]);
  connection.end();

  const result = queryResult as ResultSetHeader;

  res.status(201).json({
    id: result.insertId,
    name,
    lastname,
  });
});

server.put("/patients/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  const connection = await getDBConnection();
  const query = "UPDATE patients SET name = ?, lastname = ? WHERE id = ?";
  await connection.query(query, [name, lastname, id]);
  connection.end();

  res.status(200).json({
    id,
    name,
    lastname,
  });
});

server.delete("/patients/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const connection = await getDBConnection();
  const query = "DELETE from patients WHERE id = ?";
  const [result] = await connection.query(query, [id]);

  res.status(200).json({
    result: result,
  });
});
