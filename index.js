// index.js

const { createFile } = require("./files.js");

const argv = require("yargs").argv;

// TODO: рефакторити
function invokeAction({ action,  fileName, content }) {
  switch ((action)) {
    case "create":
      createFile(fileName, content);
      break;

    case "":
      break;

    case "":
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
