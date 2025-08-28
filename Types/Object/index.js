import {CONSOLE_TEXT_COLOR} from '../../utils/console.js'
import {monolog} from '../../utils/monolog.js'

const p = {
    head: monolog?.printHeader || console.log,
    title: monolog?.printSubHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cProp: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

const obj1 = {
    a: 1,
    b: 3,
    c: Symbol(4),
    5: 'd',
    6: 'e',
    7: Symbol('f'),
    [Symbol(8)]: 'g',
    [Symbol('h')]: 9
};

p.buff(`${p.cVar}obj1${p.cNo}`, '█►', obj1);
p.flush();

p.head("without Symbolic keys");
p.title(".keys() .values() .entries()");
p.buff(`JSON${p.cProp}.stringify${p.cNo}(obj1)`, '█►', JSON.stringify(obj1));
p.buff(`Object${p.cProp}.keys${p.cNo}(obj1)`, '█►', Object.keys(obj1));
p.buff(`Object${p.cProp}.values${p.cNo}(obj1)`, '█►', Object.values(obj1));
p.buff(`Object${p.cProp}.entries${p.cNo}(obj1)`, '█►', Object.entries(obj1));
p.buff(`Object${p.cProp}.getOwnPropertyNames${p.cNo}(obj1)`, '█►', Object.getOwnPropertyNames(obj1));
p.buff(`Object${p.cProp}.getOwnPropertyDescriptors${p.cNo}(obj1)`, '█►', Object.getOwnPropertyDescriptors(obj1));
p.flush();

p.head("only Symbolic keys");
p.buff(`Object${p.cProp}.getOwnPropertySymbols${p.cNo}(obj1)`, '█►', Object.getOwnPropertySymbols(obj1));
p.flush();

p.head("with Symbolic keys");
p.buff(`Reflect${p.cProp}.ownKeys${p.cNo}(obj1)`, '█►', Reflect.ownKeys(obj1));
p.buff();

p.buff(`${p.cVar}obj1${p.cNo}`, '█►', obj1);
p.flush();
