const { program } = require('commander');
const fs = require("fs");
const pkgjson = require('../package.json');



function generate_lib(){
    const lib_string =
`export const LIB_VERSION = ${JSON.stringify(pkgjson.version)};
export const LIB_NAME = ${JSON.stringify(pkgjson.name)};
export const LIB_DESCRIPTION = ${JSON.stringify(pkgjson.description)};
export const LIB_LICENSE = ${JSON.stringify(pkgjson.license)};`;
    fs.writeFileSync("src/lib.ts", lib_string)
}

program
 .action(() => {
    generate_lib();
 });

program.parse();
