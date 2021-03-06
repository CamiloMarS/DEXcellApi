const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const router = require("./routes/index.js");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

//Encabezados
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*"); //Permitir todos los origenes
  resp.header(
    "Access-Control-Access-Methods",
    "GET, POST OPTIONS, PUT, PATCH, DELETE"
  );
  resp.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With",
    "Content-Type",
    "application/json",
    "Authorization"
  );
  resp.header("Access-Control-Allows-Credentials", true);
  next();
});

app.use("/api/dexcell", router);

app.listen(1908, () => {
  console.log("Node Server  running on http://localhost:1908");
});
