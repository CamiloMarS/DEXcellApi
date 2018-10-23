const query = require("../querys/index.js");
const usuarios = require("../querys/usuarios.js");
const { connToDB, disconnectDB } = require("../conection");

//Obtener lista de usuarios
function getUserList(req, resp) {
  let conn = connToDB();
  let sql = usuarios.getUserList();

  conn.query(sql, (err, result) => {
    if (err) {
      resp.status(500).send({
        status: 500,
        message: err
      });

      disconnectDB(conn);
      return;
    }

    if (result.rowCount > 0) {
      disconnectDB(conn);
      resp.status(200).send(result.rows);
    } else {
      disconnectDB(conn);

      resp.status(404).send({
        status: 404,
        message: `Usuario no encontrado!`
      });
    }
  });
}

//Obtener a un usuario
function getUser(req, resp) {
  let userId = parseInt(req.params.userId);
  if (!Number.isInteger(userId)) {
    resp.status(400).send({ status: 400, message: "Id no valido!." });
    return;
  }
  //Realizar la consulta
  let conn = connToDB();
  let sql = usuarios.getUser(userId);

  conn.query(sql, (err, result) => {
    if (err) {
      resp.status(500).send({
        status: 500,
        message: err
      });
      disconnectDB(conn);
      return;
    }

    if (result.rowCount > 0) {
      disconnectDB(conn);
      resp.status(200).send(result.rows);
    } else {
      disconnectDB(conn);

      resp.status(404).send({
        status: 404,
        message: `Usuario no encontrado!`
      });
    }
  });
}

//Insertar a un nuevo usuario
function insertNewUser(req, resp) {
  let dataUser = req.body;
  let sql = usuarios.insertNewUser(dataUser);
  if (!sql) {
    query(sql, req, resp);
  }
}

//Eliminar a un usuario
function deleteUser(idUser, req, resp) {
  if (idUser !== null) {
    let sql = usuarios.deleteUser(idUser);
    query(sql, req, resp);
  }
}

module.exports = {
  getUserList,
  getUser,
  insertNewUser,
  deleteUser
};
