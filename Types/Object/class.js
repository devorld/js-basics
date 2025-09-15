import {CTC} from '../../utils/console.js'
import {printer} from '../../utils/monolog.js'
import {getTypeName} from '../_identify.js'

class Fabric {
    constructor(p, clr, value = 0) {
        this.p = p;
        this.clr = clr;
        // noinspection JSUnusedGlobalSymbols
        this._dead = null;
        this._value = value;
        // noinspection JSUnresolvedReference
        this._unassigned;
        // noinspection JSUnusedGlobalSymbols
        this._undefined = undefined;
    }

    get value() {
        this.p?.buff("...read and return this._value...", this.clr?.sep, `by ${this.clr?.func}get value()${this.clr?.reset}`);
        this.p?.flush();
        return this._value;
    }

    print() {
        this.p?.buff(`Printing value...`, this.clr?.sep, this.value);
        this.p?.flush();
    }
}

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
    const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})

    p.head("class");

    p.buff(`Fabric`, clr.sep, Fabric);
    p.flush();

    let product;

    p.buff(`${clr.var}product${clr.reset} = ${clr.func}new Fabric()${clr.reset}`, clr.sep, product = new Fabric(p, clr));
    p.buff(`Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}product${clr.reset})`, clr.sep, Object.getPrototypeOf(product));
    p.flush();

    product.print();

    p.head("");

    p.buff("Object.getOwnPropertyDescriptors(product)", clr.sep, Object.getOwnPropertyDescriptors(product));
    p.flush();

    p.title(`${clr.var}product${clr.reset}`);
    p.buff("getTypeName(product)", clr.sep, getTypeName(product));
    p.buff("product?.constructor?.name", clr.sep, product?.constructor?.name);
    p.buff("typeof product", clr.sep, typeof product);
    p.buff("product", clr.sep, product);
    p.flush();

}

export {Fabric};
