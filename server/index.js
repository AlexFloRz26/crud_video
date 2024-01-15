const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

app.post("/create", (req, res) => {
  // const nombre = req.body.nombre;
  // const edad = req.body.edad;
  // const pais = req.body.pais;
  // const cargo = req.body.cargo;
  // const anios = req.body.anios;
  const { nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    "INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Empleado registrado con éxito");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener la lista de empleados" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/update", (req, res) => {
  // const id = req.body.id;
  // const nombre = req.body.nombre;
  // const edad = req.body.edad;
  // const pais = req.body.pais;
  // const cargo = req.body.cargo;
  // const anios = req.body.anios;
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  db.query(
    "UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?",
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al hacer update a la lista de empleados" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
