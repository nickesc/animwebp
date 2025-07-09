import { awebp } from '../awebp';
import { describe, it, expect, beforeEach } from 'vitest';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('awebp', () => {
    it('should construct', () => {
        const app = new awebp();
        expect(app).toBe(app);
    });
});
