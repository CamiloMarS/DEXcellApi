const jwt = require("jsonwebtoken");
const { seed, cadTok } = require("../middlewers/config.js");
//Acciones BD
const { connToDB, disconnectDB } = require("../conection");
const usuarios = require("../querys/usuarios.js");

//Esta funcion crea el TOKEN para el usuario
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
      console.log(error);
      resp.sendStatus(500);
      return;
    }

    //Consulta si errores
    const userExists = result.rowCount;
    if (userExists > 0) {
      const foundUser = result.rows;
      const { id, name, lastname, role } = foundUser[0]; //Siempre, solo adminit el primero

      //Verificar que el usuario sea ADMIN
      if (role !== "ADMIN") {
        resp.sendStatus(403);
        return;
      }
      //Seguri, el usuario es ADMIN
      console.log("Generando token...");
      const token = jwt.sign({ id, role, name, lastname }, seed, {
        expiresIn: cadTok
      });
      //Actualizar token en la bd
      conn.query(usuarios.updateTokenUser(id, token), (fail, success) => {
        if (fail) {
          resp.sendStatus(500);
          return;
        } //No se actualizó en la bd
        console.log(success);
        resp.json({ token });
      });
    } else {
      //El usuario no existe
      console.log("Usuario no existente");
      resp.sendStatus(404);
    }

    //Cerrar la conexion con la db
    disconnectDB(conn);
  });
};

module.exports = {
  assignToken
};
