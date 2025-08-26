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
            array[index] = Array.isArray(part) ? part.join('') : String(part)

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
                        str.concat(' '.repeat(this._partsMaxLengths[index] - getGraphemeCount(str)))
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

export {monolog};
