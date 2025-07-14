import { animate_webp } from '../src/animate_webp';
import { describe, it, expect, afterEach } from 'vitest';
import * as jpeg from "jpeg-js";
import * as fs from "fs";

type Color = { r: number; g: number; b: number };

function generate_image(output: string = "img", width: number = 100, height: number = 100, color: Color = { r: 0, g: 0, b: 0 }): string {
    let frameData = Buffer.alloc(width * height * 4);
    let i = 0;
    while (i < frameData.length) {
        frameData[i++] = color.r; // red
        frameData[i++] = color.g; // green
        frameData[i++] = color.b; // blue
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

const testDir = "./tests/test";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('animwebp', () => {
    afterEach(() => {
        if (fs.existsSync(testDir)) {
            //fs.rmSync(testDir, { recursive: true, force: true });
        }
    });

    it('should generate an animated webp file from two jpeg files', async () => {
        let out = `${testDir}/anim.webp`
        if (!fs.existsSync(testDir)){
            fs.mkdirSync(testDir, { recursive: true });
        }

        let list = [generate_image(`${testDir}/1`, 100, 100, {r: 0, g: 255, b: 0}), generate_image(`${testDir}/2`, 100, 100, {r: 255, g: 0, b: 255})]
        await animate_webp(list, out, true)
        expect(fs.existsSync(out)).toBe(true);
    });

    it('should throw an error for empty input array', async () => {
        let out = `${testDir}/anim.webp`
        if (!fs.existsSync(testDir)){
            fs.mkdirSync(testDir, { recursive: true });
        }
        await expect(animate_webp([], out, true)).rejects.toThrow();
    });

    it('should throw an error for non-existent input files', async () => {
        let out = `${testDir}/anim.webp`
        if (!fs.existsSync(testDir)){
            fs.mkdirSync(testDir, { recursive: true });
        }
        let list = ["nonexistent1.jpg", "nonexistent2.jpg"];
        await expect(animate_webp(list, out, true)).rejects.toThrow('nonexistent1.jpg does not exist');
    });
}, 0);
