"use strict";

//Dependencias

const jwt = require("jsonwebtoken");

/*============= Autentificación =============*/

//FUNCION, VALIDAD SI EL TOKEN ENVIADO ES IGUAL AL QUE TENGO COMO CLIENTE
const validToken = (req, resp, next) => {
  //Recuperar el token
  let token = req.get("Authorization");

  //Validarlo
  jwt.verify(token, "my_secret_key", (err, data) => {
    if (err) {
      //Token no valido
      resp.sendStatus(403);
      return;
    }
    //Continuar, todo bien
    req.usuario = decoded.usuario;
    next();
  });
};

// ESTA FUNCION RECIBE EL TOKEN DEL CLIENTE
const authentification = (req, resp, next) => {
  //Acceder la cabecera
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const portador = bearerHeader.split(" ");
    const bearerToken = portador[1];
    req.token = bearerToken;
    next();
  } else {
    //Enviar estatus de usuario no autorizado
    resp.sendStatus(403);
  }
};

module.exports = {
  validToken,
  authentification
};
