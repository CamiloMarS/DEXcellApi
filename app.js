const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const router = require("./routes/empleados.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(router);

app.listen(1908, () => {
  console.log("Node Server  running on http://localhost:1908");
});
