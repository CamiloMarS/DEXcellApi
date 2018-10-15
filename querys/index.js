const { connToDB, disconnectDB } = require("../conection"); //Metodos de conexion con la bd

function query(sql, request, response) {
  let conn = connToDB(); //conexion

  conn.query(sql, (err, result) => {
    //Existe un error
    if (err) {
      //enviar el error y salir
      response
        .status(500)
        .send({ code: 500, message: "Error al consultar" + err });
      return;
    }

    //La consulta no tiene datos
    result.rowCount > 0
      ? response.status(200).send(result.rows)
      : response.status(404).send({ status: 404, message: "No Data" });

    disconnectDB(conn); //desconecta de session
  });
  return;
} //end function

module.exports = query;
