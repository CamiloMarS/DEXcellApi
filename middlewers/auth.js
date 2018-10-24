"use strict";
const jwt = require("jsonwebtoken");
const { seed } = require("../middlewers/config");

/*============= Autentificación =============*/
//FUNCION QUE CREA EL TOKEN

//FUNCION, VALIDAD SI EL TOKEN ENVIADO ES IGUAL AL QUE TENGO COMO CLIENTE
const validToken = (req, resp, next) => {
  //Recuperar el token
  let token = req.headers["authorization"];

  if (!token) {
    resp.status(401).send({ status: 401, message: "Se necesita un token!" });
    return;
  }
  //Validarlo
  jwt.verify(token, seed, (err, data) => {
    if (err) {
      resp.status(403).send({ status: 403, message: err }); //Token no valido
      return;
    }
    //Continuar, todo bien
    const { role } = data;
    if (role === "ADMIN") {
      next();
    }
  });
};

module.exports = {
  validToken
};
