const query = require("../querys/index.js");
const usuarios = require("../querys/usuarios.js");

//Obtener lista de usuarios
function getUserList(req, resp) {
  query(usuarios.getUserList(), req, resp);
}

//Obtener a un usuario
function getUser(req, resp) {
  let userId = parseInt(req.params.userId);
  if (!Number.isInteger(userId)) {
    resp.status(400).send({ status: 400, message: "Id no valido!." });
    return;
  }
  query(usuarios.getUser(userId), req, resp);
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
