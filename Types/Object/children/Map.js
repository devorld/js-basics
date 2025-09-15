import {CONSOLE_TEXT_COLOR} from '../../../utils/console.js'
import {monolog} from '../../../utils/monolog.js'

import {powerOfTwo} from '../interface/iterate.js'

const p = {
    head: monolog?.printHeader || console.log,
    buff: monolog?.pushStringParts?.bind(monolog) || console.log,
    flush: monolog?.printLines?.bind(monolog) || console.log,
    cNo: CONSOLE_TEXT_COLOR?.Reset || '',
    cFunc: CONSOLE_TEXT_COLOR?.FgMagenta || '',
    cVar: CONSOLE_TEXT_COLOR?.FgBlue || '',
};

// noinspection JSCheckFunctionSignatures - no .length and [index] getter, bug has [Symbol.iterator]
const array = Array.from(powerOfTwo).map(e => ([e, [e]]));
p.buff(`${p.cVar}array${p.cNo}`, '█►');
p.flush();
p.buff(array);
p.flush();

let key = 999, value = 999;

// noinspection JSCheckFunctionSignatures
const mapObj = new Map(array);

p.buff(`${p.cVar}mapObj${p.cNo}`, '█►');
p.flush();

p.buff(mapObj);
p.flush();

p.buff(`${p.cVar}mapObj${p.cFunc}.forEach${p.cNo}((value, key, mapObj)`, '█►');
p.flush();

mapObj.forEach((value, key, map) => p.buff(key, value, map.toString()));
p.flush({tableView: true});

p.buff(`mapObj${p.cFunc}.size${p.cNo}`, '█►', mapObj.size);
p.buff(`mapObj${p.cFunc}.has${p.cNo}(key)`, '█►', mapObj.has(key));
p.buff(`mapObj${p.cFunc}.keys${p.cNo}()`, '█►', mapObj.keys());
p.buff(`mapObj${p.cFunc}.values${p.cNo}()`, '█►', mapObj.values());
p.buff(`mapObj${p.cFunc}.entries${p.cNo}()`, '█►', mapObj.entries()); // returns IterableObj with el = [ключ, значение], default for 'for (el..of..mapObj) {}'

p.buff(`mapObj${p.cFunc}.get${p.cNo}(key)`, '█►', mapObj.get(key));

p.buff(`mapObj${p.cFunc}.groupBy${p.cNo}()`, '█►');
p.buff(Map.groupBy(mapObj, e => e.toString()[0] === '1'));

p.buff(`mapObj${p.cFunc}.set${p.cNo}(key, [value])`, '█►', mapObj.set(key, [value]));
p.buff(`mapObj${p.cFunc}.delete${p.cNo}(key)`, '█►', mapObj.delete(key));
p.buff(`${p.cVar}mapObj${p.cNo}`, '█►', mapObj);
// noinspection JSVoidFunctionReturnValueUsed
p.buff(`mapObj${p.cFunc}.clear${p.cNo}()`, '█►', mapObj.clear());
p.buff(`${p.cVar}mapObj${p.cNo}`, '█►', mapObj);
p.flush();

// anti-pattern
p.head('Anti-pattern');

key = value = 999;
p.buff(`mapObj[${key}] = [${value}]`, '█►', mapObj[key.toString()] = [value]);

key = value = 666
p.buff(`mapObj[${key}] = [${value}]`, '█►', mapObj[key.toString()] = [value]);

p.buff(`mapObj${p.cFunc}.get${p.cNo}(key)`, '█►', mapObj.has(key));
p.buff(`mapObj${p.cFunc}.get${p.cNo}(key.toString())`, '█►', mapObj.has(key.toString()));
p.buff(`${p.cVar}mapObj${p.cNo}`, '█►', mapObj);
p.buff(`mapObj${p.cFunc}.size${p.cNo}`, '█►', mapObj.size);
p.flush();

const arrayOfPairs = Object.entries(mapObj);
p.buff(`${p.cVar}array${p.cNo}OfPairs = Object.entries(mapObj)`, '█►', arrayOfPairs);

const mapFrom_ArrayOfPairs = new Map(arrayOfPairs);
p.buff(`${p.cVar}map${p.cNo}From_ArrayOfPairs = new Map(arrayOfPairs)`, '█►', mapFrom_ArrayOfPairs);
p.flush();

p.buff(`${p.cVar}obj${p.cNo}FromMap = Object.fromEntries(map_pairs.entries())`, '█►');
p.flush();

p.buff('█►', Object.fromEntries(mapFrom_ArrayOfPairs.entries()));
p.flush();

p.buff('same');
p.buff(`${p.cVar}obj${p.cNo}FromMap = Object.fromEntries(map_pairs)`, '█►');
p.flush();

p.buff('█►', Object.fromEntries(mapFrom_ArrayOfPairs));
p.flush();

const maps = new Map([[1, 1], [2, 2], [3, new Map([['a', 'a'], ['b', new Map([[1, 1]])]])]]);

// noinspection JSCheckFunctionSignatures - special data accessed by ref
mapObj.set(0, maps);
console.log(new Map([[1, 1], [2, 2], [3, new Map([['a', 'a'], ['b', new Map([[1, 1]])]])]]));
console.log(mapObj);
p.buff('█►', mapObj);
p.flush();
console.log({wrap: {mapObj}});
console.dir(Object.getOwnPropertyDescriptors(mapObj), {showHidden: true});
console.log("JSON:", JSON.stringify({wrap: {mapObj}}));
