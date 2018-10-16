"use strict";

//Exportar las cadenas de consulta
module.exports = {
  //Obtener los datos
  allEmployees: "select * from Empleados;",
  employeesActives: `SELECT E.id_empleado as "employeeId", E.nombre as "name", E.apellidos as "lastname", E.fecha_ingreso as "dateAdmission",  E.saldo_ingles, E.saldo_informacion, P.Descripcion as "profile", N.Codigo as "level"
  from Empleados AS E 
  INNER JOIN Perfil AS P 
  ON E.Perfil = P.id_perfil
  INNER JOIN Nivel AS N
  ON E.Nivel = N.id_nivel WHERE E.activo = true`,
  employeesInactives: "SELECT * FROM Empleados WHERE Empleados.activo = false;",
  employeesInformacion: `
  SELECT E.id_empleado as "employeeId", E.nombre as "name", E.apellidos as "lastname", E.fecha_ingreso as "dateAdmission",  E.saldo_ingles, E.saldo_informacion, P.Descripcion as "profile", N.Codigo as "level", E.activo as "active"
  from Empleados AS E 
  INNER JOIN Perfil AS P 
  ON E.Perfil = P.id_perfil
  INNER JOIN Nivel AS N
  ON E.Nivel = N.id_nivel`,
  historyEmployee: idEmployee => {
    return `
    SELECT ap.costo, ap.observaciones, ap.fecha_solicitud as "Solicitado el", us.nombre||', '||us.apellidos AS "Asignado por", tp.nombre as "Tipo Apoyo", tp.descripcion
    FROM Apoyo_empleado AS ap
    INNER JOIN d_usuarios AS us
    ON ap.usuario = us.id_usuario
    INNER JOIN Tipo_apoyo as tp
    ON ap.tipo_apoyo = tp.id_tipoapoyo
    WHERE ap.empleado = ${idEmployee}; -- Recibir el id del empleado a consultar
  `;
  },
  queryCertifations: idEmployee => {
    return `
      SELECT e.nombre||' '||e.apellidos AS "Empleado", tp.nombre as "Apoyo", cc.certificacion,  cc.organismo, ae.costo, cc.costo_examen, ae.observaciones, ae.fecha_solicitud,  du.nombre AS "Asignado por"
      FROM Historial_certificaciones AS ha -- primera tabla
      INNER JOIN Apoyo_empleado AS ae -- Segunda tabla
      ON ha.id_apoyoempleado = ae.id_apoyo
      INNER JOIN Tipo_apoyo AS tp -- Tercera tabla
      ON ae.tipo_apoyo = tp.id_tipoapoyo
      INNER JOIN catalogo_certificaciones AS cc -- Cuarta tabla
      ON ha.id_certificacion = cc.id_certificacion
      INNER JOIN Empleados AS e --Quinta tabla
      ON ae.empleado = e.id_empleado
      INNER JOIN d_usuarios as du -- Sexta tabla
      ON ae.usuario = du.id_usuario 
      WHERE e.id_empleado = ${idEmployee};    
    `;
  },
  //INSERTAR DATOS
  insertNewEmployee: data => {
    let {
      activo,
      nombre,
      apellidos,
      ingreso_f,
      saldoIngles,
      saldoFormacion,
      perfil,
      nivel,
      vigenciaIdioma,
      vigenciaFormaciones
    } = data;
    return `
    INSERT INTO Empleados (activo, nombre, apellidos, fecha_ingreso, saldo_ingles, saldo_informacion, perfil, nivel, vigencia_saldo_idioma, vigencia_saldo_formacion) 
    VALUES (${activo}, '${nombre}',${apellidos}, '${ingreso_f}', ${saldoIngles}, ${saldoFormacion}, ${perfil}, ${nivel}, '${vigenciaIdioma}', '${vigenciaFormaciones}');
    `;
  }.
  //INSERTAR APOYO

};
