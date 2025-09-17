import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

class ClassParent {
    // protected
    _pseudoProtected1 = "ip - just announcing protected by prop name prefix - 11";
    _pseudoProtected2 = "ip - just announcing protected by prop name prefix - 22";

    static _pseudoProtectedA = "sp - just announcing protected by prop name prefix - AA";
    static _pseudoProtectedB = "sp - just announcing protected by prop name prefix - BB";

    // private
    #private1 = "ip - truly private - 1";
    #private2 = "ip - truly private - 2";

    static #privateA = "sp - truly static private - A";
    static #privateB = "sp - truly static private - B";

    print = (fax) => fax([this._pseudoProtected1, this._pseudoProtected2, this.#private1, this.#private2].join("\n"));
    static print = (fax) => fax([this._pseudoProtectedA, this._pseudoProtectedB, this.#privateA, this.#privateB].join("\n"));
}

class ClassChild extends ClassParent {
    // protected
    _pseudoProtected2 = "ic - overridden pseudo protected property - 2222";
    _pseudoProtected3 = "ic - just announcing protected by prop name prefix - 3333";

    static _pseudoProtectedB = "sc - overridden static pseudo protected property - BBBB";
    // noinspection SpellCheckingInspection
    static _pseudoProtectedC = "sc - just announcing protected by prop name prefix - CCCC";

    // private
    #private2 = "ic - overridden truly private property - 222"
    #private3 = "ic - truly private property - 333"

    static #privateB = "sc - overridden static private property - BBB";
    static #privateC = "sc - truly static private property - CCC";

    print23 = (fax) => fax([this._pseudoProtected1, this._pseudoProtected2, this._pseudoProtected3, this.#private2, this.#private3].join("\n"));
    static printBC = (fax) => fax([this._pseudoProtectedA, this._pseudoProtectedB, this._pseudoProtectedC, this.#privateB, this.#privateC].join("\n"));
}


// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] ?? ""});
    const p = new Proxy(printer ?? {}, {
        get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });

    const iParent = new ClassParent();
    const iChild = new ClassChild();

    p.buff(`${clr.func}ClassParent${clr.reset}`, clr.nsep, ClassParent);
    p.buff(`${clr.func}ClassChild${clr.reset}`, clr.nsep, ClassChild);
    p.buff(`instance ${clr.var}iParent${clr.reset}`, clr.nsep, iParent);
    p.buff(`instance ${clr.var}iChild${clr.reset}`, clr.nsep, iChild);
    p.flush()

    p.title("print");

    const fax = p.buff.bind(p);

    // classes - static
    p.buff(`${clr.func}ClassParent${clr.reset}.${clr.func}print${clr.reset}`, clr.sep, ClassParent.print(fax) || '^');
    p.buff(`${clr.func}ClassChild${clr.reset}.${clr.func}print${clr.reset}`, clr.sep, ClassChild.print(fax) || '^');
    p.buff(`${clr.func}ClassChild${clr.reset}.${clr.func}printBC${clr.reset}`, clr.sep, ClassChild.printBC(fax) || '^');
    p.buff();

    // instances - non-static
    p.buff(`${clr.var}iParent${clr.reset}.${clr.func}print${clr.reset}`, clr.sep, iParent.print(fax) || '^');
    p.buff(`instance ${clr.var}iParent${clr.reset}.${clr.func}print${clr.reset}`, clr.sep, iChild.print(fax) || '^');
    p.buff(`instance ${clr.var}iChild${clr.reset}.${clr.func}print23${clr.reset}`, clr.sep, iChild.print23(fax) || '^');
    p.flush();
}
