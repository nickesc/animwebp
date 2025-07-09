#!/usr/bin/env NODE_OPTIONS=--no-warnings node

import { Command } from 'commander';
import * as webp from "webp-converter";
import * as fs from "fs";
import { LIB_VERSION } from './version.ts';

webp.grant_permission();

const program: Command = new Command();

/**
 * Covert a sequence of images to an animated `.webp` file.
 *
 * @param {string[]} input - a list of paths to image files
 * @param {string} output - output path to the new animated webp file
 * @param {number} [frameDelay=1000] - delay between frames, in milliseconds (default: 1000)
 * @param {number} [quality=100] - quality level, higher values result in better quality; 0-100 (default: 100)
 * @param {number|undefined} [width] - frame width of the animated webp
 * @param {number|undefined} [height] - frame height of the animated webp
 * @returns {Promise<string>} a `Promise` that resolves to the path of the animated webp file
 */
export async function animate_webp(input: string[], output: string, frameDelay: number = 1000, quality: number = 100, width?: number, height?: number): Promise<string>{

    console.log(`input files:`,input)
    console.log(`frame delay: ${frameDelay}, width: ${width}, height: ${height}, quality: ${quality}`)
    //console.log(`output: ${output}\n\n${"—".repeat(process.stdout.columns)}\n`)
    console.log(`output: ${output}\n`)
    console.log(`generating ${input.length} frames...`)

    let resize: string = "";
    if (width || height) {
        resize = `-resize ${height || 0} ${width || 0}`
    }

    var dir: string = './frames';

    let imgs: object[] = []

    for (let index: number=0; index<input.length; index++){
        let file: string = input[index] || "";
        let temp_file: string = `${dir}/${index}.webp`

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
    console.log(`\ncreating animation...`)

    const animation: Promise<any> = webp.webpmux_animate(imgs, output, 0, "255,255,255,0","")
    await animation.then((response) => {console.log(response);});

    if (fs.existsSync(output)){
        console.log(`successfully created animated ${output} file`)
        return output;
    } else {
        throw new Error(`failed to create animated ${output} file`)
    }
}

program
  .name("awebp")
  .description("Convert a sequence of images to an animated WebP")
  .argument("<files...>", "a list of paths to image files (ex.: use *.png to select all png files)")
  .requiredOption("-o, --output <path>", "required; output path to the new animated webp file")
  .option("-f, --frame-delay <number>", "delay between frames, in milliseconds", "1000")
  .option("-q, --quality <number>", "quality level, higher values result in better quality; 0-100", "100")
  .option("-w, --width <number>", "frame width of the animated webp")
  .option("-h, --height <number>", "frame height of the animated webp")
  .option("--quiet", "execute without logging")
  .version(LIB_VERSION)
  .action((files, options) => {
    if (options.quiet) {
        console.log = function() {}
        console.warn = function() {}
        console.error = function() {}
    }
    animate_webp(files, options.output, options.frameDelay, options.quality, options.width, options.height);
  });

program.parse();
