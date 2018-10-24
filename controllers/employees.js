//Importaciones
const query = require("../querys/index.js"); //La consulta
const {
  employeesActives,
  employeesInformacion,
  historyEmployee,
  queryCertifations
} = require("../querys/empleados.js");
const { connToDB, disconnectDB } = require("../conection");

//Consultar los empleados activos
function getActiveEmployees(request, response) {
  let conn = connToDB();
  let sql = employeesActives;

  conn.query(sql, (err, result) => {
    if (err) {
      response.status(500).send({
        status: 500,
        message: err
      });

      disconnectDB(conn);
      return;
    }

    disconnectDB(conn);

    if (result.rowCount > 0) {
      //Settear los valores
      let data = result.rows;
      response.status(200).send(data);
    } else {
      response.status(404).send({
        status: 404,
        message: "Not Found!"
      });
    }
  });
}

//Consultar los empleados inactivos
function getInactiveEmployees(req, resp) {
  query(employeesInactives, req, resp);
}

//Consultar los empleados, con su perfil y nivel
function getEmployees(req, resp) {
  let conn = connToDB();
  let sql = employeesInformacion;

  conn.query(sql, (err, result) => {
    if (err) {
      resp.status({ status: 401, message: err });
      return;
    }

    const data = result.rowCount;

    if (data > 0) {
      const employees = result.rows.map((e, i) => {
        const { employeeId, name, lastname, profile, level, dateAdmission } = e;
        //Dar formato segun el Front
        return {
          employeeId,
          fullname: `${name} ${lastname}`,
          profile,
          level,
          dateAdmission: dateAdmission.toLocaleDateString("en-US")
        };
      });
      resp.status(200).send(employees);
    }
  });

  //query(employeesInformacion, req, resp);
}

//Consultar el historial del empleado
function getHistoryEmployee(req, resp) {
  let employeeId = parseInt(req.params.employeeId);
  if (employeeId === null) {
    resp.status(400).send({ code: 300, message: "Employee Id is null!" });
    return;
  } else if (!Number.isInteger(employeeId)) {
    resp.status(400).send({ code: 300, message: "Invalid Employe ID" });
    return;
  }

  //Realizar consulta
  query(historyEmployee(employeeId), req, resp).then(history => {
    //Array de objetos
    if (history.length > 0 || history !== 0) {
      const historyEmploye = history.map(curr => {
        const {
          costo,
          observaciones,
          fecha_solicitud,
          asignado_por,
          tipo_apoyo
        } = curr;

        //Dar formato a la respuesta
        return {
          requested: fecha_solicitud.toLocaleDateString("en-US"),
          name: observaciones,
          type: tipo_apoyo,
          cost: costo,
          registered_by: asignado_por
        };
      });
      resp.status(200).send(historyEmploye); //Mandar los datos
    }
  });
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
