//const { program } = require('commander');
//const pkgjson = require('../package.json');

import { program } from 'commander';
import pkgjson from '../package.json' with { type: "json" };

function generate_install(){
    console.log(
`Install \`${pkgjson.name}\` via \`npm\`:

\`\`\`sh
npm install ${pkgjson.name}
\`\`\``
    );
}
function generate_about(){
    console.log(pkgjson.description);
}
function generate_license(){
    console.log(
`\`${pkgjson.name}\` is released under the **${pkgjson.license}** license. For more information, see the repository's [LICENSE](/LICENSE) file.`);
}

program
 .command('install')
 .action(() => {
    generate_install();
 });

program
 .command('license')
 .action(() => {
    generate_license();
 });

program
 .command('about')
 .action(() => {
    generate_about();
 });

program.parse();
