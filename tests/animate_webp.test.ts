import { animate_webp } from '../src/animate_webp';
import { describe, it, expect, beforeEach } from 'vitest';
import * as jpeg from "jpeg-js";
import * as fs from "fs";

function generate_image(output: string = "img", width: number = 100, height: number = 100): string {
    let frameData = new Buffer(width * height * 4);
    let i = 0;
    while (i < frameData.length) {
        frameData[i++] = 0x00; // red
        frameData[i++] = 0x00; // green
        frameData[i++] = 0x00; // blue
        frameData[i++] = 0xff; // alpha - ignored in JPEGs
    }
    const rawImageData = {
        data: frameData,
        width: width,
        height: height,
    };
    const jpegImageData = jpeg.encode(rawImageData, 50);
    console.log(jpegImageData);
    let filepath: string = `${output}.jpg`
    fs.writeFileSync(filepath, jpegImageData.data);
    return filepath;
}



const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('animwebp', () => {
    it('should generate an animated webp file from two jpeg files', async () => {
        let dir = "./tests/test"
        let out = `${dir}/anim.webp`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        let list = [generate_image(`${dir}/1`), generate_image(`${dir}/1`)]
        await sleep(1000)
        animate_webp(list,out, true)
        await sleep(4000)
        expect(fs.existsSync(out)).toBe(true);
    });
}, 0);
