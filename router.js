const express = require("express");
const filesService = require("./files");
const HttpError = require("./helpers/HttpError");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await filesService.getFiles();
    if (result.length === 0) {
      throw HttpError(404, `This directory hasn't files`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const fileValidated = dataValidator(req.body);
    if (fileValidated.error) {
      const { details } = fileValidated.error;
      throw HttpError(400, `please specify ${details[0].path[0]} params`);
    }
    const fileCheckExtension = checkExtension(req.body.fileName);
    if (!fileCheckExtension.result) {
      throw HttpError(
        400,
        `Extension ${fileCheckExtension.extension} do not support`
      );
    }

    await filesService.createFile(req.body);
    res.status(201).json({ message: `File ${req.body.fileName} have created` });
  } catch (error) {
    next(error);
  }
});

router.get("/:fileName", async (req, res, next) => {
  try {
    const { fileName } = req.params;
    const dir = await filesService.getFiles();
    if (!dir.includes(fileName)) {
      throw HttpError(404, `File ${fileName} doesn't exist`);
    }
    const result = await filesService.getInfo(fileName);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
