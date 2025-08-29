import {objExample} from '../../Types/Object/index.js'
import {CTC} from '../../utils/console.js'
import {printer} from '../../utils/monolog.js'

const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})
const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})


p.head(`{ ${clr.var}prop1${clr.reset}, ${clr.var}prop2${clr.reset}, ...${clr.var}propsRest${clr.reset} } = obj1`);

let obj1 = {prop1: 1, prop2: 2, prop3: 3, prop4: 4, prop5: 5};
let {prop1, prop2, ...propsRest} = obj1;
p.buff(`${clr.var}obj1${clr.reset}`, "█►", obj1);
p.buff(`${clr.var}prop1${clr.reset}`, "█►", prop1); // prop1 === 1
p.buff(`${clr.var}prop2${clr.reset}`, "█►", prop2); // prop2 === 2
// p.buff(`${clr.var}prop3${clr.reset}`, "█►", prop3); prop3 === 3
// p.buff(`${clr.var}prop4${clr.reset}`, "█►", prop4); prop4 === 4
p.buff(`${clr.var}propsRest${clr.reset}`, "█►", propsRest); // propsRest === {prop3: 3, prop4: 4, prop5: 5}
p.flush();


p.head(`{ prop5= 55, prop6 = 66, prop7 = prop5,\n prop8 = function () {console.log(this); return this;}, ...propsTail } = obj1`);

const contextLog = function () {
    console.log('>>', this);
    return this;
};
let {prop5 = 55, prop6 = 66, prop7 = prop5, prop8 = contextLog(), ...propsTail} = obj1;
p.buff(`${clr.var}obj1${clr.reset}`, "█►", obj1);
p.buff(`${clr.var}prop5${clr.reset}`, "█►", prop5); // prop1 === 1
p.buff(`${clr.var}prop6${clr.reset}`, "█►", prop6); // prop1 === 1
p.buff(`${clr.var}prop7${clr.reset}`, "█►", prop7); // prop1 === 1
p.buff(`${clr.var}prop8${clr.reset}`, "█►", prop8); // prop1 === 1
p.buff(`${clr.var}propsTail${clr.reset}`, "█►", propsTail); // prop1 === 1
p.flush();


p.head(`{ ${clr.var}a${clr.reset}, ${clr.var}b${clr.reset}, ${clr.var}c${clr.reset} } = objExample`);

let {a, b, c} = objExample;
p.buff(`${clr.var}objExample${clr.reset}`, "█►", objExample);
p.buff(`${clr.var}a${clr.reset}`, "█►", a); // a === 1
p.buff(`${clr.var}b${clr.reset}`, "█►", b); // b === 3
p.buff(`${clr.var}c${clr.reset}`, "█►", c); // c === Symbol(4)
p.flush();


p.title("Symbolic props")

const sym8 = Symbol(8);
const symH = Symbol('h');
p.buff(`${clr.var}objExample[sym8]${clr.reset}`, "█►", objExample[sym8]); // undefined
p.buff(`${clr.var}objExample[symH]${clr.reset}`, "█►", objExample[symH]); // undefined
objExample[sym8] = 88;
objExample[symH] = 'HH';
p.buff(`${clr.func}objExample[sym8]${clr.reset} = 88`, "█►", objExample[sym8] = 88);
p.buff(`${clr.func}objExample[symH]${clr.reset} = 'HH'`, "█►", objExample[symH] = 'HH');
p.buff(`${clr.var}objExample${clr.reset}`, "█►", objExample);
p.flush();
p.buff(`${clr.var}objExample[sym8]${clr.reset}`, "█►", objExample[sym8], typeof objExample[sym8]); // 88
p.buff(`${clr.var}objExample[symH]${clr.reset}`, "█►", objExample[symH], typeof objExample[symH]); // 'HH'
p.flush();


p.title(`naming {"5": ${clr.var}propFive${clr.reset}, [sym8]: ${clr.var}propSym8${clr.reset}, [symH]: ${clr.var}propSymH${clr.reset}} = objExample`)
// p.title(`target prop naming {"5": ${clr.var}propFive${clr.reset}, [sym8]: ${clr.var}propSym8${clr.reset}, [symH]: ${clr.var}propSymH${clr.reset}} = objExample`)

let {"5": propFive, [sym8]: propSym8, [symH]: propSymH} = objExample;
p.buff(`${clr.var}objExample${clr.reset}`, "█►", objExample);
p.buff(`${clr.var}propFive${clr.reset}`, "█►", propFive); // propFive === d
p.buff(`${clr.var}propSym8${clr.reset}`, "█►", propSym8); // propSym8 === 88
p.buff(`${clr.var}propSymH${clr.reset}`, "█►", propSymH); // propSymH === HH
p.flush();


p.head(`reuse variables ({ ${clr.var}prop1${clr.reset}, prop2: ${clr.var}b${clr.reset}, ...${clr.var}propFive${clr.reset} }\n = { prop: -999, prop0: 0, prop1: 'a1', prop2: 'b2', prop3: 'c3' })`);

({prop1, prop2: b, ...propFive} = {prop: -999, prop0: 0, prop1: 'a1', prop2: 'b2', prop3: 'c3'})
p.buff(`${clr.var}prop1${clr.reset}`, "█►", prop1);       // prop1 === a1
p.buff(`${clr.var}b${clr.reset}`, "█►", b);               // prop2 === b2
p.buff(`${clr.var}propFive${clr.reset}`, "█►", propFive); // propFive === {"prop":-999,"prop0":0,"prop3":"c3"}}
p.flush();


p.head(`let {l1: { l2: { l3: { p45: ${clr.var}movie${clr.reset}}}}} = {l1: {l2: {l3: {p45: "Inception"}}}}`);

let {l1: {l2: {l3: {p45: movie}}}} = {l1: {l2: {l3: {p45: "Inception"}}}};
p.buff(`${clr.var}movie${clr.reset}`, "█►", movie);
p.flush();


p.head(`let {s1: {s2: {s3: {s45: ${clr.var}song${clr.reset}} = {}} = {}}} = {s1: {s25: null}}`);

let {s1: {s2: {s3: {s45: song} = {}} = {}}} = {s1: {s25: null}};
p.buff(`${clr.var}song${clr.reset}`, "█►", song);
p.flush();
