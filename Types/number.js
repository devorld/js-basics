import { monolog } from "../utils/monolog.js";

const printAdd = monolog?.pushStringParts?.bind(monolog) || console.log;
const printAll = monolog?.printLines?.bind(monolog) || console.log;

console.log('\n░░░░░░░░░░░░░░░░ big value ░░░░░░░░░░░░░░░░');

let bvalue = 1_0_0_0_0_0_0;

console.log('value █►', bvalue);
console.log('value === 1e6 === 1000e3 █►', bvalue === 1e6, bvalue === 1000e3);


console.log('\n░░░░░░░░░░░░░░░░ small value ░░░░░░░░░░░░░░░░');

let svalue = .0_0_0_0_0_1;

console.log('value █►', svalue);
console.log('value === 1e-6 === .001e-3 █►', svalue === 1e-6, svalue === .001e-3);

console.log('\n░░░░░░░░░░░░░░░░ conversion ░░░░░░░░░░░░░░░░');

printAdd('', '█►', ('.123.4'), ('123.4'), ('123e4'));
printAdd('Number()', '█►', Number('.123.4'), Number('123.4'), Number('123e4'));
printAdd('parseInt()', '█►', parseInt('.123.4'), parseInt('123.4'), parseInt('123e4'));
printAdd('parseFloat()', '█►', parseFloat('.123.4'), parseFloat('123..4'), parseFloat('1.23.4'));
printAdd('.toString()', '█►', 123..toString(), 123.0.toString(), (123).toString());
printAdd('String()', '█►', String(123.), String(.123));
printAll({ tableView: true });

console.log('\n░░░░░░░░░░░░░░░░ comparison ░░░░░░░░░░░░░░░░');

/*
without type coercion: Number.isNaN, Number.isFinite
with type coercion:           isNaN,       .isFinite
*/

// noinspection JSComparisonWithNaN,EqualityComparisonWithCoercionJS
console.log('NaN === NaN == NaN █►', NaN === NaN, NaN == NaN);
// noinspection EqualityComparisonWithCoercionJS
console.log('Infinity === Infinity == Infinity █►', Infinity === Infinity, Infinity == Infinity);
// noinspection EqualityComparisonWithCoercionJS
console.log('-Infinity === -Infinity == -Infinity █►', -Infinity === -Infinity, -Infinity == -Infinity);
// noinspection EqualityComparisonWithCoercionJS
console.log('-Infinity === -1 * Infinity == -1 * Infinity █►', -Infinity === -1 * Infinity, -Infinity == -1 * Infinity);

console.log('\n░░░░░░░░░░░░░░░░ NaN checks ░░░░░░░░░░░░░░░░');

console.log('Object.is(NaN, NaN) █►', Object.is(NaN, NaN), );
// noinspection JSCheckFunctionSignatures
console.log('isNaN        █►',        isNaN('s'),        isNaN(Infinity / Infinity),        isNaN('123'),        isNaN(NaN));
console.log('Number.isNaN █►', Number.isNaN('s'), Number.isNaN(Infinity / Infinity), Number.isNaN('123'), Number.isNaN(NaN));
console.log('isNaN === Number.isNaN  █►', isNaN === Number.isNaN);
console.log('[\'NaN\'].indexOf(\'NaN\')  █►', ['NaN'].indexOf('NaN'));
console.log('[\'NaN\'].includes(\'NaN\') █►', ['NaN'].includes('NaN'));

try {
    // noinspection JSCheckFunctionSignatures
    console.log('isNaN(10n)', isNaN(10n));
} catch (e) {
    console.log('Error:', e.message);
}

console.log('\n░░░░░░░░░░░░░░░░ Finite checks ░░░░░░░░░░░░░░░░');
// noinspection JSCheckFunctionSignatures
console.log('isNaN        █►',        isFinite('123'),        isFinite('s'),        isFinite(Infinity / Infinity),        isFinite(NaN));
console.log('Number.isNaN █►', Number.isFinite('123'), Number.isFinite('s'), Number.isFinite(Infinity / Infinity), Number.isFinite(NaN));
console.log('isFinite === Number.isFinite █►', isFinite === Number.isFinite);

console.log('\n░░░░░░░░░░░░░░░░ non-negativing ░░░░░░░░░░░░░░░░');
console.log(`Math.max(0, -0)`, '█►', Math.max(0, -0));
console.log(`Math.max(0, -1)`, '█►', Math.max(0, -1));
console.log(`Math.max(0, -Infinity)`, '█►', Math.max(0, -Infinity));
console.log(`Math.max(0, null)`, '█►', Math.max(0, null));
// noinspection JSCheckFunctionSignatures
console.log(`Math.max(0, false)`, '█►', Math.max(0, false));
// noinspection JSCheckFunctionSignatures
console.log(`Math.max(0, "")`, '█►', Math.max(0, ""));
console.log();
console.log(`Math.max(0, Infinity)`, '█►', Math.max(0, Infinity));
console.log(`Math.max(0, NaN)`, '█►', Math.max(0, NaN));
console.log(`Math.max(0, undefined)`, '█►', Math.max(0, undefined));

console.log('\n░░░░░░░░░░░░░░░░ ~~ ░░░░░░░░░░░░░░░░');
console.log(`~~(Infinity)`, '█►', ~~(Infinity));
// noinspection PointlessBooleanExpressionJS
console.log(`~~(undefined)`, '█►', ~~(undefined));
console.log(`~~(NaN)`, '█►', ~~(NaN));
console.log(`~~(-Infinity)`, '█►', ~~(-Infinity));
console.log(`~~(0)`, '█►', ~~(0));
console.log(`~~(-0)`, '█►', ~~(-0));
// noinspection PointlessBooleanExpressionJS
console.log(`~~(null)`, '█►', ~~(null));
console.log();
console.log(`~~(-7.7)`, '█►', ~~(-7.7));
console.log(`~~(-6)`, '█►', ~~(-6));
console.log(`~~(8)`, '█►', ~~(8));
console.log(`~~(9.9)`, '█►', ~~(9.9));
