import {CONSOLE_TEXT_COLOR} from '../../../utils/console.js'
import {monolog} from '../../../utils/monolog.js'

const p = {
    head: monolog?.printHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cProp: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

let weakMap = new WeakMap();

let weakKey = {}; // must be an Object

p.buff(`${p.cVar}weakMap${p.cNo}`, weakMap);

p.buff(`weakMap${p.cProp}.set${p.cNo}(weakKey)`, weakMap.set(weakKey, 1));

p.buff(`${p.cVar}weakMap${p.cNo}`, weakMap);

p.buff(`weakMap${p.cProp}.get${p.cNo}(weakKey)`, weakMap.get(weakKey));
p.buff(`weakMap${p.cProp}.has${p.cNo}(weakKey)`, weakMap.has(weakKey));
p.buff(`weakMap${p.cProp}.delete${p.cNo}(weakKey)`, weakMap.delete(weakKey));
p.buff(`weakMap${p.cProp}.has${p.cNo}(weakKey)`, weakMap.has(weakKey));

weakKey = null; // - now item in weakMap is unreachable and will be deleted by Garbage Collector

p.flush();
