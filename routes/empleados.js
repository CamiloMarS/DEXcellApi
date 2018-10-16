//Express
const express = require("express");
//Crear una instancia para la ruta
const router = express.Router();
//Importar los controladores
const {
  getActiveEmployees,
  getEmployees,
  getHistoryEmployee,
  getHistoryCertificationsEmployee
} = require("../controllers/employees.js");

//Ruta principal
router.get("/", (request, response) => {
  response.status(200).send(`
    <div style="width: 100%; height: 100vh; background: whitesmoke; display:flex; justify-content:center; align-items:center; flex-direction:column;">
        <h1 style="text-shadow:1px 1px 5px #000; color: #fff;">Welcome</h1>
        <p>API DExcell</p>
        <a href="http://localhost:1908/api/employees">http://localhost:1908/api/employees</a>
    </div>
  `);
});

router.get("/employees/actives", getActiveEmployees);
router.get("/employees", getEmployees);
router.get("/employee/history/:employeeId", getHistoryEmployee);
router.get(
  "/employee/history_certifications/:employeeId",
  getHistoryCertificationsEmployee
);

module.exports = router;
