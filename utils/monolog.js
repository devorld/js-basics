import {getTypeName, TYPE_NAME as TN} from '../Types/index.js';
import {getGraphemeCount} from "./graphemes.js";

let monolog;

monolog = monolog || new Monolog();

function Monolog() {
    this._lines = [];
    this._partsMaxLengths = [];
    this.printHeader = (text) => console.log(`\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ${text} ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`)
    this.printSubHeader = (text) => console.log(`\n░░░░░░░░░░░░░░░░ ${text} ░░░░░░░░░░░░░░░░`)
    this.pushStringParts = function (...strParts) {
        strParts.forEach(((part, index, array) => {
            array[index] = castToString(part);

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
                    )
                )
            );
        } else {
            console.table(this._lines);
        }

        if (!keepMaxLengths) this._partsMaxLengths.length = 0;
        this._lines.length = 0;
    };
    this.resetMaxLengths = function () {
        this._partsMaxLengths.length = 0;
    };
}

function castToString(part, nestingLevel = 0) {
    const typeName = getTypeName(part);
    let result;

    switch (typeName) {
        case TN.ARRAY:
            result = nestingLevel > 0 ? '\n' : '';
            result += '    '.repeat(nestingLevel) + `Array(${part.length}) [${part.map(el => castToString(el, nestingLevel + 1)).join(',')}]`;
            break;
        case TN.SET:
            result = new Set(part);
            break;
        case TN.MAP:
            result = new Map(part);
            break;
        case TN.WEAK_SET:
        case TN.WEAK_MAP:
        case TN.OBJECT:
            const symKeys = Object.getOwnPropertySymbols(part);
            const symProps = symKeys.map(sKey => [sKey, part[sKey]]);
            result = `${typeName}(${Object.entries(part).length}) ${JSON.stringify(part)}} +SymbolProps: ${castToString(symProps)}`;
            break;
        default:
            result = String(part);
            break;
    }

    return result;
}

const printer = {
    head: monolog.printHeader,
    title: monolog.printSubHeader,
    buff: monolog.pushStringParts?.bind(monolog),
    flush: monolog.printLines?.bind(monolog),
};

export {monolog, printer};
