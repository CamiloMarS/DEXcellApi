//Express
const express = require("express");
//Crear una instancia para la ruta
const router = express.Router();
//Importar los controladores
const {
  getActiveEmployees,
  getEmployees,
  getHistoryEmployee
} = require("../controllers/employees.js");

//Ruta principal
router.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

router.get("/actives", getActiveEmployees);
router.get("/employees", getEmployees);
router.get("/history/:employeeId", getHistoryEmployee);

module.exports = router;
