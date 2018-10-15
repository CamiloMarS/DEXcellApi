"use strict";

//Exportar las cadenas de consulta
module.exports = {
  allEmployees: "select * from Empleados;",

  employeesActives: "SELECT * FROM Empleados WHERE Empleados.activo = true;",

  employeesInactives: "SELECT * FROM Empleados WHERE Empleados.activo = false;",

  employeesInformacion: `
    SELECT E.nombre, E.apellidos, E.fecha_ingreso, E.saldo_ingles, E.saldo_informacion, P.Descripcion, N.Codigo
    from Empleados AS E 
    INNER JOIN Perfil AS P 
    ON E.Perfil = P.id_perfil
    INNER JOIN Nivel AS N
    ON E.Nivel = N.id_nivel;`,

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
  }
};
