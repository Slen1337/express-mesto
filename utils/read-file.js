const fsPromises = require('fs').promises;

const readFiles = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf8' })
  .catch(() => {
    const fileError = { message: `file ${pathToFile} not found` };
    throw fileError;
  })
  .then((data) => {
    try {
      return JSON.parse(data);
    } catch (_) {
      const jsonError = { message: 'JSON file is not working' };
      throw jsonError;
    }
  });

module.exports = readFiles;
