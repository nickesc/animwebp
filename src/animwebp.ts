#!/usr/bin/env NODE_OPTIONS=--no-warnings node

import { Command } from 'commander';
import { LIB_VERSION } from './version.ts';
import { animate_webp } from './animate_webp.ts';

const program: Command = new Command();

program
  .name("animwebp")
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
