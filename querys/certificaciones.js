const certifications = {
  getListCertifications: () => {
    return `  SELECT *
       FROM catalogo_certificaciones            
    `;
  },
  getCertification: idCertification => {
    let id = parseInt(idCertification);
    return !Number.isInteger(id)
      ? null
      : `
        SELECT *
        FROM catalogo_certificaciones
        WHERE id_certificacion = ${id}
       `;
  },
  insertCertification: dataCertification => {
    if (Object.keys(dataCertification).length <= 0) {
      console.log("No se puede agregar la certificación! ");
      return;
    }
    return `
        INSERT INTO catalogo_certificaciones (organismo, certificacion, costo_examen, apoyo_examen, bono_certificacion, link_validacion)
        VALUES ('w3school', 'JavaScript', 95, true, true, '');
    `;
  }
};

module.exports = certifications;
