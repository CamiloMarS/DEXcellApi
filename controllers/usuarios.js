const query = require("../querys/index.js");
const usuarios = require("../querys/usuarios.js");
const { connToDB, disconnectDB } = require("../conection");

//Obtener lista de usuarios
function getUserList(req, resp) {
  let sql = usuarios.getUserList();
  query(sql, req, resp).then(result => {
    if (result.length > 0) {
      const list = result.map(user => {
        const { Id, name, lastname, active, rol } = user;
        return {
          id: Id,
          fullname: `${name} ${lastname}`,
          active,
          role: rol
        };
      });
      resp.status(200).send(list);
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
  let sql = usuarios.getUser(userId);
  query(sql, req, resp).then(user => {
    const { Id, name, lastname, active, rol } = user[0];
    resp.status(200).send({
      id: Id,
      fullname: `${name} ${lastname}`,
      active,
      rol
    });
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
