//Importaciones
const query = require("../querys/index.js"); //La consulta
const {
  employeesActives,
  employeesInformacion,
  historyEmployee,
  queryCertifations
} = require("../querys/empleados.js");

//Consultar los empleados activos
function getActiveEmployees(request, response) {
  query(employeesActives, request, response);
}

//Consultar los empleados inactivos
function getInactiveEmployees(req, resp) {
  query(employeesInactives, req, resp);
}

//Consultar los empleados, con su perfil y nivel
function getEmployees(req, resp) {
  query(employeesInformacion, req, resp);
}

//Consultar el historial del empleado
function getHistoryEmployee(req, resp) {
  let employeeId = parseInt(req.params.employeeId);
  if (employeeId === null) {
    resp.status(300).send({ code: 300, message: "Employee Id is null!" });
    return;
  } else if (!Number.isInteger(employeeId)) {
    resp.status(300).send({ code: 300, message: "Invalid Employe ID" });
    return;
  }
  query(historyEmployee(employeeId), req, resp);
}

//Consultar el historial de certificaciones de un empleado
function getHistoryCertificationsEmployee(req, resp) {
  let employeeId = parseInt(req.params.employeeId);
  if (employeeId === null || !Number.isInteger(employeeId)) {
    resp
      .status(300)
      .send({ code: 300, message: "Invalid employee ID or is Null!" });
    return;
  }
  query(queryCertifations(employeeId), req, resp);
}

module.exports = {
  getActiveEmployees,
  getInactiveEmployees,
  getEmployees,
  getHistoryEmployee,
  getHistoryCertificationsEmployee
};
