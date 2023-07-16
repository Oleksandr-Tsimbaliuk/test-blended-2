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

module.exports = {
  createFile,
};
