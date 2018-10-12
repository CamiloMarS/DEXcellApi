(function Queryes() {
  "use strict";

  //Exportar las cadenas de consulta
  module.exports = {
    allEmployees: "select * from Empleados;",
    employeesActives: "SELECT * FROM Empleados WHERE Empleados.activo = false;",
    employeesInactives:
      "SELECT * FROM Empleados WHERE Empleados.activo = false;",
    employeesInformacion: `
    SELECT E.nombre, E.apellidos, E.fecha_ingreso, E.saldo_ingles, E.saldo_informacion, P.Descripcion, N.Codigo
    from Empleados AS E 
    INNER JOIN Perfil AS P 
    ON E.Perfil = P.id_perfil
    INNER JOIN Nivel AS N
    ON E.Nivel = N.id_nivel;`
  };
})();
