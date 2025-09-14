import {objSymExample} from '../Types/Object/_examples.js'
import {printer} from './monolog.js'

const CONSOLE_TEXT_COLOR = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    FgGray: '\x1b[90m',

    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m',
    BgGray: '\x1b[100m',
};

// noinspection SpellCheckingInspection
const CTC = {
    reset: CONSOLE_TEXT_COLOR.Reset,
    func: CONSOLE_TEXT_COLOR.FgMagenta,
    var: CONSOLE_TEXT_COLOR.FgBlue,
    sep: '█►',
    nsep: "\n█►",
};

const clr = CTC;
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log});

function printAll(obj, headText = `${clr.func}console.${clr.reset}$display$()`) {
    p.head(headText);

    p.title(`console${clr.func}.table${clr.reset}(obj)`);
    console.table(obj);

    p.title(`console${clr.func}.log${clr.reset}(obj)`);
    console.log(obj);

    p.title(`console${clr.func}.dir${clr.reset}(Object.getOwnPropertyDescriptors(obj))`);
    console.dir(obj);

    p.title(`console${clr.func}.dir${clr.reset}(obj, {${clr.func}showHidden: true${clr.reset}})`);
    console.dir(obj, {showHidden: true});

    p.title(`console${clr.func}.dir${clr.reset}(Object.getOwnPropertyDescriptors(obj), {${clr.func}showHidden: true${clr.reset}})`);
    console.dir(Object.getOwnPropertyDescriptors(obj), {showHidden: true});
}

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    printAll(objSymExample);

    debug: {
        break debug;

        // disabled till debugging
        // noinspection UnreachableCodeJS
        console.log(`${CONSOLE_TEXT_COLOR.FgBlue}Lorem ipsum${CONSOLE_TEXT_COLOR.Reset}`);

        // region Group - Object under the hood
        console.groupCollapsed('Group - Object under the hood');

        console.dir(Object, {showHidden: true, colors: true, depth: null});

        console.groupEnd();
        // endregion

        console.table(Object.getOwnPropertyDescriptors(Object));

        console.assert(CONSOLE_TEXT_COLOR.hasOwnProperty('BgGray'), 'Color %s not found!', 'gray');
        console.assert(CONSOLE_TEXT_COLOR.hasOwnProperty('BgGrey'), `${CONSOLE_TEXT_COLOR.BgRed}Color %s not found!${CONSOLE_TEXT_COLOR.Reset}`, 'grey');

        console.trace('Lorem', 'ipsum', 0);
    }
}

export {CONSOLE_TEXT_COLOR, CTC, printAll};
