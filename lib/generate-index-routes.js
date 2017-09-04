const path = require('path');
const fs = require('fs');

const { generateTemplate, createFileIfNotExist } = require('./utils');

module.exports = function (modules, rootModulesFolder, overwrite) {
  const routesFromModels = [];
  modules.forEach((module) => {
    module.models.forEach((model) => {
      if (model.crud) {
        routesFromModels.push({
          url: model.url,
          name: model.name,
          module: module.name
        });
      }
    })
  });
  generateTemplate('routeIndex', { routes: routesFromModels })
    .then(template => {
      if (overwrite) {
        fs.writeFileSync(path.join(rootModulesFolder, 'index.js'), template);
      } else {
        createFileIfNotExist(path.join(rootModulesFolder, 'index.js'), template);
      }
    })
    .catch(err => console.log(err));
};