<h3 align="center" >
  <div>
    <a href="https://github.com/nickesc/animwebp"><img alt="Source: Github" src="https://img.shields.io/badge/source-github-brightgreen?style=for-the-badge&logo=github&labelColor=%23505050"></a>
    <a href="https://github.com/nickesc/animwebp/actions/workflows/ts-tests.yml"><img alt="Tests: github.com/nickesc/animwebp/actions/workflows/ts-tests.yml" src="https://img.shields.io/github/actions/workflow/status/nickesc/animwebp/ts-tests.yml?logo=github&label=tests&logoColor=white&style=for-the-badge&labelColor=%23505050"></a>
    <br>
    <a href="https://www.npmjs.com/package/animwebp"><img alt="NPM: npmjs.com/package/animwebp" src="https://img.shields.io/npm/v/animwebp?style=for-the-badge&logo=npm&logoColor=white&label=npm&color=%23C12127&labelColor=%23505050"></a>
  </div>
  <h3 align="center">
    <code>animwebp</code>
  </h3>
  <h6 align="center">
    by <a href="https://nickesc.github.io">N. Escobar</a> / <a href="https://github.com/nickesc">nickesc</a>
  </h6>
  <h6 align="center">
    <!-- tagline -->
  </h6>
</h3>

<br>

```txt
Usage: animwebp [options] <files...>

Convert a sequence of images to an animated WebP

Arguments:
  files                       a list of paths to image files (ex.: use *.png to select 
                              all png files in a directory)

Options:
  -o, --output <path>         required; output path to the new animated webp file
  -f, --frame-delay <number>  delay between frames, in milliseconds (default: "1000")
  -q, --quality <number>      quality level, higher values result in better quality; 
                              0-100 (default: "100")
  -w, --width <number>        frame width of the animated webp
  -h, --height <number>       frame height of the animated webp
  -v, --verbose               print logs to stdout
  -V, --version               output the version number
  --help                      display help for command
```

## License

`animwebp` is released under the **MIT** license. For more information, see the repository's [LICENSE](/LICENSE) file.
