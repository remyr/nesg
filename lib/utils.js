const fs = require('fs');
const touch = require('touch');
const path = require('path');
const twig = require('twig');

exports.createFolderIfNotExist = folderPath => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  } else {
    console.log('Folder already exist', folderPath);
  }
};

exports.createFileIfNotExist = (filePath, data) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data);
  }
};

exports.generateTemplate = (templateName, data) =>
  new Promise((resolve, reject) => {
    twig.renderFile(
      path.join(__dirname, '..', 'templates', `${templateName}.template.twig`),
      data,
      (err, template) => {
        if (err) {
          reject(err);
        } else {
          resolve(template);
        }
      }
    );
  });
