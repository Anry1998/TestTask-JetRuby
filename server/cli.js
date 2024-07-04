#!/usr/bin/env node

const program = require('commander');
const {updateRepositories, getAllRepositories, searchRepositoriesAndSaveBD, commandSey} = require('./controllers/repositories-controller')

// const commandSey = () => {
//     console.log('Hello, World!');
// };

program.version('0.0.1')

program
    .command('say')
    .description('say Hello, World!')
    .alias('s')
    .action(commandSey)

program.parse(process.argv);