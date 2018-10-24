const query = require("../querys/index.js");
const certifications = require("../querys/certificaciones.js");

//Obtener la lista de certificaciones
function getCertificationsList(req, resp) {
  query(certifications.getListCertifications(), req, resp).then(cert => {
    if (cert.length > 0) {
      const list = cert.map(current => {
        const {
          id_certificacion,
          organismo,
          certificacion,
          costo_examen,
          apoyo_examen,
          bono_certificacion,
          link_validacion
        } = current;

        return {
          id: id_certificacion
        };
      });
      resp.status(200).send(list);
    }
  });
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
