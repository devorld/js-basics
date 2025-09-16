import {formatter as fer} from './formatter.js'
import {getGraphemeCount} from "./graphemes.js";

let monolog;

monolog = monolog || new Monolog();

function Monolog() {
    this._lines = [];
    this._partsMaxLengths = [];
    this.printHeader = (text) => this.printLines() || console.log(`\n▓ ${text} ▓`.replaceAll("▓", "▓".repeat(50 - getGraphemeCount(text) / 2)));
    this.printSubHeader = (text) => this.printLines() || console.log(`\n░ ${text} ░`.replaceAll("░", "░".repeat(50 - getGraphemeCount(text) / 2)));
    this.pushStringParts = function (...strParts) {
        strParts.forEach(((part, index, array) => {
            const length = getGraphemeCount(array[index]);
            let {maxNestLevel} = this;

            maxNestLevel = !Number.isFinite(maxNestLevel) ? undefined : maxNestLevel;
            array[index] = fer.anyToString(part, maxNestLevel);


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

const printer = {
    ...monolog,
    head: monolog.printHeader,
    title: monolog.printSubHeader,
    buff: monolog.pushStringParts,
    flush: monolog.printLines,
};

export {monolog, printer};
