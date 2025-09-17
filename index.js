import {printer} from './utils/monolog.js'

console.log('Happy developing ✨')

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

let today = new Date();

today.setHours(0, 0, 0, 0);

let lastDayOfFull = new Date(2025, 10, 25);
let lastDayOf3of4 = new Date(2025, 11, 16);
let lastDayOf1of2 = new Date(2026, 0, 6);
let lastDayOf1of4 = new Date(2026, 0, 27);

console.log((lastDayOfFull - today) / MILLISECONDS_PER_DAY);
console.log((lastDayOf3of4 - lastDayOfFull) / MILLISECONDS_PER_DAY);
console.log((lastDayOf1of2 - lastDayOf3of4) / MILLISECONDS_PER_DAY);
console.log((lastDayOf1of4 - lastDayOf1of2) / MILLISECONDS_PER_DAY);

console.log((lastDayOfFull - today) / MILLISECONDS_PER_DAY + 0.75 * 21 + 0.5 * 21 + 0.25 * 21)

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const p = new Proxy(printer ?? {}, {
        get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });


    p.head("");

    class NewFunction extends Function {

    }

    p.buff(new NewFunction());
    p.flush();
}