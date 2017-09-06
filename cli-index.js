#!/usr/bin/env node

const program = require('commander');
const { generateModules } = require('./lib/generate-modules');

program
  .version('0.4.0')
  .option('generate', '[options] Command to generate files')
  .option('--modules', 'Generate all files for modules defined in modules.json file')
  .option('--models', 'Create only models files')
  .option('--controllers', 'Create only controllers files')
  .option('--routes', 'Create only routes files')
  .option('--overwrite', 'Overwrite modules folder (delete all files)')
  .parse(process.argv);

const options = {
  modules: program.modules !== undefined,
  models: program.models !== undefined,
  controllers: program.controllers !== undefined,
  routes: program.routes !== undefined,
  overwrite: program.overwrite !== undefined
};
if (program.generate) {
  generateModules(options);
}
