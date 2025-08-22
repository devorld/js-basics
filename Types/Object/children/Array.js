import { monolog } from '../../../utils/monolog.js';

const arr1 = ['H', 'e', 'l', 'l', 'o'];
const arr2 = Array();
// noinspection JSPrimitiveTypeWrapperUsage
const arr3 = new Array();

console.log(arr1, arr2, arr3);

console.log('\n░░░░░░░░░░░░░░░░ for (;;) ░░░░░░░░░░░░░░░░');

for (let i = 0; i < arr1.length; i++) console.log(i, arr1[i]);

console.log('\n░░░░░░░░░░░░░░░░ for (in) ░░░░░░░░░░░░░░░░');

for (let prop in arr1) console.log(typeof prop, prop, arr1[prop]);

console.log('\n░░░░░░░░░░░░░░░░ for (of) ░░░░░░░░░░░░░░░░');

for (let item in arr1) console.log(item);

console.log('\n░░░░░░░░░░░░░░░░ .at(-1) ░░░░░░░░░░░░░░░░');

for (let i = -arr1.length; i < 0 ; i++) console.log(i, arr1.at(i));

console.log('\n░░░░░░░░░░░░░░░░ -unshift, +shift, push+, pop- ░░░░░░░░░░░░░░░░');

console.log('shift █►', arr1.shift(), '- first letter')
console.log('shift █►', arr1.unshift('^'), '- new length')
console.log('pop   █►', arr1.pop(), '- last letter');
console.log('push  █►', arr1.push('$'), '- new length');
console.log('arr1  █►', arr1, '- result');

// added at start
arr1.unshift('_', '-', '=');

// added at end
arr1.push('=', '-', '_');

console.log('arr1  █►', arr1.join(''));
console.log('arr1 as obj  █►', Object.getOwnPropertyDescriptors(arr1));

let props = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(arr1));

for (let prop in props) monolog.pushStringParts(`proto  █►  ${prop} =`, props[prop]?.value?.toString());

monolog.printLines();

console.dir(arr1, {showHidden: true, colors: true})
