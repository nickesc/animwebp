import { program } from 'commander';
import pkgjson from '../package.json' with { type: "json" };

class DocStrings {

    static install=
`Install \`${pkgjson.name}\` via \`npm\`.

To install \`${pkgjson.name}\` as a library in a JavaScript or TypeScript project:
\`\`\`sh
npm install ${pkgjson.name}
\`\`\`

To install \`${pkgjson.name}\` globally, for use as a CLI tool:
\`\`\`sh
npm install -g ${pkgjson.name}
\`\`\``

    static about=
`${pkgjson.description}`

    static license=
`\`${pkgjson.name}\` is released under the **${pkgjson.license}** license. For more information, see the repository's [LICENSE](/LICENSE) file.`
}

program
 .command('about')
 .action(() => {
    console.log(DocStrings.about);
 });

program
 .command('install')
 .action(() => {
    console.log(DocStrings.install);
 });

program
 .command('license')
 .action(() => {
    console.log(DocStrings.license);
 });

program.parse();
