const apoyo_empleado = {
  insert_apoyo: data_apoyo => {
    if (Object.keys(data_apoyo).length <= 0) {
      console.log("No hay valores que insertar!");
      return;
    }
    let {
      costo,
      observaciones,
      fecha_solicitud,
      usuario,
      empleado,
      tipo_apoyo
    } = data_apoyo;

    return `
    INSERT INTO Apoyo_empleado (costo, observaciones, fecha_solicitud, usuario, empleado, tipo_apoyo)
    VALUES (${costo}, '${observaciones}', '${fecha_solicitud}',${usuario}, ${empleado}, ${tipo_apoyo});`;
  },
  getListSupport: () => {
    return `
        SELECT ap.costo, ap.observaciones, ap.fecha_solicitud as "Solicitado el", us.nombre||', '||us.apellidos AS "Asignado por", tp.nombre as "Tipo Apoyo", tp.descripcion as "Descripción apoyo"
        FROM Apoyo_empleado AS ap
        INNER JOIN d_usuarios AS us
        ON ap.usuario = us.id_usuario
        INNER JOIN Tipo_apoyo as tp
        ON ap.tipo_apoyo = tp.id_tipoapoyo
    `;
  },
  getListEmployeeSupport: employeeId => {
    if (!Number.isInteger(parseInt(employeeId))) {
      console.log(employeeId, "  ==> No es un ID valido!");
      return;
    }
    return `
        SELECT ap.costo, ap.observaciones, ap.fecha_solicitud as "Solicitado el", us.nombre||', '||us.apellidos AS "Asignado por", tp.nombre as "Tipo Apoyo", tp.descripcion
        FROM Apoyo_empleado AS ap
        INNER JOIN d_usuarios AS us
        ON ap.usuario = us.id_usuario
        INNER JOIN Tipo_apoyo as tp
        ON ap.tipo_apoyo = tp.id_tipoapoyo
        WHERE ap.empleado = ${employeeId}
    `;
  }
};

module.exports = apoyo_empleado;
