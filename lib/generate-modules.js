const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const {
  createFolderIfNotExist,
  generateTemplate,
  createFileIfNotExist
} = require('./utils');

const root = process.cwd();

function generateModules(overwrite) {
  try {
    const config = require(path.join(root, 'modules.json'));

    const rootModulesFolder = path.join(root, config.modulesPath);

    if (overwrite) {
      rimraf.sync(rootModulesFolder);
      console.log('DELETE MODULES FOLDER');
      createFolderIfNotExist(rootModulesFolder);
    } else {
      createFolderIfNotExist(rootModulesFolder);
    }

    const routesFromModels = [];

    // CREATE MODULE WITH CONTROLLERS, MODELS, ROUTES
    config.modules.forEach(module => {
      const modulePath = path.join(rootModulesFolder, module.name);
      const controllersDirPath = path.join(modulePath, 'controllers');
      const modelsDirPath = path.join(modulePath, 'models');
      const routesDirPath = path.join(modulePath, 'routes');

      // CREATE MODULE FOLDER IF DON'T EXIST
      createFolderIfNotExist(modulePath);
      // CREATE FOLDER FOR CONTROLLERS
      createFolderIfNotExist(controllersDirPath);
      // CREATE FOLDER FOR MODELS
      createFolderIfNotExist(modelsDirPath);
      // CREATE FOLDER FOR ROUTES
      createFolderIfNotExist(routesDirPath);

      module.models.forEach(model => {
        const modelFilePath = path.join(
          modelsDirPath,
          `${model.name.toLowerCase()}.model.js`
        );
        const controllerFilePath = path.join(
          controllersDirPath,
          `${model.name.toLowerCase()}.controller.js`
        );
        const routeFilePath = path.join(
          routesDirPath,
          `${model.name.toLowerCase()}.routes.js`
        );

        // CREATE ENTRY IN ROOT ROUTER
        if (model.crud) {
          routesFromModels.push({
            url: model.url,
            name: model.name,
            module: module.name
          });
        }

        // CREATE MODELS
        generateTemplate('model', { modelName: model.name })
          .then(template => {
            if (overwrite) {
              fs.writeFileSync(modelFilePath, template);
            } else {
              createFileIfNotExist(modelFilePath, template);
            }
          })
          .catch(err => console.log(err));

        // CREATE CONTROLLERS
        if (model.crud) {
          generateTemplate('controller', {
            modelName: model.name,
            crud: model.crud
          })
            .then(template => {
              if (overwrite) {
                fs.writeFileSync(controllerFilePath, template);
              } else {
                createFileIfNotExist(controllerFilePath, template);
              }
            })
            .catch(err => console.log(err));
        }

        // CREATE ROUTES
        if (model.crud) {
          generateTemplate('route', { modelName: model.name, crud: model.crud })
            .then(template => {
              if (overwrite) {
                fs.writeFileSync(routeFilePath, template);
              } else {
                createFileIfNotExist(routeFilePath, template);
              }
            })
            .catch(err => console.log(err));
        }
      });
    });

    // CREATE ROUTES FOR EACH MODULES
    generateTemplate('routeIndex', { routes: routesFromModels })
      .then(template => {
        fs.writeFileSync(path.join(rootModulesFolder, 'index.js'), template);
      })
      .catch(err => console.log(err));
  } catch (e) {
    console.log('No modules.json file found');
    console.log(e);
  }
}

exports.generateModules = generateModules;
