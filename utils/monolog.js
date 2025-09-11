import {getTypeName, TYPE_NAME as TN} from '../Types/_identify.js';
import {CONSOLE_TEXT_COLOR, CTC} from './console.js'
import {getGraphemeCount} from "./graphemes.js";

const MAX_NEST_LEVEL = 5;
const EXPOSE_FUNCTIONS = false;

let monolog;

monolog = monolog || new Monolog();

function Monolog() {
    this._lines = [];
    this._partsMaxLengths = [];
    this.printHeader = (text) => this.printLines() || console.log(`\n▓ ${text} ▓`.replaceAll("▓", "▓".repeat(50 - getGraphemeCount(text) / 2)));
    this.printSubHeader = (text) => this.printLines() || console.log(`\n░ ${text} ░`.replaceAll("░", "░".repeat(50 - getGraphemeCount(text) / 2)));
    this.pushStringParts = function (...strParts) {
        strParts.forEach(((part, index, array) => {
            array[index] = adaptOutput(part);

            const length = getGraphemeCount(array[index]);

            if (length > 100) return;

            this._partsMaxLengths[index] = +this._partsMaxLengths[index] > length ? +this._partsMaxLengths[index] : length;
        }));
        this._lines.push(strParts);
    };
    this.printLines = function ({keepMaxLengths, tableView} = {}) {
        if (!this._lines.length) return;

        if (!tableView) {
            this._lines.forEach(strParts =>
                console.log(...strParts.map((str, index) =>
                        str.concat?.(' '.repeat(~~Math.max(this._partsMaxLengths[index] - getGraphemeCount(str), 0))) ?? str
                    ).flat(2)
                )
            );
        } else {
            console.table(this._lines);
        }

        if (!keepMaxLengths) this._partsMaxLengths.length = 0;
        this._lines.length = 0;
    };
}

function adaptOutput(part, nestingLevel = 0) {
    const typeName = getTypeName(part);
    let result;

    switch (typeName) {
        case TN.SYMBOL:
            result = String(part);
            break;
        case TN.ARRAY:
            result = nestingLevel > 0 ? '\n' : '';
            result += '    '.repeat(nestingLevel) + `Array(${part.length}) [${part.map(el => adaptOutput(el, nestingLevel + 1)).join(',')}]`;
            break;
        case TN.DATE:
            result = part.toLocaleString();
            break;
        case TN.SET:
            result = new Set(part);
            break;
        case TN.MAP:
            result = new Map(part);
            break;
        case TN.FUNCTION:
            result = EXPOSE_FUNCTIONS
                ? adaptOutput({type: "?function?", ...Object.fromEntries(Object.entries(Object
                    .getOwnPropertyDescriptors(part)).map(
                    ([k, v]) => [k,
                        nestingLevel < MAX_NEST_LEVEL
                            ? adaptOutput(v?.value, nestingLevel + 1)
                            : replaceFunctionCode(v)]
                )
            )}, nestingLevel + 1)
            : replaceFunctionCode(part);
            break;
        case TN.WEAK_SET:
        case TN.WEAK_MAP:
        case TN.OBJECT:
            const symKeys = Object.getOwnPropertySymbols(part);
            const symProps = symKeys.map(sKey => [sKey, part[sKey]]);
            const viewObj = {...part, "[[Prototype]]": Object.getPrototypeOf(part)};

            result = `${typeName}(${Object.entries(part).length}) ${
                highlightFunctionNativeCode(
                    JSON.stringify(viewObj,
                        (k, v) => v === viewObj
                            ? v
                            : k === "global"
                                ? "?global?"
                                : nestingLevel < MAX_NEST_LEVEL
                                    ? adaptOutput(v, nestingLevel + 1)
                                    : replaceFunctionCode(v)
                        ,
                        4)
                        .replaceAll(/\\r\\n/g, "\r\n")
                        .replaceAll(/\\n/g, "\n    ")
                        .replaceAll(/\\"/g, "\"")
                        .replaceAll(/\\u001b\[34m|\\u001b\[36m|\\u001b\[0m/g, "")
                )
            }`.concat(!symKeys.length ? "" : ` +SymbolProps: ${adaptOutput(symProps, nestingLevel + 1)}`);
            break;
        default:
            try {
                result = String(part);
            } catch (e) {
                console.error("🐞", getTypeName(part), part, e)
            }
            break;
    }

    return result;
}

function replaceFunctionCode(variable) {
    switch (getTypeName(variable)) {
        case TN.FUNCTION:
            return "?function?() { [native code] }";
        default:
            return String(variable);
    }
}

function highlightFunctionNativeCode(str) {
    if (typeof str !== "string" || !str.length || str.search("[native code]") < 0) {
        return str;
    } else {
        return str
            .replaceAll(/(\[\[Prototype]])/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
            .replaceAll(/(\[native code])/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
            .replaceAll(/(\[object Object])/g, `${CTC.var}$1${CTC.reset}`)
    }
}

const printer = {
    head: monolog.printHeader,
    title: monolog.printSubHeader,
    buff: monolog.pushStringParts?.bind(monolog),
    flush: monolog.printLines?.bind(monolog),
};

export {monolog, printer};
