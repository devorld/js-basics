import {CTC} from '../../../utils/console.js';
import {printer} from '../../../utils/monolog.js';
import {Fabric} from './class.js';

/*
* 0. child.ctor():
* 1. parent super():
* 2. this = {}          (0)
* 3. this.parentProps   (1)
* 4. this.parentMethods (1)
* 5. this.childMethods  (2)
* 6. parent ctor code
* 7. this.childProps    (2)
* 8. child ctor code
* */

class SubFabric extends Fabric {
    // absent child ctor = run only parent `super(...arguments)`
    constructor() {
        super(...arguments);
    } // RUN parent constructor, to create THIS and configure it with PARENT prop values and CHILD methods code
    // because without THIS created - there no props in CHILD, but already has methods logic

    havingParent() {
        return Object.getPrototypeOf(this);
    }

    print() {
        super.print(); // EXECUTE here the CODE from parent print() function, THIS always will be CURRENT instanceObject
    } // but SUPER always bound to who was parent whet THIS was created
}

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols - examples
const child = {
    property: "value",
    func1: function () {
        // cannot access `super.`
    },
    method1() { // has bounded `super`
        // can call `super.someParentMethod()`
    },
    __proto__: SubFabric.prototype,
};

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] ?? ""});
    const p = new Proxy(printer ?? {}, {
        get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });

    const getProtoObj = (obj) => Object.getPrototypeOf(obj);
    let subProduct = new SubFabric(p, clr);

    p.buff(`${clr.var}supProduct.[[Prototype]]${clr.reset}`, clr.nsep, subProduct.havingParent());
    p.buff(`${clr.var}subProduct.[[Prototype]]${clr.reset} === ${clr.func}SubFabric${clr.var}.prototype${clr.reset}`, clr.sep,
        getProtoObj(subProduct) === SubFabric.prototype);
    p.buff(`${clr.func}SubFabric${clr.var}.prototype${clr.func}.constructor${clr.reset} === ${clr.func}SubFabric${clr.reset}`, clr.sep,
        SubFabric.prototype.constructor === SubFabric);
    p.buff(`${clr.var}subProduct.[[Prototype]].[[Prototype]]${clr.reset} === ${clr.func}Fabric${clr.var}.prototype${clr.reset}`, clr.sep,
        getProtoObj(getProtoObj(subProduct)) === Fabric.prototype);
    p.buff(`${clr.var}subProduct.[[Prototype]].[[Prototype]].[[Prototype]]${clr.reset} === ${clr.func}Object${clr.var}.prototype${clr.reset}`, clr.sep,
        getProtoObj(getProtoObj(getProtoObj(subProduct))) === Object.prototype);
    p.buff(`${clr.var}subProduct.[[Prototype]].[[Prototype]].[[Prototype]]${clr.func}.constructor${clr.reset} === ${clr.func}Object${clr.reset}`, clr.sep,
        getProtoObj(getProtoObj(getProtoObj(subProduct))).constructor === Object);
    p.flush();
}
