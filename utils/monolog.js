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
            array[index] = CastToString(part);

            const length = getGraphemeCount(array[index]);

            this._partsMaxLengths[index] = +this._partsMaxLengths[index] > length ? +this._partsMaxLengths[index] : length;
        }));
        this._lines.push(strParts);
    }
    this.printLines = function ({keepMaxLengths, tableView} = {}) {
        if (!this._lines.length) return;

        if (!tableView) {
            this._lines.forEach(strParts =>
                console.log(...strParts.map((str, index) =>
                        str.concat?.(' '.repeat(this._partsMaxLengths[index] - getGraphemeCount(str))) ?? str
                    )
                )
            );
        } else {
            console.table(this._lines);
        }

        if (!keepMaxLengths) this._partsMaxLengths.length = 0;
        this._lines.length = 0;
    }
    this.resetMaxLengths = function () {
        this._partsMaxLengths.length = 0;
    }
}

function CastToString(part, nestingLevel = 0) {
    const typeName = getTypeName(part);
    let result;

    switch (typeName) {
        case TN.ARRAY:
            result = nestingLevel > 0 ? '\n' : '';
            result += '    '.repeat(nestingLevel) + `Array(${part.length}) [${part.map(el => CastToString(el, nestingLevel + 1)).join(',')}]`;
            break;
        case TN.MAP:
        case TN.SET:
            result = part;
            break;
        case TN.OBJECT:
            result = `Object(${Object.entries(part).length}) ${JSON.stringify(part)}`;
            break;
        default:
            result = String(part);
            break;
    }

    return result;
}

export {monolog};
