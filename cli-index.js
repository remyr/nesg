#!/usr/bin/env node

const program = require('commander');
const { generateModules } = require('./lib/generate-modules');

program
  .version('0.1')
  .option('modules', 'Generate module from a modules.json file')
  .option('--overwrite', 'Overwrite modules folder (delete all files)')
  .parse(process.argv);

if (program.modules) {
  const overwrite = program.overwrite !== undefined;
  generateModules(overwrite);
}
