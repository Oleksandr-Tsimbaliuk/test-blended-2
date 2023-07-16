const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };

  const result = dataValidator(file);
  if (result.error) {
    const { details } = result.error;
    console.log(chalk.red(`please specify ${details[0].path[0]} params`));
    return;
  }

  const resultCheckExtension = checkExtension(fileName);
  if (!resultCheckExtension.result) {
    console.log(
      chalk.red(`Sorry,  ${resultCheckExtension.extension} do not support`)
    );
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf8");
    console.log(chalk.blue(`File ${fileName} have created`));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  try {
    const result = await fs.readdir(path.join(__dirname, "files"));
    if (result.length === 0) {
      console.log(chalk.red(`This directory hasn't files`));
      return;
    }
    console.log(result);
  } catch {
    console.log(error);
  }
};

const getInfo = async (fileName) => {
  try {
    const result = await fs.readdir(path.join(__dirname, "files"));
    if (!result.includes(fileName)) {
      console.log(chalk.red(`File ${fileName} doesn't exist`));
      return;
    }
    const currentFile = await fs.readFile(
      path.join(__dirname, "files", fileName),
      "utf8"
    );
    const extension = path.extname(fileName);
    const name = path.basename(
      path.join(__dirname, "files", fileName),
      extension
    );

    return console.log({
      name,
      extension: extension.slice(1),
      content: currentFile,
    });
  } catch {
    error;
  }
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
