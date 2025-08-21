let monolog;

monolog = monolog || new Monolog();

function Monolog() {
    this._lines = [];
    this._partsMaxLength = [];
    this.pushStringParts = function (...strParts) {
        strParts.forEach(((part, index) => {
            this._partsMaxLength[index] = +this._partsMaxLength[index] > part.length ? +this._partsMaxLength[index] : part.length;
        }));
        this._lines.push(strParts);
    }
    this.printLines = function () {
        if (!this._lines.length) return;

        this._lines.forEach(strParts =>
            console.log(...strParts.map((str, index) => str.concat(' '.repeat(this._partsMaxLength[index] - str.length))))
        );

        this._partsMaxLength.length = 0;
        this._lines.length = 0;
    }
}

export { monolog };
