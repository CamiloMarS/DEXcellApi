// const query = require("../querys/index");
// const { getUserRol } = require("../querys/usuarios");
const jwt = require("jsonwebtoken");

//Esta funcion crea el TOKEN para el usuario
const postLogin = (req, resp) => {
  const { nombre, id } = req.body.usuario;
  const token = jwt.sign({ nombre, id }, "my_secret_key");
  resp.json({ token });
};

module.exports = {
  postLogin
};
