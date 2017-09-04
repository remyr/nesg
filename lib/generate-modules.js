const chalk = require('chalk');
const path = require('path');
const rimraf = require('rimraf');
const { createFolderIfNotExist } = require('./utils');

const generateModels = require('./generate-models');
const generateControllers = require('./generate-controllers');
const generateRoutes = require('./generate-routes');
const generateIndexRoutes = require('./generate-index-routes');

console.time('Generation done in: ');
const root = process.cwd();

function generateModules(options) {
  try {
    /* Get modules.json file and throw exception if file do not exist */
    const config = require(path.join(root, 'modules.json'));
    const rootModulesFolder = path.join(root, config.modulesPath);

    /*
     * Delete modules folder if we choose to regenerate all modules and overwrite option is True
     * Command: nesg --modules --overwrite
     */
    if (options.modules && options.overwrite) {
      console.log(chalk.green('Deleting modules folder...'));
      rimraf.sync(rootModulesFolder);
      createFolderIfNotExist(rootModulesFolder);
    } else {
      createFolderIfNotExist(rootModulesFolder);
    }

    config.modules.forEach(module => {

      /* Generate structure for the module */
      const modulePath = path.join(rootModulesFolder, module.name);
      createFolderIfNotExist(modulePath);

      /* Models generation */
      if (options.modules || options.models) {
        console.log(chalk.green(`Generating models files for module ${module.name}...`));
        const modelsDirPath = path.join(modulePath, 'models');
        createFolderIfNotExist(modelsDirPath);
        generateModels(module.models, modelsDirPath, options.overwrite);
      }

      /* Controllers generation */
      if (options.modules || options.controllers) {
        console.log(chalk.green(`Generating controllers files for module ${module.name}...`));
        const controllersDirPath = path.join(modulePath, 'controllers');
        createFolderIfNotExist(controllersDirPath);
        generateControllers(module.models, controllersDirPath, options.overwrite)
      }

      /* Routes generation */
      if (options.modules || options.routes) {
        console.log(chalk.green(`Generating routes files for module ${module.name}...`));
        const routesDirPath = path.join(modulePath, 'routes');
        createFolderIfNotExist(routesDirPath);
        generateRoutes(module.models, routesDirPath, options.overwrite)
      }
    });

    /* Generate index routes file for all modules */
    if (options.modules || options.routes) {
      console.log(chalk.green('Generating index routes...'));
      generateIndexRoutes(config.modules, rootModulesFolder, options.overwrite)
    }

    chalk.green(console.timeEnd('Generation done in: '))
  } catch (e) {
    console.log('No modules.json file found');
    console.log(e);
  }
}

exports.generateModules = generateModules;
