const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "html", "css", "js", "json"];

  const extension = fileName.split(".").pop();
  const result = EXTENSIONS.includes(extension);

  return { extension, result };
};

module.exports = checkExtension;
