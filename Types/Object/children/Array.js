import { monolog } from '../../../utils/monolog.js';

const printAdd = monolog?.pushStringParts?.bind(monolog) || console.log;
const printAll = monolog?.printLines?.bind(monolog) || console.log;

const arr1 = ['H', 'e', 'l', 'l', 'o'];
const arr2 = Array(5);
// noinspection JSPrimitiveTypeWrapperUsage
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

console.log('\n░░░░░░░░░░░░░░░░ -unshift, +shift, push+, pop- ░░░░░░░░░░░░░░░░');

printAdd('shift', '🐢►', arr1.shift(), '- first letter')
printAdd('unshift', '🐢►', arr1.unshift('^'), '- new length')
printAdd('pop', '🐇►', arr1.pop(), '- last letter');
printAdd('push', '🐇►', arr1.push('$'), '- new length');
printAdd('arr1', '█►', arr1, '- result');

// added at start
printAdd('unshift', '🐢►', arr1.unshift('_', '-', '='), '- unshift 3');

// added at end
printAdd('push', '🐇►', arr1.push('=', '-', '_'), '- push 3');

printAdd('arr1', '█►', arr1.join(''), '- result');
printAll({ tableView: true });

console.log('\n░░░░░░░░░░░░░░░░ conversion ░░░░░░░░░░░░░░░░');

printAdd('hint = string', '█►', [] + [1] + [1, 2] + [1, 2, 3] + [37331]);
printAll({ keepMaxLengths: true });

console.log('\n░░░░░░░░░░░░░░░░ ❗modify❗: .splice - сращивание, .sort ░░░░░░░░░░░░░░░░');

printAdd('indexes', '█►', '0123456789A');
printAdd('arr1', '█►', arr1.join(''));

const o = {
    startPos: 4,
    deleteCount: 3,
};

printAdd('🟥.splice', '█►', arr1.splice(o.startPos, o.deleteCount, '1', '2', '3', '4', '5'));
printAdd('arr1', '█►', arr1.join(''));
const ref = arr1.sort();
printAdd('🔴.sort', '█►', ref, ref === arr1);
printAdd('arr1', '█►', arr1.join(''));
const arr0 = [11, 1, 0, 21, 2, -22, -0, -111];
printAdd('arr0 - reset', '█►', arr0.join(','));
printAdd(`🔴.sort`, '█►', arr0.sort().join(','));
arr0.splice(0, Infinity, 11, 1, 0, 21, 2, -22, -0, -111);
printAdd('arr0 - reset', '█►', arr0.join(','));
printAdd(`🔴.sort(v1 - v2)`, '█►', arr0.sort((v1, v2) => parseInt(String(v1)) - parseInt(String(v2))).join(','));
printAll({ keepMaxLengths: true, tableView: true });

console.log('\n░░░░░░░░░░░░░░░░ 🆕create🆕: .slice, .concat(...[el1, el2], elN) ░░░░░░░░░░░░░░░░');

const duplicated = arr1.slice();

printAdd('sliced clone', '█►', duplicated.join(''));

const sum = duplicated.concat(arr1, [1, 2, 3], 4, 5, [6], [7], [8, 9]);

printAdd('concatenated (авто-спред)', '█►', sum);

printAdd('.filter', '█►', arr1.filter((item, index, array) => item.codePointAt() === '='.codePointAt()));
printAdd('.map', '█►', arr1.map((item, index, array) => item.codePointAt() === '='.codePointAt() ? '🟰' : item));
printAll({ keepMaxLengths: true });

console.log('\n░░░░░░░░░░░░░░░░ Search ░░░░░░░░░░░░░░░░');

printAdd('indexes', '█►', '0123456789ABC')
printAdd("arr1", '█►', arr1.join(''));
printAdd(".indexOf('=')", '█►', arr1.indexOf('='));
printAdd(".indexOf('=', 3)", '█►', arr1.indexOf('=', 3));
printAdd(".lastIndexOf('=')", '█►', arr1.lastIndexOf('='));
printAdd(".lastIndexOf('=', 9)", '█►', arr1.lastIndexOf('=', 9));
printAdd(".includes('=')", '█►', arr1.includes('='));
printAdd(".includes('=', 11)", '█►', arr1.includes('=', 11));

printAdd(".find('=')", '█►', arr1.find((item, index, array) => item.codePointAt() === '='.codePointAt()));
printAdd(".findIndex('=')", '█►', arr1.findIndex((item, index, array) => item.codePointAt() === '='.codePointAt()));
printAdd(".findLastIndex('=')", '█►', arr1.findLastIndex((item, index, array) => item.codePointAt() === '='.codePointAt()));
printAdd(".includes('=')", '█►', arr1.includes('='));
printAll();

console.log('\n░░░░░░░░░░░░░░░░░░░░░░░░ Inheritance ░░░░░░░░░░░░░░░░░░░░░░░░');

inheritance: {
    break inheritance;

    // disabled because of "too verbose"
    // noinspection UnreachableCodeJS
    console.log('arr1 as obj  █►', Object.getOwnPropertyDescriptors(arr1));

    let props = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(arr1));

    for (let prop in props) monolog.pushStringParts(`proto  █►  ${prop} =`, props[prop]?.value?.toString());

    monolog.printLines();

    console.dir(arr1, {showHidden: true, colors: true});
}
