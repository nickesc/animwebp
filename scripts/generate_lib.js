//const { program } = require('commander');
//const fs = require("fs");
//const pkgjson = require('../package.json');

import { program } from 'commander';
import pkgjson from '../package.json' with { type: "json" };
import { writeFileSync } from 'fs';

function generate_lib() {
    const lib_string =
`export const LIB_VERSION: string = ${JSON.stringify(pkgjson.version)};
export const LIB_NAME: string = ${JSON.stringify(pkgjson.name)};
export const LIB_DESCRIPTION: string = ${JSON.stringify(pkgjson.description)};
export const LIB_LICENSE: string = ${JSON.stringify(pkgjson.license)};`;
    writeFileSync("src/lib.ts", lib_string)
}

program
 .action(() => {
    generate_lib();
 });

program.parse();
