const jwt = require("jsonwebtoken");
const { seed, cadTok } = require("../middlewers/config.js");
const { connToDB, disconnectDB } = require("../conection"); //Acciones de la bd
const usuarios = require("../querys/usuarios.js");

/**
 *
 * @param {*} req
 * @param {*} resp
 * Esta funcion asigna un token al usuario que se este logueando, siempre y cuando
 * exista en la base de datos
 */
const assignToken = (req, resp) => {
  const { name, email, imageUrl } = req.body.user;

  // 1.- Buscar al usuario en la bd
  let conn = connToDB();
  const userData = { name: "", lastname: "" };
  const arrg = name.split(" ");
  switch (arrg.length) {
    case 2:
      userData.name = arrg[0];
      userData.lastname = arrg[1];
      break;
    default:
      userData.name = arrg[0];
      userData.lastname = arrg[arrg.length - 2] + " " + arrg[arrg.length - 1];
      break;
  }

  let sql = usuarios.getUserRol(userData.name, userData.lastname);

  conn.query(sql, (error, result) => {
    if (error) {
      resp.status(500).send({ status: 500, message: error });
      return;
    }

    //Consulta si errores
    const userExists = result.rowCount;
    if (userExists > 0) {
      const foundUser = result.rows;
      const { id, name, lastname, role } = foundUser[0]; //Siempre, solo adminit el primero

      //Verificar que el usuario sea ADMIN
      if (role !== "ADMIN") {
        resp
          .status(403)
          .send({ status: 403, message: "Usuario no autorizado!" });
        return;
      }

      //Seguri, el usuario es ADMIN
      const token = jwt.sign({ id, role, name, lastname }, seed, {
        expiresIn: cadTok
      });

      //Actualizar token en la bd
      conn.query(usuarios.updateTokenUser(id, token), (fail, success) => {
        if (fail) {
          resp.status(500).send({
            status: 500,
            message: "No se actualizo datos del usuario."
          });
          return;
        }

        resp.json({
          status: 200,
          currentUser: { id, fullname: `${name} ${lastname}` },
          token
        });

        //Cerrar la conexion con la db
        disconnectDB(conn);
      });
    } else {
      //El usuario no existe
      resp.status(404).send({ status: 404, message: "Usuario no existente!" });
    }
  });
};

module.exports = {
  assignToken
};
