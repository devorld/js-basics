import { monolog } from '../../../utils/monolog.js';
import { CONSOLE_TEXT_COLOR } from "../../../utils/console.js";

const printAdd = monolog?.pushStringParts?.bind(monolog) || console.log;
const printAll = monolog?.printLines?.bind(monolog) || console.log;
const cFunc = CONSOLE_TEXT_COLOR?.FgMagenta || '';
const cVar = CONSOLE_TEXT_COLOR?.FgBlue || '';
const cHint = CONSOLE_TEXT_COLOR?.FgGray || '';
const cNo = CONSOLE_TEXT_COLOR?.Reset || '';

const arr1 = ['H', 'e', 'l', 'l', 'o'];
const arr2 = Array(5);
const arr3 = new Array(5);

console.log(arr1, arr2, arr3);

console.log('\n░░░░░░░░░░░░░░░░ for (;;) ░░░░░░░░░░░░░░░░');

for (let i = 0; i < arr1.length; i++) console.log(i, arr1[i]);

console.log('\n░░░░░░░░░░░░░░░░ for (in) ░░░░░░░░░░░░░░░░');

for (let prop in arr1) console.log(typeof prop, prop, arr1[prop]);

console.log('\n░░░░░░░░░░░░░░░░ for (of) ░░░░░░░░░░░░░░░░');

for (let item in arr1) console.log(item);

console.log('\n░░░░░░░░░░░░░░░░ .forEach ░░░░░░░░░░░░░░░░');

arr1.forEach((item, index, array) => console.log(`'${item}' has pos = ${index} in whole ${array}`));

console.log('\n░░░░░░░░░░░░░░░░ .at(-1) ░░░░░░░░░░░░░░░░');

for (let i = -arr1.length; i < 0 ; i++) console.log(i, arr1.at(i));

console.log('\n░░░░░░░░░░░░░░░░ conversion ░░░░░░░░░░░░░░░░');
console.log(`string${cFunc}.split()${cNo}`, '█►', 'string'.split(undefined));
console.log(`string${cFunc}.split('')${cNo}`, '█►', 'string'.split(''));
console.log(`[ 's', 't', 'r', 'i', 'n', 'g' ]${cFunc}.join()${cNo}`, '█►', [ 's', 't', 'r', 'i', 'n', 'g' ].join());
console.log(`[ 's', 't', 'r', 'i', 'n', 'g' ]${cFunc}.join('')${cNo}`, '█►', [ 's', 't', 'r', 'i', 'n', 'g' ].join(''));
printAdd(`(${cVar}[] + [1] + [1, 2] + [1, 2, 3] + [37331]${cNo}) hint = string`, '█►', [] + [1] + [1, 2] + [1, 2, 3] + [37331]);
printAll();

console.log('\n░░░░░░░░░░░░░░░░ Search ░░░░░░░░░░░░░░░░');

printAdd(cHint, 'i', cNo, '█►', '0123456789ABC')
printAdd(cVar, 'arr1', cNo, '█►', arr1.join(''));
printAdd(cFunc, ".indexOf('=')", cNo, '█►', arr1.indexOf('='));
printAdd(cFunc, ".indexOf('=', 3)", cNo, '█►', arr1.indexOf('=', 3));
printAdd(cFunc, ".lastIndexOf('=')", cNo, '█►', arr1.lastIndexOf('='));
printAdd(cFunc, ".lastIndexOf('=', 9)", cNo, '█►', arr1.lastIndexOf('=', 9));
printAdd(cFunc, ".includes('=')", cNo, '█►', arr1.includes('='));
printAdd(cFunc, ".includes('=', 11)", cNo, '█►', arr1.includes('=', 11));

