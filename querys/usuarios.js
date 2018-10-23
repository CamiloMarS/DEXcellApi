const usuarios = {
  getUserList: () => {
    return `
        SELECT u.id_usuario as "Id", u.nombre as "name", u.apellidos as "lastname", u.foto as "avatar", u.active
        FROM d_usuarios as u;
    `;
  },
  getUser: idUser => {
    return !Number.isInteger(parseInt(idUser))
      ? null
      : `
    SELECT u.id_usuario as "Id", u.nombre as "name", u.apellidos as "lastname", u.foto as "avatar", u.active
    FROM d_usuarios as u
    WHERE u.id_usuario = ${idUser};`;
  },
  insertNewUser: dataUser => {
    if (Object.keys(dataUser).length < 0) {
      console.log("Nada que insertar!");
      return;
    }

    if (
      dataUser.hasOwnProperty("nombre") &&
      dataUser.hasOwnProperty("token_google")
    ) {
      let { nombre, apellidos, foto, active, token_google, rol } = dataUser;

      return `
        INSERT INTO d_usuarios (nombre, apellidos, foto, active, token_google, rol) values
        ('${nombre}', '${apellidos}', '${foto}', ${active}, '${token_google}', ${rol});    
    `;
    }
  },
  deleteUser: idUser => {
    return !Number.isInteger(parseInt(idUser))
      ? null
      : `DELETE 
        FROM d_usuarios as u
        WHERE u.id_usuario = ${idUser};`;
  },
  getUserRol: nameUser => {
    if (nameUser.length > 0) {
      return `
        SELECT rol  
        FROM d_usuarios
        WHERE nombre LIKE '%${nameUser}%' AND active = true;   
      `;
    }
  }
};

module.exports = usuarios;
