import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

/*
* статические методы класса - остаются в классе
* обычные методы - переезжают в объект-прототип
*
* class Child -> class Parent ->
*
* iChild -> {constructor: Child} -> {constructor: Parent} -> {constructor: Object}
*/

class ClassWithStatic {
    static property = "inside class";

    static staticMethod(classRef = ClassWithStatic) {
        return {
            "this === classRef": this === classRef,
            "Object.getPrototypeOf(this) === Object.getPrototypeOf(classRef)": Object.getPrototypeOf(this) === Object.getPrototypeOf(classRef),
            "this.prototype === classRef.prototype": this.prototype === classRef.prototype,
            "typeof this": typeof this,
            "typeof classRef": typeof classRef,
            "Object.getPrototypeOf(this)": Object.getPrototypeOf(this), // 5
            "Object.getPrototypeOf(classRef)": Object.getPrototypeOf(classRef),

            "Object.getPrototypeOf(new this()) === classRef.prototype": Object.getPrototypeOf(new this()) === classRef.prototype, // 7
            "Object.getPrototypeOf(new this()).constructor === classRef": Object.getPrototypeOf(new this()).constructor === classRef, // 8

            "this": this, // ClassWithStatic
            "classRef": classRef, // ClassWithStatic
            "classRef.prototype.constructor": classRef.prototype.constructor, // ClassWithStatic
            "this.prototype": this.prototype, // ClassWithStatic.[[Prototype]]
            "classRef.prototype": classRef.prototype, // ClassWithStatic.[[Prototype]]
        };
    }
}

