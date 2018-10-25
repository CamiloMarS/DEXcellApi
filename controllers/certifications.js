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
          id: id_certificacion,
          organism: organismo,
          certification: certificacion,
          examCost: costo_examen,
          examSupport: apoyo_examen,
          bonusCertification: bono_certificacion,
          linkValidation: link_validacion
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
  query(certifications.getCertification(idCertification), req, resp).then(
    result => {
      const {
        id_certificacion,
        organismo,
        certificacion,
        costo_examen,
        apoyo_examen,
        bono_certificacion,
        link_validacion
      } = result[0];

      resp.status(200).send({
        id: id_certificacion,
        organism: organismo,
        certification: certificacion,
        examCost: costo_examen,
        examSupport: apoyo_examen,
        bonusCertification: bono_certificacion,
        linkValidation: link_validacion
      });
    }
  );
}

function postCertification(req, resp) {
  const certification = req.body;
  console.log(certification);
}

module.exports = {
  getCertificationsList,
  getCertification,
  postCertification
};
