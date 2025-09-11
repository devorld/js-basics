import {monolog} from '../../../utils/monolog.js'
import {CONSOLE_TEXT_COLOR} from '../../../utils/console.js'

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;
const printHeader = monolog?.printHeader || console.log;
const printAdd = monolog?.pushStringParts?.bind(monolog) || console.log;
const printAll = monolog?.printLines?.bind(monolog) || console.log;
const cVar = CONSOLE_TEXT_COLOR?.FgBlue || '';
const cNo = CONSOLE_TEXT_COLOR?.Reset || '';

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Randomizer - integer values [from 0, to 10) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
const randomizer0to5 = {
    [Symbol.iterator]: () => ({
        // single executed
        next: () => ({
            // each iteration executed
            done: false,
            value: ~~(Math.random() * 5),
        }),
    }),
};
const randomizer5to10 = {
    [Symbol.iterator]() {
        return this;
    },
    next: () => ({
        done: false,
        value: ~~(Math.random() * 5) + 5,
    }),
};

if (isMainModule) {
    printHeader('Randomizer - 10 integer values [from 0, to 10)');
    const randoms = [];

    for (let value of randomizer0to5) {
        randoms.push(value);

        if (randoms.length >= 5) break;
    }
    for (let value of randomizer5to10) {
        randoms.push(value);

        if (randoms.length >= 10) break;
    }
    printAdd(`${cVar}randomizer0to10${cNo}`, '█►', randoms.join(' '));
    printAll();
}
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ powerOfTwo ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
const powerOfTwo = {
    [Symbol.iterator]: () => ({
        // get iterator
        current: 1,
        next: function () {
            // do iteration
            return {
                done: this.current >= this.last,
                value: this.current *= 2,
            };
        },
        last: 2 ** 16,
    }),
};

if (isMainModule) {
    printHeader('powerOfTwo');

    const pot = [];

    for (let value of powerOfTwo) {
        pot.push(value);
    }

    // noinspection JSCheckFunctionSignatures - typing requires .length property and [index] getter
    printAdd(`${cVar}Array.from(powerOfTwo)${cNo}`, '█►', Array.from(powerOfTwo).join(' '));
    printAdd(`${cVar}powerOfTwo${cNo}`, '█►', pot.join(' '));
    printAll();
}
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ rangeObj ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
const rangeObj = {
    start: 3,
    end: 11,
    [Symbol.iterator]() { // = function () { ^ this.
        return {
            current: this.start,
            next() { // = function () { ^ this.
                return ({
                    done: this.current >= this.last,
                    value: this.current++,
                })
            },
            last: this.end,
        }
    },
};

if (isMainModule) {
    printHeader('rangeObj');

    const ro = [];

    for (const v of rangeObj) {
        ro.push(v);
    }
    printAdd(`${cVar}rangeObj${cNo}`, '█►', ro.join(' '));
    printAll();
}
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ rangeFunc ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
if (isMainModule) {
    printHeader('rangeFunc');

    const rangeFunc = function* () {
        yield 1;
        yield 11;
        yield 111;
        yield 1111;
        yield 11111;
        yield* rangeSubFunc();
    }

    const rangeSubFunc = function* () {
        yield 99999;
    }

    printAdd(`${cVar}rangeFunc${cNo}`, '█►', Array.from({[Symbol.iterator]: rangeFunc}, (v, i) => `${i}-> ${v / 10}`).join(' | '));
    printAll();
}
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ iteratorSingleton ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
const iteratorSingleton = {
    value: 0,
    done: false,
    next() {
        return {
            value: ++this.value,
            done: this.value > 10,
        };
    },
    [Symbol.iterator]() {
        return this;
    }
}

if (isMainModule) {
    printHeader('iteratorSingleton');

    const is = [];

    for (const v of iteratorSingleton) {
        is.push(v);
    }

    printAdd(`${cVar}iteratorSingleton${cNo}`, '█►', is.join(' '));
    printAll();
}
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ single value ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
const iteratorSingleValue = {
    value: 37331,
    done: true,
    next() {
        this.done = !this.done;

        return this;
    },
    [Symbol.iterator]() {
        return this;
    }
}

if (isMainModule) {
    printHeader('single value');

    const isv = [];

    for (const v of iteratorSingleValue) {
        isv.push(v);
    }

    printAdd(`${cVar}single value${cNo}`, '█►', isv.join(' '));
    printAll();
}
//endregion

export {rangeObj, powerOfTwo};
