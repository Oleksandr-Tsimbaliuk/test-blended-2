const express = require("express");
const morgan = require("morgan");
const router = require("./router");

const add = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/files", router);

app.listen(3000, () => {
  console.log("Server is ready");
});