ClassWithStatic.staticMethodEqual = ClassWithStatic.staticMethod;
ClassWithStatic.propertyEqual = "outside class";

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] ?? ""});
    const p = new Proxy(printer ?? {}, {
        get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ static methods and properties ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head("static methods and properties");


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ class ClassWithStatic ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head(`class ClassWithStatic`)
    p.buff("ClassWithStatic", clr.nsep, ClassWithStatic);
    p.buff("ClassWithStatic.prototype", clr.nsep, ClassWithStatic.prototype);

    let rslt;

    Reflect.ownKeys(rslt = ClassWithStatic.staticMethod()).forEach((key, i) => p.buff(key, i < 9 ? clr.sep : clr.nsep, rslt[key]));
    p.flush();

    // ░░░░░░░░░░░░░░░░░░░░░░░░ instance of ClassWithStatic = new ClassWithStatic() ░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`instance of ClassWithStatic = new ClassWithStatic()`)

    let instance;

    p.buff("instance of ClassWithStatic", clr.sep, instance = new ClassWithStatic());
    p.buff(`Object.getPrototypeOf(instance) ${clr.func}===${clr.reset} ClassWithStatic.prototype`, clr.sep, Object.getPrototypeOf(instance) === ClassWithStatic.prototype);
    p.buff(`${clr.var}instance${clr.reset}.staticMethod?.()`, clr.sep, (new ClassWithStatic())?.staticMethod?.());
    p.flush();


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ class HeirClassWithStatic ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head(`class HeirClassWithStatic`);

    class HeirClassWithStatic extends ClassWithStatic {
        /*
        static staticMethod(classRef) {
            return super.staticMethod(classRef);
        }
        */
    }

    p.buff("HeirClassWithStatic", clr.nsep, HeirClassWithStatic);
    p.buff("HeirClassWithStatic.prototype", clr.nsep, HeirClassWithStatic.prototype);
    p.flush();

    // ░░░░░░░░ HeirClassWithStatic.staticMethod(ClassWithStatic) with parent class ClassWithStatic ░░░░░░░░
    p.title(`HeirClassWithStatic.staticMethod(ClassWithStatic) with parent class ClassWithStatic`);
    Reflect.ownKeys(rslt = HeirClassWithStatic.staticMethod()).forEach((key, i) => p.buff(key, i < 9 ? clr.sep : clr.nsep, rslt[key]));
    p.flush();

    // ░░░░ HeirClassWithStatic.staticMethod(HeirClassWithStatic) with current class HeirClassWithStatic ░░░░
    p.title(`HeirClassWithStatic.staticMethod(HeirClassWithStatic) with current class HeirClassWithStatic`);
    Reflect.ownKeys(rslt = HeirClassWithStatic.staticMethod(HeirClassWithStatic)).forEach((key, i) => p.buff(key, i < 9 ? clr.sep : clr.nsep, rslt[key]));
    p.flush();

    // ░░░░░░░░░░░░░░░░░░░░ instance of HeirClassWithStatic = new HeirClassWithStatic() ░░░░░░░░░░░░░░░░░░░░
    p.title(`instance of HeirClassWithStatic = new HeirClassWithStatic()`)
    p.buff("instance of HeirClassWithStatic", clr.sep, instance = new HeirClassWithStatic());
    p.buff(`Object.getPrototypeOf(instance) ${clr.func}===${clr.reset} HeirClassWithStatic.prototype`, clr.sep, Object.getPrototypeOf(instance) === HeirClassWithStatic.prototype);
    p.buff(`${clr.var}instance${clr.reset}.staticMethod?.()`, clr.sep, (new HeirClassWithStatic())?.staticMethod?.());
    p.flush();


    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ summary ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head("summary");

    const ClassParent = ClassWithStatic;
    const ClassChild = HeirClassWithStatic;
    const iParent = new ClassParent();
    const iChild = new ClassChild();

    p.buff("ClassWithStatic", clr.nsep, ClassParent);
    p.buff("HeirClassWithStatic", clr.nsep, ClassChild);
    p.buff("instance of ClassWithStatic", clr.nsep, iParent);
    p.buff("instance of HeirClassWithStatic", clr.nsep, iChild);
    p.flush()

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ .prototype ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`.prototype`);
    p.buff("ClassWithStatic", clr.nsep, ClassParent.prototype);
    p.buff("HeirClassWithStatic", clr.nsep, ClassChild.prototype);
    // noinspection JSUnresolvedReference - example
    p.buff("instance of ClassWithStatic", clr.nsep, (iParent).prototype);
    p.buff("instance of HeirClassWithStatic", clr.nsep, (iChild).prototype);
    p.flush()

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ [[Prototype]] ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title(`[[Prototype]]`);
    p.buff("ClassWithStatic", clr.nsep, Object.getPrototypeOf(ClassParent));
    p.buff("HeirClassWithStatic", clr.nsep, Object.getPrototypeOf(ClassChild));
    p.buff("instance of ClassWithStatic", clr.nsep, Object.getPrototypeOf(iParent));
    p.buff("instance of HeirClassWithStatic", clr.nsep, Object.getPrototypeOf(iChild));
    p.flush()

    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ conceptually ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    p.title("conceptually")

    const _ = (targetObj) => new Proxy(targetObj, {
        get: (t, propName) => propName === "[[Prototype]]"
        ? Object.getPrototypeOf(t)
        : t[propName],
    });

    p.buff(`${clr.func}ClassParent${clr.reset}.${clr.var}[[Prototype]]${clr.reset}`, clr.nsep, _(ClassParent)["[[Prototype]]"]);
    p.buff(`${clr.func}ClassChild${clr.reset}.${clr.var}[[Prototype]]${clr.reset}`, clr.nsep, _(ClassChild)["[[Prototype]]"]);
    p.buff(`${clr.func}iParent${clr.reset}.${clr.var}[[Prototype]]${clr.reset}`, clr.nsep, _(iParent)["[[Prototype]]"]);
    p.buff(`${clr.func}iChild${clr.reset}.${clr.var}[[Prototype]]${clr.reset}`, clr.nsep, _(iChild)["[[Prototype]]"]);

    p.buff(`${clr.var}iParent.[[Prototype]]${clr.reset} === ${clr.func}ClassParent${clr.var}.prototype${clr.reset}`, clr.sep, _(iParent)["[[Prototype]]"] === ClassParent.prototype);
    p.buff(`${clr.var}iChild.[[Prototype]]${clr.reset} === ${clr.func}ClassChild${clr.var}.prototype${clr.reset}`, clr.sep, _(iChild)["[[Prototype]]"] === ClassChild.prototype);
    p.flush();
}
