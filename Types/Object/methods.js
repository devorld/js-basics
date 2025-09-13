import {CTC} from '../../utils/console.js'
import {printer} from '../../utils/monolog.js'
import {objSymExample} from './create.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})

const objSymChild = Object.defineProperties(Object.create(objSymExample), Object.getOwnPropertyDescriptors(objSymExample));

Object.defineProperty(objSymChild, "5", {enumerable: false});
Object.defineProperty(objSymChild, Object.getOwnPropertySymbols(objSymChild)[0], {enumerable: false});

// ░░░░░░░░░░░░░░░░░░░░░░░░ console.dir(objSymChild) - ❌  no enumerable prop "5" ░░░░░░░░░░░░░░░░░░░░░░░░
p.title("console.dir(objSymChild) - ❌  no enumerable prop \"5\"");
console.dir(objSymChild);

// ░░░░░░░░░░░░░░░░░ console.dir(Object.getOwnPropertyDescriptors(objSymChild)) - ✅ All ░░░░░░░░░░░░░░░░░
p.title("console.dir(Object.getOwnPropertyDescriptors(objSymChild)) - ✅  All");
console.dir(Object.getOwnPropertyDescriptors(objSymChild));

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ objSymChild ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title(`${clr.var}objSymChild${clr.reset}`);
p.buff(`JSON${clr.func}.stringify${clr.reset}(objExample)`, clr.sep, JSON.stringify(objSymChild));
p.buff(`${clr.var}objSymChild${clr.reset}`, `\n${clr.sep}`, objSymChild);


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ All, non-symbol, symbol properties: keys and values ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("All, non-symbol, symbol properties: keys and values");

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ All = 8 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("All = 8");
p.buff(`${clr.func}Reflect.ownKeys${clr.reset}(objSymChild)`, clr.sep, Reflect.ownKeys(objSymChild));
p.flush({keepMaxLengths: true})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ non-symbol all keys = 6 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("non-symbol all keys = 6");
p.buff(`Object${clr.func}.getOwnPropertyNames${clr.reset}(objSymChild)`, clr.sep, Object.getOwnPropertyNames(objSymChild));
p.flush({keepMaxLengths: true})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ non-symbol only enumerable keys = 5 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("non-symbol only enumerable keys = 5");
p.buff(`Object${clr.func}.keys${clr.reset}(objSymChild)`, clr.sep, Object.keys(objSymChild));

const keysForIn = [];

for (let key in objSymChild) {
    keysForIn.push(key);
}

p.buff(`(${clr.func}for .. in ${clr.var}objSymChild${clr.reset})`, clr.sep, keysForIn);

p.buff(`Object${clr.func}.values${clr.reset}(objSymChild)`, clr.sep, Object.values(objSymChild));
p.buff(`Object${clr.func}.entries${clr.reset}(objSymChild)`, clr.sep, Object.entries(objSymChild));
p.flush({keepMaxLengths: true})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ symbol all keys = 2 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("symbol all keys = 2");
p.buff(`Object${clr.func}.getOwnPropertySymbols${clr.reset}(objSymChild)`, clr.sep, Object.getOwnPropertySymbols(objSymChild));
p.flush();
