const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const createFile = async ({ fileName, content }) => {
  const filePath = path.join(__dirname, "./files", fileName);
  await fs.writeFile(filePath, content, "utf8");
};

const getFiles = async () => {
  const result = await fs.readdir(path.join(__dirname, "files"));
  return result;
};

const getInfo = async (fileName) => {
  try {
    const currentFile = await fs.readFile(
      path.join(__dirname, "files", fileName),
      "utf8"
    );
    const extension = path.extname(fileName);
    const name = path.basename(
      path.join(__dirname, "files", fileName),
      extension
    );

    return {
      name,
      extension: extension.slice(1),
      content: currentFile,
    };
  } catch {
    error;
  }
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
