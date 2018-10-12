(function RoutesEmployees() {
  const express = require("express");
  const { connToDB, disconnectDB } = require("../conection"); //cadena de conexion con Postgres
  const {
    employeesActives,
    employeesInactives,
    employeesInformacion
  } = require("../querys/empleados.js");

  //Crear una instancia para la ruta
  const router = express.Router();

  //Ruta principal
  router.get("/", (request, response) => {
    response.status(200).send("Hello World");
  });

  router.get("/inactivos", (req, res) => {
    let conn = connToDB();
    conn.query(employeesInactives, (err, result) => {
      console.log(result.rows);
      res.render("index", { data: JSON.stringify(result.rows) });
      disconnectDB(conn);
    });
  });

  router.get("/empleados", (req, res) => {
    let conn = connToDB();
    conn.query(employeesInformacion, (err, result) => {
      res.status(200).send(result.rows);
      disconnectDB(conn);
    });
  });

  module.exports = router;
})();
