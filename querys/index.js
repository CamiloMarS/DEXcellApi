const { connToDB, disconnectDB } = require("../conection"); //Metodos de conexion con la bd

const query = (sql, request, response) => {
  try {
    const conn = connToDB();

    return conn
      .query(sql)
      .then(result => {
        disconnectDB(conn); //Cerrar la conexion
        if (result.rowCount > 0) return result.rows;
        else
          response.status(404).send({ status: 404, message: "No encontrado!" });
      })
      .catch(err => {
        response
          .status(500)
          .send({ code: 500, message: "Error en la acción: " + err });
        return;
      });
  } catch (error) {
    console.log(error);
  }
}; //end function

module.exports = query;
//Swagger ---> swagger.io
//yaml
