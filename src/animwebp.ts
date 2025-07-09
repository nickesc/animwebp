#!/usr/bin/env NODE_OPTIONS=--no-warnings node

import { Command } from '@commander-js/extra-typings';
import { LIB_VERSION, LIB_NAME } from './lib.ts';
import { animate_webp } from './animate_webp.ts';

const program: Command = new Command();

program
  .name(LIB_NAME)
  .description("Convert a sequence of images to an animated WebP")
  .summary("create animated webp")
  .argument("<files...>", "list of paths to image files (ex.: use *.png to select all png files in a directory)")
  .optionsGroup("Options:")
  .requiredOption("-o, --output <path>", "required; output path to the new animated webp file")
  .optionsGroup("ANIMATION")
  .option("-f, --frame-delay <number>", "delay between frames, in milliseconds", "1000")
  .option("-q, --quality <number>", "quality level, higher values result in better quality; 0-100", "100")
  .option("-w, --width <number>", "frame width of the animated webp")
  .option("-h, --height <number>", "frame height of the animated webp")
  .optionsGroup("LOGGING")
  .option("-v, --verbose", "print logs to stdout")
  .optionsGroup("INFORMATION")
  .helpOption("--help", `display help for ${LIB_NAME}`)
  .version(LIB_VERSION)
  .action((files, options) => {
    const wid = options.width ? +options.width : undefined;
    const hei = options.height ? +options.height : undefined;

    animate_webp(files, options.output, options.verbose, +options.frameDelay, +options.quality, wid, hei);
  });

program.showHelpAfterError()
program.parse();
