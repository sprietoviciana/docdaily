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
  db.all("SELECT * FROM doctors", (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(200).json({
        doctors: result,
      });
    }
  });
});

server.get("/doctors/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM doctors WHERE id = ?", [id], function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    }
    if (!result) {
      return res.status(404).json({
        error: `No doctor found with ID ${id}`,
      });
    } else {
      return res.status(200).json(result);
    }
  });
});

server.post("/doctors", (req, res) => {
  const { name, lastname } = req.body;
  db.run(
    "INSERT INTO doctors (name, lastname) VALUES (?,?)",
    [name, lastname],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(201).json({
          id: this.lastID,
          name,
          lastname,
        });
      }
    },
  );
});

server.put("/doctors/:id", (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  db.run(
    "UPDATE doctors SET name = ?, lastname = ? WHERE id = ?",
    [name, lastname, id],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(200).json({
          id,
          name,
          lastname,
        });
      }
    },
  );
});

server.delete("/doctors/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE from doctors WHERE id = ?", [id], function (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(204).json();
    }
  });
});

server.get("/patients", (_, res) => {
  db.all("SELECT * FROM patients", (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(200).json({
        patients: result,
      });
    }
  });
});

server.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM patients WHERE id = ?", [id], function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    }
    if (!result) {
      return res.status(404).json({
        error: `No patient found with ID ${id}`,
      });
    } else {
      res.status(200).json(result);
    }
  });
});

server.post("/patients", (req, res) => {
  const { name, lastname } = req.body;
  db.run(
    "INSERT INTO patients (name, lastname) VALUES (?,?)",
    [name, lastname],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(201).json({
          id: this.lastID,
          name,
          lastname,
        });
      }
    },
  );
});

server.put("/patients/:id", (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;
  db.run(
    "UPDATE patients SET name = ?, lastname = ? WHERE id = ?",
    [name, lastname, id],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(200).json({
          id,
          name,
          lastname,
        });
      }
    },
  );
});

server.delete("/patients/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE from patients WHERE id = ?", [id], function (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(204).json();
    }
  });
});

server.get("/appointments", (req, res) => {
  const date = req.query.date;
  const doctorId = req.query.doctorId;

  if (!date) {
    res.status(400).json({
      error: "Missing 'date' query parameter",
    });
  }
  const query = doctorId
    ? "SELECT * FROM appointments WHERE date = ? AND doctor_id = ?"
    : "SELECT * FROM appointments WHERE date = ?";

  db.all(query, [date, doctorId], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(200).json({
        appointments: result,
      });
    }
  });
});

server.post("/appointments", (req, res) => {
  const { date, start_time, end_time, treatment, doctor_id, patient_id } =
    req.body;
  db.run(
    "INSERT INTO appointments (date, start_time, end_time, treatment, doctor_id, patient_id) VALUES (?,?,?,?,?,?)",
    [date, start_time, end_time, treatment, doctor_id, patient_id],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(201).json({
          id: this.lastID,
          date,
          start_time,
          end_time,
          treatment,
          doctor_id,
          patient_id,
        });
      }
    },
  );
});

server.put("/appointments/:id", (req, res) => {
  const id = req.params.id;
  const { date, start_time, end_time, treatment, doctor_id, patient_id } =
    req.body;
  db.run(
    "UPDATE appointments SET date =?, start_time = ?, end_time=?, treatment=?, doctor_id=?,patient_id=? WHERE id = ?",
    [id, date, start_time, end_time, treatment, doctor_id, patient_id],
    function (error) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error. Please try again later.",
        });
      } else {
        res.status(200).json({
          id,
          date,
          start_time,
          end_time,
          treatment,
          doctor_id,
          patient_id,
        });
      }
    },
  );
});

server.delete("/appointments/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE from appointments WHERE id =?", [id], function (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error. Please try again later.",
      });
    } else {
      res.status(204).json();
    }
  });
});
