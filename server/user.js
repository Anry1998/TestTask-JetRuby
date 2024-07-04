#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

const {getAllRepositories} = require('./controllers/repositories-controller')


program
  .version('0.0.1')
  .description('User management system');

program
  .command('getAllUser')
  .alias('r')
  .description('Get All User')
  .action(getAllRepositories());


// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
  }
  program.parse(process.argv);