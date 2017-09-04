const path = require('path');
const fs = require('fs');

const { generateTemplate, createFileIfNotExist } = require('./utils');

module.exports = function (models, directoryPath, overwrite) {
  models.forEach((model) => {
    const filePath = path.join(
      directoryPath,
      `${model.name.toLowerCase()}.controller.js`
    );

    if (model.crud) {
      generateTemplate('controller', {
        modelName: model.name,
        crud: model.crud
      }).then(template => {
          if (overwrite) {
            fs.writeFileSync(filePath, template);
          } else {
            createFileIfNotExist(filePath, template);
          }
        })
        .catch(err => console.log(err));
    }
  })
};