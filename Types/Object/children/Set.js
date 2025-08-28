import {rangeObj, powerOfTwo} from '../iterate.js'
import {monolog} from '../../../utils/monolog.js'
import {CONSOLE_TEXT_COLOR} from '../../../utils/console.js'

const p = {
    head: monolog?.printHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cProp: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

// noinspection JSCheckFunctionSignatures
const setObj = new Set(powerOfTwo);

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ write ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head('write');
p.buff(`${p.cVar}setObj${p.cNo}`, '█►', setObj.keys());
// noinspection JSVoidFunctionReturnValueUsed
p.buff(`setObj${p.cProp}.clear${p.cNo}()`, '█►', setObj.clear());
p.buff("setObj - cleared", '█►', setObj);
p.buff(`setObj${p.cProp}.add${p.cNo}(555)`, '█►', new Set(setObj.add(555)));
p.buff(`setObj${p.cProp}.add${p.cNo}(666)`, '█►', new Set(setObj.add(666)));
p.buff(`setObj${p.cProp}.add${p.cNo}(777)`, '█►', new Set(setObj.add(777)));
p.buff(`${p.cVar}setObj${p.cNo}`, '█►', setObj);
p.buff(`setObj${p.cProp}.delete${p.cNo}(666)`, '█►', setObj.delete(666));
p.buff(`setObj${p.cProp}.delete${p.cNo}(666)`, '█►', setObj.delete(666));
p.buff(`${p.cVar}setObj${p.cNo}`, '█►', new Set(setObj));
p.flush({keepMaxLengths: true});

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ new ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head('new');
const setLikeObj = {
    size: 0,
    has: (el) => !!el,
    keys: () => rangeObj[Symbol.iterator](),
};
const setObjUnited = setObj.union(setLikeObj);
p.buff("setObj", '█►', setObj);
p.buff("setObjUnited = setObj.union(setLikeObj)", '█►', setObjUnited);

p.buff(`setObj.difference`, '█►', setObj.difference(setLikeObj));
p.buff(`setObj.intersection`, '█►', setObj.intersection(setLikeObj));
p.buff(`setObj.symmetricDifference`, '█►', setObj.symmetricDifference(setLikeObj));
p.flush({keepMaxLengths: true});

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ read ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head('read');
p.buff(`setObj${p.cProp}.size${p.cNo}`, '█►', setObj.size);
p.buff(`setObj${p.cProp}.keys${p.cNo}`, '█►', setObj.keys());
p.buff(`setObj${p.cProp}.entries${p.cNo}`, '█►', setObj.entries());
p.buff(`setObj${p.cProp}.values${p.cNo}`, '█►', setObj.values());
p.flush({keepMaxLengths: true});

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ comparison ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head('comparison');
p.buff(`setObj${p.cProp}.has${p.cNo}`, '█►', setObj.has(2));
p.buff(`setObj${p.cProp}.isDisjointFrom${p.cNo}`, '█►', setObj.isDisjointFrom(setLikeObj)); // Множества не пересекаются?
p.buff(`setObj${p.cProp}.isSubsetOf${p.cNo}`, '█►', setObj.isSubsetOf(setLikeObj)); // Включён в другое множество?
p.buff(`setObj${p.cProp}.isSupersetOf${p.cNo}`, '█►', setObj.isSupersetOf(setLikeObj)); // Включает в себя другое множество?
p.flush();

p.head('for .. Each/of');
p.buff(`setObj${p.cProp}.entries${p.cNo}`, '█►', Array.from(setObj).join(' '));
let str = "";
setObj.forEach(el => str += el + ' ');
p.buff(`setObj${p.cProp}.forEach${p.cNo}()`, '█►', str);

str = "";
for (let el of setObj) {
    str += el + ' ';
}
p.buff(`${p.cProp}for${p.cNo} ( ${p.cProp}of${p.cNo} setObj)`, '█►', str);
p.flush();
