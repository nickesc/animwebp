#!/usr/bin/env NODE_OPTIONS=--no-warnings node

import { Command } from '@commander-js/extra-typings';
import { LIB_VERSION, LIB_NAME, LIB_DESCRIPTION } from './lib.ts';
import { animate_webp } from './animate_webp.ts';

const program: Command = new Command();

program
  .name(LIB_NAME)
  .description(LIB_DESCRIPTION)
  .summary("create animated webp")
  .argument("<files...>", "list of paths to image files (ex.: use *.png to select all png files in a directory)")
  .optionsGroup("Options:")
  .requiredOption("-o, --output <path>", "required; output path for the animated webp file")
  .optionsGroup("ANIMATION")
  .option("-f, --frame-delay <number>", "delay between frames, in milliseconds", "1000")
  .option("-q, --quality <number>", "quality level, lower values result in more compression; 0-100", "100")
  .option("-w, --width <number>", "frame width; if only width is set, height scales proportionally")
  .option("-h, --height <number>", "frame height; if only height is set, width scales proportionally")
  .optionsGroup("LOGGING")
  .option("-v, --verbose", "print logs to stdout")
  .optionsGroup("INFORMATION")
  .helpOption("--help", `display help for ${LIB_NAME}`)
  .version(LIB_VERSION)
  .action((files, options) => {
    const wid: number | undefined = options.width ? +options.width : undefined;
    const hei: number | undefined = options.height ? +options.height : undefined;

    animate_webp(files, options.output, options.verbose, +options.frameDelay, +options.quality, wid, hei);
  });

program.parse();
