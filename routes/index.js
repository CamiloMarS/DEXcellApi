const express = require("express");
const router = express.Router(); //Crear la ruta

//Importar los controladores
const { getUserList, getUser } = require("../controllers/usuarios");
const {
  getEmployees,
  getHistoryEmployee,
  getHistoryCertificationsEmployee
} = require("../controllers/employees");
const {
  getCertificationsList,
  getCertification
} = require("../controllers/certifications");

//Ruta principal
router.get("/", (request, response) => {
  response.status(200).send(`
      <div style="width: 100%; height: 100vh; background: whitesmoke; display:flex; justify-content:center; align-items:center; flex-direction:column;">
          <h1 style="text-shadow:1px 1px 5px #000; color: #fff;">Welcome</h1>
          <p>API DExcell</p>
          <a href="http://localhost:1908/api/dexcell/employees">http://localhost:1908/api/dexcell/employees</a>
      </div>
    `);
});

//Rutas de usuarios
router.get("/users", getUserList);
router.get("/users/:userId", getUser);

//Rutas de Empleados
router.get("/employees", getEmployees);
router.get("/employees/history/:employeeId", getHistoryEmployee);
router.get(
  "/employees/history/certifications/:employeeId",
  getHistoryCertificationsEmployee
);

//Rutas de certificaciones
router.get("/certifications", getCertificationsList);
router.get("/certifications/:idCertification", getCertification);

module.exports = router;
