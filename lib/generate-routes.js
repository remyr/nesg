const path = require('path');
const fs = require('fs');

const { generateTemplate, createFileIfNotExist } = require('./utils');

module.exports = function (models, directoryPath, overwrite) {
  models.forEach((model) => {
    const filePath = path.join(
      directoryPath,
      `${model.name.toLowerCase()}.routes.js`
    );

    if (model.crud) {
      generateTemplate('route', { modelName: model.name, crud: model.crud })
        .then(template => {
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