import {CONSOLE_TEXT_COLOR} from '../../utils/console.js'
import {monolog} from '../../utils/monolog.js'
import {objSymExample} from './create.js'

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

const p = {
    head: monolog?.printHeader || console.log,
    title: monolog?.printSubHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cProp: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

if (isMainModule) {
    p.buff(`${p.cVar}objExample${p.cNo}`, '█►', objSymExample);
    p.flush();

    // ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (for .. in) -- objSymExample and [[Prototype]]es ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    p.head("(for .. in) -- objSymExample and [[Prototype]]es")

    const props = Object.create(null);

    for (let pName in objSymExample) {
        props[pName] = objSymExample.hasOwnProperty(pName) ? "self" : "inherited";
    }

    p.buff(`${p.cProp}props${p.cNo}`, `\n█►`, props);

    p.head("without Symbolic keys");
    p.title(`${p.cProp}.keys() .values() .entries()${p.cNo} - only {enumerable: true}, ❌ no [[Prototype]] properties`);
    p.buff(`JSON${p.cProp}.stringify${p.cNo}(objExample)`, '█►', JSON.stringify(objSymExample));
        p.buff(`Object${p.cProp}.keys${p.cNo}(objExample)`, '█►', Object.keys(objSymExample));
    p.buff(`Object${p.cProp}.values${p.cNo}(objExample)`, '█►', Object.values(objSymExample));
    p.buff(`Object${p.cProp}.entries${p.cNo}(objExample)`, '█►', Object.entries(objSymExample));
    p.buff(`Object${p.cProp}.getOwnPropertyNames${p.cNo}(objExample)`, '█►', Object.getOwnPropertyNames(objSymExample));
    p.buff(`Object${p.cProp}.getOwnPropertyDescriptors${p.cNo}(objExample)`, '█►', Object.getOwnPropertyDescriptors(objSymExample));
    p.flush();

    p.head("only Symbolic keys");
    p.buff(`Object${p.cProp}.getOwnPropertySymbols${p.cNo}(objExample)`, '█►', Object.getOwnPropertySymbols(objSymExample));
    p.flush();

    p.head("with Symbolic keys");
    p.buff(`Reflect${p.cProp}.ownKeys${p.cNo}(objExample)`, '█►', Reflect.ownKeys(objSymExample));
    p.buff();

    p.buff(`${p.cVar}objExample${p.cNo}`, '█►', objSymExample);
    p.flush();
}
