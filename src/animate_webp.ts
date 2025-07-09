import * as webp from "webp-converter";
import * as fs from "fs";
import { LIB_NAME } from './lib.ts';
import * as os  from 'os';
import * as path  from 'path';

class QConsole {

    private _on: boolean;

    constructor(on?: boolean) {
        this._on = on || false;
    }

    log(message?: any, ...optionalParams: any[]): void {
        if (this._on) {
            console.log(message, ...optionalParams)
        }
    }
    warn(message?: any, ...optionalParams: any[]): void {
        if (this._on) {
            console.warn(message, ...optionalParams)
        }
    }
    error(message?: any, ...optionalParams: any[]): void {
        if (this._on) {
            console.error(message, ...optionalParams)
        }
    }
}

/**
 * Covert a sequence of images to an animated `.webp` file.
 *
 * @param {string[]} input - a list of paths to image files
 * @param {string} output - output path to the new animated webp file
 * @param {boolean|undefined} [logging] - whether to print logs to stdout; if `undefined` or`false`, logs will not print (default: undefined)
 * @param {number} [frameDelay=1000] - delay between frames, in milliseconds (default: 1000)
 * @param {number} [quality=100] - quality level, higher values result in better quality; 0-100 (default: 100)
 * @param {number|undefined} [width] - frame width of the animated webp
 * @param {number|undefined} [height] - frame height of the animated webp
 * @returns {Promise<string>} a `Promise` that resolves to the path of the animated webp file
 */
export async function animate_webp(input: string[], output: string, logging?: boolean, frameDelay: number = 1000, quality: number = 100, width?: number, height?: number): Promise<string>{
    webp.grant_permission();
    const qconsole = new QConsole(logging);

    let tmpDir;
    try {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), LIB_NAME))
    }
    catch (e) {
        throw e;
    }

    qconsole.log(`input files:`,input)
    qconsole.log(`frame delay: ${frameDelay}, width: ${width}, height: ${height}, quality: ${quality}`)
    //qconsole.log(`output: ${output}\n\n${"—".repeat(process.stdout.columns)}\n`)
    qconsole.log(`output: ${output}\n`)
    qconsole.log(`generating ${input.length} frames...`)

    let resize: string = "";
    if (width || height) {
        resize = `-resize ${height || 0} ${width || 0}`
    }

    const dir: string = tmpDir;

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

    qconsole.log("temp frames:", imgs)
    qconsole.log(`\ncreating animation...`)

    const animation: Promise<any> = webp.webpmux_animate(imgs, output, 0, "255,255,255,0","")
    await animation.then((response) => {qconsole.log(response);});

    try {
        if (tmpDir) {
            fs.rmSync(tmpDir, { recursive: true });
        }
    }
    catch (e) {
        throw new Error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
    }

    if (fs.existsSync(output)){
        qconsole.log(`successfully created animated ${output} file`)
        return output;
    } else {
        throw new Error(`failed to create animated ${output} file`)
    }
}
