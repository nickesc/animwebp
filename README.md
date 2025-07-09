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

# About

<!--- ABOUT BEGIN --->

Convert a sequence of images to an animated WebP.
<!--- ABOUT END --->

## Install

<!--- INSTALL BEGIN --->
Install `animwebp` via `npm`.

To install `animwebp` as a library in a JavaScript or TypeScript project:
```sh
npm install animwebp
```

To install `animwebp` globally, for use as a CLI tool:
```sh
npm install -g animwebp
```
<!--- INSTALL END --->

## CLI Usage

<!--- CLI BEGIN --->
```txt
Usage: animwebp [options] <files...>

Convert a sequence of images to an animated WebP.

Arguments:
  files                       list of paths to image files (ex.: use *.png to
                              select all png files in a directory)

Options:
  -o, --output <path>         required; output path to the new animated webp
                              file

ANIMATION
  -f, --frame-delay <number>  delay between frames, in milliseconds (default:
                              "1000")
  -q, --quality <number>      quality level, lower values result in more
                              compression; 0-100 (default: "100")
  -w, --width <number>        frame width; if only width is set, height scales
                              proportionally
  -h, --height <number>       frame height; if only height is set, width scales
                              proportionally

LOGGING
  -v, --verbose               print logs to stdout

INFORMATION
  -V, --version               output the version number
  --help                      display help for animwebp
```

<!--- CLI END --->

## Reference

<!--- REFERENCE BEGIN --->
<a name="module_animwebp"></a>

## animwebp
Library and command-line tool for converting lists of images to animated WebP files.

**Example**  
```ts
import { animate_webp } from 'animwebp';
let out = `anim.webp`
let imgs = ['1.jpg', '2.png', '3.png', '4.png', '5.png']

// generate a webp with logging on, 2000ms frame delay,
// a height of 1024 pixels and an automatic width
animate_webp(imgs, out, true, 2000, undefined, 1024)
```
<a name="module_animwebp.animate_webp"></a>

### animwebp.animate\_webp(input, output, [logging], [frameDelay], [quality], [width], [height]) ⇒ <code>Promise.&lt;string&gt;</code>
Convert a sequence of images to an animated `.webp` file.

**Kind**: static method of [<code>animwebp</code>](#module_animwebp)  
**Returns**: <code>Promise.&lt;string&gt;</code> - a `Promise` that resolves to the path of the animated webp file  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array.&lt;string&gt;</code> |  | list of paths to image files |
| output | <code>string</code> |  | output path to the new animated webp file |
| [logging] | <code>boolean</code> \| <code>undefined</code> |  | whether to print logs to stdout; if `undefined` or`false`, logs will not print |
| [frameDelay] | <code>number</code> | <code>1000</code> | delay between frames, in milliseconds (default: 1000) |
| [quality] | <code>number</code> | <code>100</code> | quality level, higher values result in better quality; 0-100 (default: 100) |
| [width] | <code>number</code> \| <code>undefined</code> |  | frame width; if only `width` is set, `height` scales proportionally |
| [height] | <code>number</code> \| <code>undefined</code> |  | frame height; if only `height` is set, `width` scales proportionally |

**Example**  
```ts
import { animate_webp } from 'animwebp';
let out = `anim.webp`
let imgs = ['1.jpg', '2.png']
animate_webp(imgs,out)
```
<!--- REFERENCE END --->

## License

<!--- LICENSE BEGIN --->
`animwebp` is released under the **MIT** license. For more information, see the repository's [LICENSE](/LICENSE) file.
<!--- LICENSE END --->
