import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'


const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})

/* __proto__ is Deprecated

__proto__ -- is an accessor
        (getter and setter pair)
        property for (specification) property [[Prototype]]: object | null

        logic:

v8.__proto__ <=> Object.defineProperty(v8, "__proto__", {
    set(parentObj) {
        this.ES[[Prototype]] = parentObj;
    },
    get() {
        return this.ES[[Prototype]];
    },
});
*/

/*
    Object.setPrototypeOf / Object.getPrototypeOf - actual usage

    v8.__proto__ <=> Object.defineProperty(v8, "__proto__", {
    set(parentObj) {
        Object.setPrototypeOf(this, parentObj);
    },
    get() {
        return this.ES[[Prototype]];
    },
*/

/*
    Object.prototype
            специальное поле у Object из API движка JS
*/

// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ parent ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("parent")

const parent = {
    name: "parent",

    _value: "Lerum ipsum",

    set value(v) {
        this._value = v;
    },
    get value() {
        return this._value;
    },

    print() {
        p.buff(`PRINT - ${this.name}: ${this._value}`);
        p.buff(`${clr.var}${this.name}${clr.reset}:`, `\n${clr.sep}`, this);
        p.flush();
    }
}

parent.print();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ __proto__ = ... -- child1 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("__proto__ = ... -- child1")

const child1 = {
    __proto__: parent,
    name: "child1",
    display() {
        this.print();
    }
}

child1.display();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object.create(...) -- child2 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("Object.create(...) -- child2");

const child2 = Object.create(child1);

child2.name = "child2";
child2.display();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object.setPrototypeOf / Object.getPrototypeOf -- child3 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("Object.setPrototypeOf / Object.getPrototypeOf -- child3");

const child3 = {
    name: "child3",
};

console.log(...[
    Object.setPrototypeOf(child3, child2) === child3,
    clr.sep,
    `Object${clr.func}.setPrototypeOf${clr.reset}(${clr.var}child${clr.reset}, [[Prototype]] <- ${clr.var}parent${clr.reset}): returns ref of modified object`
].reverse());

child3.display();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ child3 - set new value - to inherited data or accessor property ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("child3 - set new value - to inherited data or accessor property");

p.buff(`${clr.var}child3${clr.reset}`, `\n${clr.sep}`, child3);
p.buff(`${clr.var}child3${clr.reset}._value = "dolor sit amet"`, `\n${clr.sep}`, child3._value += " (1) will create child3 property and add to parent value");
p.buff(`${clr.var}child3${clr.reset}.value = "sed do eiusmod"`, `\n${clr.sep}`, child3.value += " (2) + will add to child3 created property");
p.buff(`${clr.var}child3${clr.reset}`, `\n${clr.sep}`, child3);
p.flush();


//
p.head(`child4 - clone child3 with [[Prototype]] and Descriptors`);

let child4;

p.buff(`${clr.var}child4${clr.reset} = Object${clr.func}.create${clr.reset}(Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}child3${clr.reset}), Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}child3${clr.reset}))`, `\n${clr.sep}`, child4 = Object.create(Object.getPrototypeOf(child3), Object.getOwnPropertyDescriptors(child3)));
p.flush();

// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (for .. in), .keys() -- child4 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`(for .. in), .keys() -- child4`)

const child4Props = {};

for (let child4PropName in child4) {
    child4Props[child4PropName] = child4.hasOwnProperty(child4PropName) ? "self" : "inherited";
}

p.buff(`Object${clr.func}.keys${clr.reset}(${clr.var}child4${clr.reset})`, clr.sep, Object.keys(child4));
p.flush();
p.buff(`${clr.var}propNames${clr.reset}`, `\n${clr.sep}`, child4Props);
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}child4${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(child4));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object.prototype ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("Object.prototype")

p.buff(`${clr.var}Object.prototype${clr.reset}`, `\n${clr.sep}`, Object.prototype);
p.buff(`${clr.var}Object.prototype.constructor${clr.reset}`, `\n${clr.sep}`, Object.prototype.constructor);
p.flush();

const getFunc = Object.getOwnPropertyDescriptors(Object.prototype)["__proto__"]["get"];

p.buff(`Object.prototype["__proto__"]["get"]`, clr.sep, JSON.stringify(getFunc, (k, v) => v === getFunc ? String(v) : v, 2));
p.flush();


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Object.prototype ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("Object.prototype")

function CustomCtr1() {
    // noinspection JSUnusedGlobalSymbols - marker
    this.title = "CustomCtr1";
}

function CustomCtr2() {
    // noinspection JSUnusedGlobalSymbols - marker
    this.title = "CustomCtr2";
}

// Прототип - объект сохраняем, конструктор - заменяем на первый
CustomCtr2.prototype.constructor = CustomCtr1;

const ccObj1 = new CustomCtr1();
const ccObj1ctr = Object.getPrototypeOf(ccObj1)?.constructor;

const ccObj2 = new CustomCtr2();
const ccObj2proto = CustomCtr2.prototype;

p.buff(`${clr.var}ccObj2proto${clr.reset}`, `\n${clr.sep}`, ccObj2proto);
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}ccObj2proto${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(ccObj2proto));

p.buff(`ccObj${clr.var}2proto${clr.reset} === CustomCtr2${clr.func}.prototype${clr.reset}`, clr.sep, ccObj2proto === CustomCtr2.prototype);
p.buff(`ccObj${clr.var}2proto${clr.reset} === Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}ccObj2${clr.reset})`, clr.sep, ccObj2proto === Object.getPrototypeOf(ccObj2));
p.buff(`ccObj${clr.var}2proto${clr.reset} === ccObj2${clr.func}.__proto__${clr.reset}`, clr.sep, ccObj2proto === ccObj2.__proto__);
p.buff();
p.buff(`ccObj${clr.var}1ctr${clr.reset} === ccObj${clr.var}2proto?.constructor${clr.reset}`, clr.sep, ccObj1ctr === ccObj2proto?.constructor);
p.buff(`${clr.var}CustomCtr1${clr.reset} === CustomCtr2${clr.func}.prototype?.constructor${clr.reset}`, clr.sep, CustomCtr1 === CustomCtr2.prototype?.constructor);
p.buff(`${clr.var}CustomCtr1${clr.reset} === Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}ccObj2${clr.reset})${clr.func}?.constructor${clr.reset}`, clr.sep, CustomCtr1 === Object.getPrototypeOf(ccObj2)?.constructor);
p.buff(`${clr.var}CustomCtr1${clr.reset} === ccObj2${clr.func}.__proto__?.constructor${clr.reset}`, clr.sep, CustomCtr1 === ccObj2.__proto__?.constructor);
p.flush();
