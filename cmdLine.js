#!/usr/bin/env node

const args = require('minimist')(
    process.argv.slice(2),
    {
        boolean: ['help'],
        string: ['file']
    }
)

import getStdin from "get-stdin";

/*
*   ⬆ telling the env to find node and use it to interpret this file
*   type 'type env' in cmd to find where the env is, it shows '/usr/bin/env'
* */

'use strict'

/*
*   SETTING COMMAND LINE SCRIPT
*
*   'ls -la' to list the file permission list of current directory
*   if filename.js has 'x' in it, it means it is executable
*   if not, use 'chmod u+x filename.js' (change mod user + executable filename) to make it executable
*
*   if the file is executable, instead of saying 'node filename.js',
*   we can say './filename.js'
* */

//  ------------------------ COMMAND LINE ARGUMENTS ----------------
// *   used minimist
// *   setup options arguments along with process.argv.slice(2)
// *   why slice?, to remove env and directory to current path
// *   the rest are user input values
// *   caught it with minimist and set options to overwrite the type like boolean

function printHelp() {
    console.log("ex1 usage:");
    console.log("");
    console.log("--help                      print this help");
    console.log("-, --in                     read file from stdin");
    console.log("--file={FILENAME}           read file from {FILENAME}");
    console.log("");
    console.log("");
}

function error(err,showHelp = false) {
    process.exitCode = 1;
    console.error(err);
    if (showHelp) {
        console.log("");
        printHelp();
    }
}

function processFile(text) {
    text = text.toUpperCase();
    process.stdout.write(text);
}
