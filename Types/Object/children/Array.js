import {CONSOLE_TEXT_COLOR} from "../../../utils/console.js";
import {ID_SPACE} from '../../../utils/graphemes.js'
import {monolog} from '../../../utils/monolog.js';

const printHeader = monolog?.printHeader || console.log;
const printSubHeader = monolog?.printSubHeader || console.log;
const printAdd = monolog?.pushStringParts?.bind(monolog) || console.log;
const printAll = monolog?.printLines?.bind(monolog) || console.log;
const cFunc = CONSOLE_TEXT_COLOR?.FgMagenta || '';
const cFuncNested = CONSOLE_TEXT_COLOR?.FgCyan || '';
const cVar = CONSOLE_TEXT_COLOR?.FgBlue || '';
const cHint = CONSOLE_TEXT_COLOR?.FgGray || '';
const cNo = CONSOLE_TEXT_COLOR?.Reset || '';

const arr1 = ['H', 'e', 'l', 'l', 'o'];
const arr2 = Array(5);
const arr3 = new Array(5);

console.log(arr1, arr2, arr3);

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ for (;;) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

for (let i = 0; i < arr1.length; i++) console.log(i, arr1[i]);

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ for (in) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

for (let prop in arr1) console.log(typeof prop, prop, arr1[prop]);

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ for (of) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

for (let item in arr1) console.log(item);

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ .forEach ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

arr1.forEach((item, index, array) => console.log(`'${item}' has pos = ${index} in whole ${array}`));

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ .at(-1) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

for (let i = -arr1.length; i < 0; i++) console.log(i, arr1.at(i));

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ conversion ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
printHeader('conversion');
printAdd(`string${cFunc}.split()${cNo}`, '█►', 'string'.split(undefined));
printAdd(`string${cFunc}.split('')${cNo}`, '█►', 'string'.split(''));
printAdd(`[ 's', 't', 'r', 'i', 'n', 'g' ]${cFunc}.join()${cNo}`, '█►', ['s', 't', 'r', 'i', 'n', 'g'].join());
printAdd(`[ 's', 't', 'r', 'i', 'n', 'g' ]${cFunc}.join('')${cNo}`, '█►', ['s', 't', 'r', 'i', 'n', 'g'].join(''));
printAdd(`(${cVar}[] + [1] + [1, 2] + [1, 2, 3] + [37331]${cNo}) hint = string`, '█►', [] + [1] + [1, 2] + [1, 2, 3] + [37331]);
printAll();
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Search ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
printHeader('Search');
printAdd(`${cHint}i${cNo}`, '█►', '0123456789ABC')
printAdd(`${cVar}arr1${cNo}`, '█►', arr1.join(''));

printAdd(`${cFunc}.indexOf${cNo}('=')`, '█►', arr1.indexOf('='));
printAdd(`${cFunc}.indexOf${cNo}('=', 3)`, '█►', arr1.indexOf('=', 3));

printAdd(`${cFunc}.lastIndexOf${cNo}('=')`, '█►', arr1.lastIndexOf('='));
printAdd(`${cFunc}.lastIndexOf${cNo}('=', 9)`, '█►', arr1.lastIndexOf('=', 9));

printAdd(`${cFunc}.includes${cNo}('=')`, '█►', arr1.includes('='));
printAdd(`${cFunc}.includes${cNo}('=', 11)`, '█►', arr1.includes('=', 11));

// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.find${cNo}('=')`, '█►', arr1.find((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.findIndex${cNo}('=')`, '█►', arr1.findIndex((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.findLastIndex${cNo}('=')`, '█►', arr1.findLastIndex((item, index, array) => item.codePointAt(0) === '='.codePointAt(0)));
printAll();
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ❗modify❗: .fill, .copyWithin ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
printHeader('❗modify❗: .fill, .copyWithin');
let a, b, c, pad = 3;
printAdd(`${cVar}a${cNo}`, '█►', (a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).map(v => String(v).padStart(pad, ' ')));
printAdd(`${cVar}b${cNo} = a${cFunc}.fill(-5, -3, -1)${cNo}`, '█►', (b = a.fill(-5, -3, -1)).map(v => String(v).padStart(pad, ' ')));
printAdd(`${cVar}c${cNo} = a${cFunc}.fill(5, 1, 3)${cNo}`, '█►', (c = a.fill(5, 1, 3)).map(v => String(v).padStart(pad, ' ')));
printAdd('a === b === c', '█►', a === b && b === c);
printAdd(`${cVar}a${cNo}${cFunc}.copyWithin(-8, -3, -1)${cNo}`, '█►', a.copyWithin(-8, -3, -1).map(v => String(v).padStart(pad, ' ')));
printAdd(`${cVar}a${cNo}${cFunc}.copyWithin(0,6,6)(-1,-5,-4)${cNo}`, '█►', a.copyWithin(0, 5, 6).copyWithin(-1, -5, -4).map(v => String(v).padStart(pad, ' ')));
printAll({keepMaxLengths: true});
//endregion

//region ░░░░░░░░░░░░░░░░ ❗modify❗: .splice - сращивание, .reverse, .sort ░░░░░░░░░░░░░░░░
printSubHeader('❗modify❗: .splice - сращивание, .reverse, .sort');
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
printAll({tableView: true});
//endregion

//region ░░░░░░░░░░░░░░░░ ❗modify❗: -unshift, +shift, push+, pop- ░░░░░░░░░░░░░░░░
printSubHeader('❗modify❗: -unshift, +shift, push+, pop-');

