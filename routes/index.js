const express = require("express");
const router = express.Router(); //Crear la ruta
const { assignToken } = require("../controllers/login");
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

const { insertSupportEmployee } = require("../controllers/apoyo_empleado");
const { validToken } = require("../middlewers/auth");

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

//RUTAS DE AUTENTIFICACIÓN Y LOGIN
router.post("/login", assignToken);

/***====== RUTAS ACCESIBLES SOLO SI ESTAS AUTENTIFICADO =======***/
// :) --> La respuesta es como la quiere el front

//Rutas de usuarios
router.get("/users", validToken, getUserList); // :)
router.get("/users/:userId", validToken, getUser); // :)

//Rutas de Empleados
router.get("/employees", validToken, getEmployees); // :)
router.get("/employees/history/:employeeId", validToken, getHistoryEmployee); // :)

router.get(
  "/employees/history/certifications/:employeeId",
  validToken,
  getHistoryCertificationsEmployee
); // :)

//Rutas de certificaciones
router.get("/certifications", validToken, getCertificationsList); // :)
router.get("/certifications/:idCertification", validToken, getCertification); // :)

//Rutas para apoyo de empleados
router.post("/employees/add/support", validToken, insertSupportEmployee);

module.exports = router;
