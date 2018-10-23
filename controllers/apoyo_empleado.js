const insertSupportEmployee = (req, response) => {
  const data = req.body;
  console.log(data);
  response.status(200).send({ message: "Aqui se hará insercción!" });
};

module.exports = {
  insertSupportEmployee
};
