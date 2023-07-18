const express = require("express");
const morgan = require("morgan");
const router = require("./router");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/files", router);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is ready");
});
