const express = require("express");
const morgan = require("morgan");
const router = require("./router");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/files", router);

app.listen(3000, () => {
  console.log("Server is ready");
});
