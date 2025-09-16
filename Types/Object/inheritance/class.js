import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'
import {getTypeName} from '../../_identify.js'


/*
* class Fabric {
*   constructor(){}
*   method(){}
*   this.prop = value
* }
*
* ==converts==>
*
* function Fabric() {} // = constructor(){}
*       [[IsClassConstructor]] = true
*       .prototype
*           .constructor = function Fabric() {}
*           .method(){} // {enumerable: false}
*/

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
        this._text = "inside constructor";
    }

    _variable = "outside constructor";

    get value() {
        this.p?.buff("...read and return this._value...", this.clr?.sep, `by ${this.clr?.func}get value()${this.clr?.reset}`);
        this.p?.flush();
        return this._value;
    }

    print() {
        this.p?.buff(`Printing value...`, this.clr?.sep, [this.value, this._variable, this._text]);
        this.p?.flush();
    }
}

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] ?? ""});
    const p = new Proxy(printer ?? {}, {get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });
    const pNest = (maxNestLevel) => (new Proxy(p, {get: (t, pn) => pn === "maxNestLevel" ? maxNestLevel : t[pn]}));


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ class Fabric ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head(`class ${clr.var}Fabric${clr.reset}`);

    p.buff(`${clr.func}getTypeName${clr.reset}(${clr.var}Fabric${clr.reset})`, clr.sep, getTypeName(Fabric));
    p.buff(`${clr.var}Fabric${clr.func}?.constructor?.name${clr.reset}`, clr.sep, Fabric?.constructor?.name);
    p.buff(`${clr.func}typeof ${clr.var}Fabric${clr.reset}`, clr.sep, typeof Fabric);
    p.buff(`${clr.var}Fabric${clr.reset}`, clr.sep, Fabric);
    p.flush();


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ instance product ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head(`instance ${clr.var}product${clr.reset}`);

    let product;

    pNest(0).buff(`${clr.var}product${clr.reset} = ${clr.func}new Fabric()${clr.reset}`, clr.nsep, product = new Fabric(p, clr, void 0));

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Object.getPrototypeOf(product) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}product${clr.reset})`);
    p.buff(`Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}product${clr.reset})`, clr.nsep, Object.getPrototypeOf(product));
    p.flush();

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Object.getOwnPropertyDescriptors(product) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}product${clr.reset})`);
    p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}(new Fabric(null, null)${clr.reset})`, clr.nsep, Object.getOwnPropertyDescriptors(new Fabric(null, null)));
    p.flush();

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ product ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`${clr.var}product${clr.reset}`);
    p.buff(`${clr.func}getTypeName${clr.reset}(${clr.var}product${clr.reset})`, clr.sep, getTypeName(product));
    p.buff(`${clr.var}product${clr.func}?.constructor?.name${clr.reset}`, clr.sep, product?.constructor?.name);
    p.buff(`${clr.func}typeof ${clr.var}product${clr.reset}`, clr.sep, typeof product);

    p.buff(`${clr.var}product${clr.func}.print()${clr.reset}`, clr.sep);
    p.flush();
    product.print();
}

export {Fabric};
