(function Queryes() {
  "use strict";

  /** Consultar a todos los empleados */
  const allEmployees = "select * from Empleados;";

  /** Consultar a los empleados solamente activos */
  const employeesActives =
    "SELECT * FROM Empleados WHERE Empleados.activo = true;";

  /** Consultar a los empledos que estan inactivos  */
  const employeesInactives =
    "SELECT * FROM Empleados WHERE Empleados.activo = false;";

  /** Consultar el nombre,  apellidos, fecha_ingreso, saldo_ingles, saldo_formacion, perfil, y nivel de un empleado **/
  const employeesInformacion = `
    SELECT E.nombre, E.apellidos, E.fecha_ingreso, E.saldo_ingles, E.saldo_informacion, P.Descripcion, N.Codigo
    from Empleados AS E 
    INNER JOIN Perfil AS P 
    ON E.Perfil = P.id_perfil
    INNER JOIN Nivel AS N
    ON E.Nivel = N.id_nivel;`;
  //Exportar las cadenas de consulta
  module.exports = {
    allEmployees,
    employeesActives,
    employeesInactives,
    employeesInformacion
  };
})();
