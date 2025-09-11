import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object - property and descriptor (object with flags/attributes) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Object - property and descriptor (object with flags/attributes)`);

const obj1 = {
    a: 1,
    2: "b",
    child: {
        value: "Lorem",
        text: "ipsum",
    },
};

let obj1Desc, objADesc, objWDesc, objWWDesc;

p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, obj1Desc = Object.getOwnPropertyDescriptors(obj1));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1Desc["a"]${clr.reset})`, `\n${clr.sep}`, objADesc = Object.getOwnPropertyDescriptors(obj1Desc["a"]));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}objADesc["writable"]${clr.reset})`, `\n${clr.sep}`, objWDesc = Object.getOwnPropertyDescriptors(objADesc["writable"]));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}objWDesc["writable"]${clr.reset})`, `\n${clr.sep}`, objWWDesc = Object.getOwnPropertyDescriptors(objWDesc["writable"]));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object property descriptor is object, so... ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Object property attributes - we get as object (descriptor) with properties, so...`);

const getWritableAttribute = (object = {writable: true}, nestLevel = 0) => nestLevel < 100
    ? getWritableAttribute(Object.getOwnPropertyDescriptors(object)["writable"], nestLevel + 1)
    : [Object.getOwnPropertyDescriptors(object)["writable"], nestLevel];

p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(
    Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(
        Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(
            Object${clr.func}.getOwnPropertyDescriptors${clr.reset}({writable: true}${clr.reset})${clr.var}["writable"]${clr.reset}
        )${clr.var}["writable"]
    )${clr.var}["writable"]
)${clr.var}["writable"]${clr.reset}`, `\n${clr.sep}`, Object.fromEntries([getWritableAttribute().reverse()]));
p.flush();

// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Existing prop - change Object.defineProperty() ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Existing prop - change Object${clr.func}.defineProperty()${clr.reset}`);

p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"child", {enumerable: false}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "child", {enumerable: false}));
p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"child", {value: ["Lorem", "ipsum"]}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "child", {value: ["Lorem", "ipsum"]}));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(obj1)${clr.var}["child"]${clr.reset}`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1)["child"]);
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ New prop - create Object.defineProperty() ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`New prop - create Object${clr.func}.defineProperty()${clr.reset}`);

p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"parent", {value: [333, 666, 999], configurable: true}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "parent", {
    value: [333, 666, 999],
    configurable: true
}));
p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"parent", {enumerable: true}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "parent", {enumerable: true}));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(obj1)${clr.var}["parent"]${clr.reset}`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1)["parent"]);
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ writable - property attribute of object ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`${clr.var}writable${clr.reset} - can change value of prop`)

try {
    p.buff(`Object${clr.func}.defineProperty${clr.reset}(Object.create(obj1), "name", {value: "init",
    ${clr.var}writable: false${clr.reset}})
["name"]${clr.func} = ${clr.reset}"new_value"`);
    Object.defineProperty(Object.create(obj1), "name", {value: "init", writable: false})["name"] = "new_value";
} catch (e) {
    p.flush()
    p.buff("🐞", clr.sep, e.message);
}

p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ enumerable - get prop in enumerator (Object.keys(), for..in) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`${clr.var}enumerable${clr.reset} - get prop in enumerator (Object${clr.func}.keys()${clr.reset}, ${clr.func}for..in${clr.reset})`)

p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1));
p.buff(`Object${clr.func}.entries${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.entries(obj1));
p.buff(`Object${clr.func}.defineProperty${clr.reset}(${clr.var}obj1${clr.reset}, ${clr.var}"a"${clr.reset}, ${clr.var}{enumerable: false}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "a", {enumerable: false}));
p.buff(`Object${clr.func}.entries${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.entries(obj1));
p.flush();

// ▓▓▓▓▓ configurable - can change attrs of or delete prop (Object.defineProperty(), del obj.prop) ▓▓▓▓▓
p.head(`${clr.var}configurable${clr.reset} - can change attrs of or delete prop (Object${clr.func}.defineProperty()${clr.reset}, ${clr.func}del${clr.reset} obj${clr.var}.prop${clr.reset})`);

p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1));
p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"parent", {writable: true}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "parent", {writable: true}));
p.buff(`obj1${clr.var}["parent"]${clr.reset} ${clr.func}=${clr.reset} ${clr.var}{name: "Alex"}${clr.reset}`, `\n${clr.sep}`, obj1["parent"] = {name: "Alex"});
p.flush();
p.buff(`${clr.func}delete${clr.reset} obj1${clr.var}["2"]${clr.reset}`, clr.sep, delete obj1["2"]);
p.flush();
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1));
p.flush();

try {
    p.buff(`Object${clr.func}.defineProperty${clr.reset}(obj1, ${clr.var}"parent", {configurable: false}${clr.reset})`, `\n${clr.sep}`, Object.defineProperty(obj1, "parent", {configurable: false}));
    p.flush();

    delete obj1.parent;
} catch (e) {
    p.buff("🐞", clr.sep, e.message);
    p.flush()
}

p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Object.defineProperties(obj1, {prop1: {attr: }, prop2: {attr: }}) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Object${clr.func}.defineProperties${clr.reset}(obj1, ${clr.var}{prop1: {attr: }, prop2: {attr: }}${clr.reset})`);

