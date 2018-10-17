const typesSupport = {
  getListTypeSupport: () => {
    return `
        SELECT id_tipoapoyo as "id", nombre as "name", saldo_asignado as "assignedBalance" 
        FROM Tipo_apoyo;
    `;
  },
  insertTypeSupport: dataTypeSupport => {
    if (Object.keys(dataTypeSupport).length <= 0) {
      console.log(dataTypeSupport, "==> no valido!");
      return;
    }
    const { nombre, descripcion, saldo_asignado } = dataTypeSupport;
    return `
        INSERT INTO Tipo_apoyo (nombre, descripcion, saldo_asignado) VALUES
        ('${nombre}','${descripcion}',${saldo_asignado});
    `;
  }
};

module.exports = typesSupport;
