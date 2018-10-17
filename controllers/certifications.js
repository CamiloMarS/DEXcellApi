const query = require("../querys/index.js");
const certifications = require("../querys/certificaciones.js");

//Obtener la lista de certificaciones
function getCertificationsList(req, resp) {
  query(certifications.getListCertifications(), req, resp);
}

function getCertification(req, resp) {
  let idCertification = parseInt(req.params.idCertification);
  if (!Number.isInteger(idCertification)) {
    resp
      .status(400)
      .send({ status: 400, message: "Certification ID no valido!" });
    return;
  }
  query(certifications.getCertification(idCertification), req, resp);
}

module.exports = {
  getCertificationsList,
  getCertification
};
