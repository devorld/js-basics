import {powerOfTwo} from '../../Types/Object/iterate.js'
import {CONSOLE_TEXT_COLOR} from '../../utils/console.js'
import {monolog} from '../../utils/monolog.js'

const p = {
    head: monolog?.printHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cFunc: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

p.head('[ , ,,, , ... ] = Array');

let array = [1, 2, 3, 4, 5, 6, 7];
let [a1, a2, /* a3 */, /* a4 */, ...a567] = array;
p.buff(a1); // a1 === 1
p.buff(a2); // a2 === 2
// p.buff(a3); a3 === 3
// p.buff(a4); a4 === 4
p.buff(a567); // a567 === Array(3) [5, 6, 7]
p.flush();

p.head('[ , , , = default, = defCalc(), ... ] = [empty]');
const defCalc = () => "defCalc()";
let [b1, b2 = "defaultValue", , b4 = defCalc(), ...b5] = [];
p.buff(`${p.cVar}b1${p.cNo}`, '█►', b1); // b1 === undefined
p.buff(`${p.cVar}b2${p.cNo}`, '█►', b2); // b2 === 'defaultValue'
p.buff(`${p.cVar}b4${p.cNo}`, '█►', b4); // b4 === defCalc()
p.buff(`${p.cVar}b5${p.cNo}`, '█►', b5); // b5 === []
p.flush();

p.head('[ .. ] = [Object Iterable] and _function_ as _default_');
let [c1, c2, c3, , , , , , , , c11, , , , c15, c16, c17, c18 = (() => Math.pow(2, 18))(), c19 = 2**19] = powerOfTwo;
p.buff("2 ** 1", '█►', c1);         // c1 === 2
p.buff("2 ** 2", '█►', c2);         // c2 === 4
p.buff("2 ** 3", '█►', c3);         // c3 === 8
p.buff("2 ** 11", '█►', c11);        // c11 === 2048
p.buff("2 ** 15", '█►', 2**15, c15); // c10 === 32768
p.buff("2 ** 16", '█►', 2**16, c16); // c10 === 65536
p.buff("2 ** 17", '█►', 2**17, c17); // c17 === undefined
p.buff("2 ** 18", '█►', 2**18, c18); // c18 === 262144
p.buff("2 ** 19", '█►', 2**19, c19); // c19 === 524288
p.flush();


p.head('swap [girlName, boyName] = [boyName, girlName]')

let girlName = "Валя", boyName = "Женя";
p.buff('girlName', '█►', girlName); // girlName === "Валя"
p.buff('boyName', '█►', boyName);   // boyName  === "Женя"

[girlName, boyName] = [boyName, girlName];
p.buff('[girlName, boyName] = [boyName, girlName]');
p.buff('girlName', '█►', girlName); // girlName === "Женя"
p.buff('boyName', '█►', boyName);   // boyName  === "Валя"
p.flush();
