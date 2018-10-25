const query = require("../querys");
const typesSupport = require("../querys/tiposApoyo"); //sql
const apoyo_empleado = require("../querys/apoyoEmpleado");
const moment = require("moment");
const { getEmployee } = require("../querys/empleados");

const validateEmployeeBalance = async (
  idEmployee,
  cost,
  typeSupport,
  request,
  response
) => {
  /**
   *  0.- Validar que el empleado este activo
   *  1.- Validar que el saldo del empleado este vigente,
   *  2.- Validar que el empleado tenga saldo suficiente,
   *  3.- Validar que el empleado este activo
   *
   */
  let validBalance = false;

  //Formar la cadena SQL
  let sql;
  const columns = { column1: "", column2: "" };
  if (typeSupport !== "Inglés") {
    columns.column1 = "saldo_ingles";
    columns.column2 = "vigencia_saldo_idioma";
    sql = getEmployee(idEmployee, columns.column1, columns.column2);
  } else {
    columns.column1 = "saldo_informacion";
    columns.column2 = "vigencia_saldo_formacion";
    sql = getEmployee(idEmployee, columns.column1, columns.column2);
  }

  //Obtener los datos del empleado
  async function consultaPrueba() {
    const employee = await query(sql, request, response);
    return await employee;
  }
  const { activo, ...params } = (employee = await consultaPrueba())[0]; //Datos del empleado
  const balance = params.saldo;
  const vialidity = params.vigencia.toLocaleDateString("en-US").toString();

  /** Validar vigencia del saldo del empleado */
  const currentEmployeeBalance = () => {
    const dateNow = moment().format("DD-MM-YYYY");
    d = vialidity.split("/");
    const correctFormatDate = `${d[0]}-${d[1]}-${d[2]}`;
    console.log(balance);
  };

  currentEmployeeBalance();
};

const _registerCertification = (dataCertification, typeSupport, req, resp) => {
  const { employeeId, numberFormat } = dataCertification;
  validateEmployeeBalance(employeeId, numberFormat, typeSupport, req, resp);
};

const insertSupportEmployee = (req, response) => {
  const data = req.body.support;
  if (typeof data === "object" && Object.keys(data).length > 0) {
    const { supportType } = data;
    let sql = typesSupport.getTypeSupport(supportType);

    //Obtener el nombre de tipo de apoyo a registrar
    query(sql, req, response).then(result => {
      const { nombre } = result[0];

      if (nombre === "Certificación") {
        _registerCertification(data, nombre, req, response);
      } else {
        //Registrar curso, evento, ingles
        let sqlInsert_apoyo = apoyo_empleado.insert_support(data);
        query(sqlInsert_apoyo, req, response).then(insert => {
          response
            .status(200)
            .send({ status: 200, message: "Apoyo registrado existosamente!" });
        });
      }
    });
  }
};

module.exports = {
  insertSupportEmployee
};
