#!/usr/bin/env node

import { Command } from 'commander';
import * as webp from "webp-converter";
import * as fs from "fs";
import * as process from 'process';

process.removeAllListeners('warning');
webp.grant_permission();

const program = new Command();

// This is used as an example in the README for the Quick Start.

/**s
 * @param {string[]} input
 * @param {string} output
 * @param {number} frameDelay
 * @param {number} quality
 * @param {number} width
 * @param {number} height
 */
async function animate_webp(input, output, frameDelay, quality, width=null, height=null){

    console.log(`-awebp options-`)
    console.log(`input files:`,input)
    console.log(`frame delay: ${frameDelay}, width: ${width}, height: ${height}, quality: ${quality}`)
    console.log(`output: ${output}\n\n${"—".repeat(process.stdout.columns)}\n`)

    let resize = "";
    if (width || height) {
        resize = `-resize ${height | 0} ${width | 0}`
    }
    //input = Array.from(input)

    var dir = './frames';

    //let index=0
    let imgs = []

    for (let index=0; index<input.length; index++){
        let file = input[index];
        let temp_file = `${dir}/${index}.webp`

        if (fs.existsSync(file)){
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            await webp.cwebp(file, temp_file,`-q ${quality} ${resize}`)
            .then(() => {
                if (fs.existsSync(temp_file)){
                    imgs.push({
                        "path":temp_file,
                        "offset":`+${frameDelay}`
                    });
                } else {
                    throw new Error(`error converting ${file}`)
                }
            });
        } else {
            throw new Error(`${file} does not exist`)
        }
    }

    console.log("temp frames:", imgs)

    const animation = webp.webpmux_animate(imgs, `${output}`, 0, "255,255,255,0","")
    animation.then((response) => {console.log(response);});
}

program
  .name('awebp')
  .description('convert a set of images to an animated webp')
  .version('0.0.1')
  .argument('<files...>', 'images to animate')
  .option('-f, --frame-delay <number>', 'time delay between each frame in milliseconds; default is 1000', 1000)
  .option('-w, --width <number>', 'frame width of the webp')
  .option('-h, --height <number>', 'frame height of the webp')
  .option('-q, --quality <number>', 'quality level (compression), higher is better; 0-100, default is 100', 100)
  .requiredOption('-o, --output <path>', 'output .webp file for the animation')
  .action((files, options) => {
    animate_webp(files, options.output, options.frameDelay, options.quality, options.width, options.height)
  });


program.parse();

// Try the following:
//    node string-util
//    node string-util help split
//    node string-util split --separator=/ a/b/c
//    node string-util split --first a,b,c
//    node string-util join a b c d
