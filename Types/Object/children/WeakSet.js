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

let weakSet = new WeakSet(); // - чтоб знать, какие объекты мы уже ..., их наличие в реестре говорит об этом

let weakValue = {}; // must be an Object

p.buff(`${p.cVar}weakSet${p.cNo}`, weakSet);

p.buff(`weakSet${p.cProp}.set${p.cNo}(weakKey)`, weakSet.add(weakValue));

p.buff(`${p.cVar}weakSet${p.cNo}`, weakSet);

p.buff(`weakSet${p.cProp}.has${p.cNo}(weakKey)`, weakSet.has(weakValue));
p.buff(`weakSet${p.cProp}.delete${p.cNo}(weakKey)`, weakSet.delete(weakValue));
p.buff(`weakSet${p.cProp}.has${p.cNo}(weakKey)`, weakSet.has(weakValue));

weakValue = null; // - now item in weakSet is unreachable and will be deleted by Garbage Collector

p.flush();