// noinspection JSUnusedLocalSymbols - for documentation
printAdd(cFunc, ".find('=')", cNo, '█►', arr1.find((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(cFunc, ".findIndex('=')", cNo, '█►', arr1.findIndex((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(cFunc, ".findLastIndex('=')", cNo, '█►', arr1.findLastIndex((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
printAdd(cFunc, ".includes('=')", cNo, '█►', arr1.includes('='));
printAll();

console.log('\n░░░░░░░░░░░░░░░░ ❗modify❗: .splice - сращивание, .sort ░░░░░░░░░░░░░░░░');

printAdd('i', '█►', '0123456789A');
printAdd('arr1', '█►', arr1.join(''));

const o = {
    startPos: 4,
    deleteCount: 3,
};

// .splice
printAdd('🟥.splice', '█►', arr1.splice(o.startPos, o.deleteCount, '1', '2', '3', '4', '5'));
printAdd('arr1', '█►', arr1.join(''));

// .reverse
let ref = arr1.reverse();
printAdd('🔴.reverse()', '█►', ref, ref === arr1);
printAdd('arr1', '█►', arr1.join(''));

// .sort
ref = arr1.sort();
printAdd('🟥.sort', '█►', ref, ref === arr1);
printAdd('arr1', '█►', arr1.join(''));

// .sort more
const arr0 = [11, 1, 0, 21, 2, -22, -0, -111];
printAdd('arr0 - reset', '█►', arr0.join(','));

printAdd(`🟥.sort`, '█►', arr0.sort().join(','));
arr0.splice(0, Infinity, 11, 1, 0, 21, 2, -22, -0, -111);
printAdd('arr0 - reset', '█►', arr0.join(','));
printAdd(`🟥.sort(a - b)`, '█►', arr0.sort((a, b) => parseInt(String(a)) - parseInt(String(b))).join(','));
printAll({ tableView: true });

console.log('\n░░░░░░░░░░░░░░░░ ❗modify❗: -unshift, +shift, push+, pop- ░░░░░░░░░░░░░░░░');

printAdd(cFunc, '.shift()', cNo, '🐢►', arr1.shift(), '- first letter')
printAdd(cFunc, '.unshift()', cNo, '🐢►', arr1.unshift('^'), '- new length')
printAdd(cFunc, '.pop()', cNo, '🐇►', arr1.pop(), '- last letter');
printAdd(cFunc, '.push()', cNo, '🐇►', arr1.push('$'), '- new length');
printAdd(cVar, 'arr1', cNo, '  ►', arr1, '- result');

// added at start
printAdd(cFunc, 'unshift()', cNo, '🐢►', arr1.unshift('_', '-', '='), '- unshift 3');

// added at end
printAdd(cFunc, 'push()', cNo, '🐇►', arr1.push('=', '-', '_'), '- push 3');

printAdd(cVar, 'arr1', cNo, '  ►', arr1.join(''), '- result');
printAll({ tableView: false });

console.log('\n░░░░░░░░░░░░░░░░ 🆕create🆕: .slice, .concat(...[el1, el2], elN) ░░░░░░░░░░░░░░░░');

const duplicated = arr1.slice();

printAdd(`${cFunc}.slice()${cNo}d clone`, '█►', duplicated.join(''));

// noinspection JSCheckFunctionSignatures - cohercion testing
const sum = duplicated.concat(arr1, [1, 2, 3], 4, 5, [6], [7], [8, 9]);

// noinspection SpellCheckingInspection - splited word
printAdd(`${cFunc}.concat()${cNo}enated (авто-спред)`, '█►', sum);
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.filter()${cNo}`, '█►', arr1.filter((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
let remapped;
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.map()${cNo}`, '█►', remapped = arr1.map((item, index, array) => item.codePointAt(0) === '='.codePointAt(0) ? '🟰' : item));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.reduce()${cNo}`, '█►', remapped.reduce((accumulator, item, index, array) => accumulator + ` ${item.codePointAt(0)}`, '🚀'));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.reduceRight()${cNo}`, '█►', remapped.reduceRight((accumulator, item, index, array) => accumulator + ` ${item.codePointAt(0)}`, '🚀'));
printAll();

console.log('\n░░░░░░░░░░░░░░░░░░░░░░░░ thisArg = this ░░░░░░░░░░░░░░░░░░░░░░░░');

const utils = {
    startDate: new Date(1970, 1, 1),
    getUnixFormat: function (date) {
        try {
            return (date - this.startDate) / 100;
        } catch (e) {
            return e.message;
        }
    }
}
const boundFunc = utils.getUnixFormat.bind(utils);

printAdd(`${cFunc}.map(thisArgs.func, thisArgs)${cNo}`, '█►', [Date.now()].map(utils.getUnixFormat, utils));
printAdd(`${cFunc}.map(boundFunc)${cNo}`, '█►', [Date.now()].map(boundFunc));
printAdd(`${cFunc}.map(thisArgs.func)${cNo}`, '█►', [Date.now()].map(utils.getUnixFormat));
printAll();

console.log('\n░░░░░░░░░░░░░░░░░░░░░░░░ Inheritance ░░░░░░░░░░░░░░░░░░░░░░░░');

inheritance: {
    break inheritance;

    // noinspection UnreachableCodeJS - disabled because of "too verbose"
    let array = ['🟰', '🚀', 2, {}];

    console.log('array as obj  █►', Object.getOwnPropertyDescriptors(array));

    let props = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(array));

    for (let prop in props) monolog.pushStringParts(`proto  █►  ${prop} =`, props[prop]?.value?.toString());

    monolog.printLines();

    console.dir(array, {showHidden: true, colors: true});
}
