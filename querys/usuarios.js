const usuarios = {
  getUserList: () => {
    return `
        SELECT u.id_usuario as "Id", u.nombre as "name", u.apellidos as "lastname", u.foto as "avatar", u.active, u.rol
        FROM d_usuarios as u;
    `;
  },
  getUser: idUser => {
    return !Number.isInteger(parseInt(idUser))
      ? null
      : `
    SELECT u.id_usuario as "Id", u.nombre as "name", u.apellidos as "lastname", u.active, u.rol
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
  getUserRol: (nameUser, lastNameUser) => {
    if (nameUser.length > 0 && lastNameUser.length > 0) {
      return `
        SELECT id_usuario as "id" ,nombre as "name", apellidos as "lastname", rol as "role"
        FROM d_usuarios
        WHERE nombre LIKE '%${nameUser}%' OR apellidos LIKE '%${lastNameUser}%' AND active = true;   
      `;
    }
  },
  updateTokenUser: (idUser, token) => {
    if (token.length > 0 && idUser !== null) {
      return `
          UPDATE d_usuarios
          SET token_google = '${token}'
          WHERE id_usuario = ${idUser};      
      `;
    }
  }
};

module.exports = usuarios;