p.buff(`${clr.var}obj1${clr.reset}`, `\n${clr.sep}`, obj1);
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`,
    Object.fromEntries(Object.entries(
        Object.getOwnPropertyDescriptors(obj1))
        .map(([k, v]) =>
            [
                k,
                Object.fromEntries(Object.entries(v).filter(([key]) => key === "enumerable")),
            ]
        )
    ));
p.buff(`Object${clr.func}.defineProperties${clr.reset}(obj1, ${clr.var}{
    a: {enumerable: true},
    child: {enumerable: true},
}${clr.reset})`, `\n${clr.sep}`, Object.defineProperties(obj1, {
    a: {enumerable: true},
    child: {enumerable: true},
}));
p.buff(`${clr.var}obj1${clr.reset}`, `\n${clr.sep}`, obj1);
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Clone object - with descriptors ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Clone object - with descriptors`);

let obj2;

p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj1));
p.buff(`Object${clr.func}.defineProperties${clr.reset}(${clr.var}obj2 = {}${clr.reset}, Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj1${clr.reset}))`, `\n${clr.sep}`, Object.defineProperties(obj2 = {}, Object.getOwnPropertyDescriptors(obj1)));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}obj2${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(obj2));

p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Set read-only properties ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Set read-only properties`);

let obj3 = {};

Object.defineProperties(obj3, Object.getOwnPropertyDescriptors(obj2));
obj3["b"] = obj2["b"] = obj1["b"] = 2;

p.buff(`Object${clr.func}.preventExtensions${clr.reset}(obj1) | set${clr.func}Block${clr.reset}Props(${clr.var}Add${clr.reset})`, `\n${clr.sep}`, Object.preventExtensions(obj1));
p.buff(`Object${clr.func}.isExtensible${clr.reset}(obj1) ${clr.sep} ${Object.isExtensible(obj1)}`);
try {
    obj1.c = 3
} catch (e) {
    p.buff(`🐞 obj1.c ${clr.func}=${clr.reset} 3 ${clr.sep} ${e.message}`);
}

p.buff(`Object${clr.func}.seal${clr.reset}(obj2) | set${clr.func}Block${clr.reset}Props(${clr.var}Add + Del${clr.reset}) + setAllProps(${clr.var}{configurable: false}${clr.reset})`, `\n${clr.sep}`, Object.seal(obj2));
p.buff(`Object${clr.func}.isSealed${clr.reset}(obj2) ${clr.sep} ${Object.isSealed(obj2)}`);
try {
    obj2.c = 3
} catch (e) {
    p.buff(`🐞 obj2.c ${clr.func}=${clr.reset} 3 ${clr.sep} ${e.message}`);
}
p.buff();

p.buff(`Object${clr.func}.freeze${clr.reset}(obj3) | set${clr.func}Block${clr.reset}Props(${clr.var}Add + Del + Change${clr.reset}) + setAllProps(${clr.var}{configurable: false, writable: false}${clr.reset})`, `\n${clr.sep}`, Object.freeze(obj3));
p.buff(`Object${clr.func}.isFrozen${clr.reset}(obj3) ${clr.sep} ${Object.isFrozen(obj3)}`);
try {
    obj3.c = 3
} catch (e) {
    p.buff(`🐞 obj3.c ${clr.func}=${clr.reset} 3 ${clr.sep} ${e.message}`);
}
p.buff();

p.flush();