printAdd(`${cFunc}.shift${cNo}()`, '🐢►', arr1.shift(), '- first letter')
printAdd(`${cFunc}.unshift${cNo}()`, '🐢►', arr1.unshift('^'), '- new length')
printAdd(`${cFunc}.pop${cNo}()`, '🐇►', arr1.pop(), '- last letter');
printAdd(`${cFunc}.push${cNo}()`, '🐇►', arr1.push('$'), '- new length');
printAdd(`${cVar}arr1${cNo}`, `${ID_SPACE}►`, arr1, '- result');

// added at start
printAdd(`${cFunc}unshift${cNo}()`, '🐢►', arr1.unshift('_', '-', '='), '- unshift 3 els = new length');

// added at end
printAdd(`${cFunc}push${cNo}()`, '🐇►', arr1.push('=', '-', '_'), '- push 3 els = new length');

printAdd(`${cVar}arr1${cNo}`, `${ID_SPACE}►`, arr1.join(''), '- result');
printAll();
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 🆕create🆕: .slice, .concat(...[el1, el2], elN) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
printHeader('🆕create🆕: .slice, .concat(...[el1, el2], elN)');

const duplicated = arr1.slice();
printAdd(`${cFunc}.slice()${cNo}d clone`, '█►', duplicated.join(''));

// noinspection JSCheckFunctionSignatures - cohercion testing
const sum = duplicated.concat(arr1, [1, 2, 3], 4, 5, [6], [7], [8, 9]);
// noinspection SpellCheckingInspection - splited word
printAdd(`${cFunc}.concat()${cNo}enated (авто-спред)`, '█►', sum);
printAll({keepMaxLengths: true});
//endregion

//region ░░░░░░░░░░░░░░░░ .filter, .some, .every, reduce, reduceRight ░░░░░░░░░░░░░░░░
printSubHeader('.filter, .some, .every, .reduce, .reduceRight');

printAdd(`${cVar}arr1${cNo}`, '█►', `[${arr1.join(', ')}]`);

// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures - for documentation, special for isNaN() under_the_hood coercing use
printAdd(`${cFunc}.filter${cNo}(!${cFuncNested}isNaN${cNo}(item) | != isNaN)${cNo}`, '█►', arr1.filter((item, index, array) => !isNaN(item)));
// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.filter${cNo}(!${cFuncNested}Number.isNaN${cNo}(item) | !== isNaN)${cNo}`, '█►', arr1.filter((item, index, array) => !Number.isNaN(item)));

// noinspection JSCheckFunctionSignatures - special for isNaN() under_the_hood coercing use
printAdd(`${cFunc}.some${cNo}(${cFuncNested}isNaN${cNo}(item) | != isNaN)${cNo}`, '█►', arr1.some(c => isNaN(c)));

// noinspection JSCheckFunctionSignatures - special for isNaN() under_the_hood coercing use
printAdd(`${cFunc}.every${cNo}(${cFuncNested}isNaN${cNo}(item) | != isNaN)${cNo}`, '█►', arr1.every(c => isNaN(c)));

// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.reduce${cNo}()`, '█►', arr1.reduce((accumulator, item, index, array) => accumulator + ` ${item.codePointAt(0)}`, '🚀'));

// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.reduceRight${cNo}()`, '█►', arr1.reduceRight((accumulator, item, index, array) => accumulator + ` ${item.codePointAt(0)}`, '🚀'));
printAll();
// endregion

//region ░░░░░░░░░░░░░░░░  .map, .flat, .flatMap  ░░░░░░░░░░░░░░░░
printSubHeader('.map, .flat, .flatMap');

// noinspection JSUnusedLocalSymbols - for documentation
printAdd(`${cFunc}.map${cNo}()`, '█►', arr1.map((item, index, array) => item.codePointAt(0) === '='.codePointAt(0) ? '🟰' : item));
printAll();

const cube = [
    [[.111, .112, .113], [.121, .122, .123], [.131, .132, .133]],
    [[[.211], [.212], [.213]], [[.221], [.222], [.223]], [[.231], [.232], [.233]]],
    [[.311, .312, .313], [.321, .322, .323], [.331, .332, .333]],
];

console.log(`${cVar}cube${cNo}`, '█►');
console.log(cube);
for (let i = 0; i <= 4; i++) {
    console.groupCollapsed(`${cVar}cube${cFunc}.flat${cNo}(${i})`, '█►');
    console.log(cube.flat(i));
    console.groupEnd();
}

console.log(`${cVar}cube${cFunc}.flatMap${cNo}(a=>a) === ${cFunc}.map${cNo}(a=>a)${cFunc}.flat${cNo}(1)`, '█►');
// noinspection JSUnusedLocalSymbols - for documentation
console.log(cube.flatMap((item, index, array) => item));
console.log(`${cVar}cube${cFunc}.flatMap${cNo}(.reverse())`, '█►');
// noinspection JSUnusedLocalSymbols - for documentation
console.log(cube.flatMap((item, index, array) => item.reverse()));
//endregion

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ thisArg = this ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

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
const datetime = Date.now();

printAdd(`${cFunc}.map(thisArgs.func, thisArgs)${cNo}`, '█►', [datetime].map(utils.getUnixFormat, utils));
printAdd(`${cFunc}.map(boundFunc)${cNo}`, '█►', [datetime].map(boundFunc));
printAdd(`${cFunc}.map(thisArgs.func)${cNo}`, '█►', [datetime].map(utils.getUnixFormat));
printAll();

console.log('\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Inheritance ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');

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
