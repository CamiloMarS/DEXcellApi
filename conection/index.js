(function settingsDB() {
  "use strict";

  const { Client } = require("pg");

  /**
   * Datos de conexión
   */
  const config = {
    host: "localhost",
    user: "postgres",
    database: "DExcellBD",
    password: "postgresCam",
    port: "5432"
  };

  /**
   * Conectar la base de datos
   */
  const connToDB = () => {
    let client = new Client(config);
    client.connect();
    return client;
  };

  /**
   * Desconectar la base de datps
   * @param {*} client
   */

  const disconnectDB = client => {
    if (client !== null) {
      client.end();
    }
  };

  module.exports = { connToDB, disconnectDB };
})();
