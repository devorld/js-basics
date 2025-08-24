console.log('\n░░░░░░░░░░░░░░░░ big value ░░░░░░░░░░░░░░░░');

let bvalue = 1_0_0_0_0_0_0;

console.log('value █►', bvalue);
console.log('value === 1e6 === 1000e3 █►', bvalue === 1e6, bvalue === 1000e3);


console.log('\n░░░░░░░░░░░░░░░░ small value ░░░░░░░░░░░░░░░░');

let svalue = .0_0_0_0_0_1;

console.log('value █►', svalue);
console.log('value === 1e-6 === .001e-3 █►', svalue === 1e-6, svalue === .001e-3);

console.log('\n░░░░░░░░░░░░░░░░ conversion ░░░░░░░░░░░░░░░░');

console.log(123..toString(), 123.0.toString(), (123).toString());

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
console.log('isNaN        █►',        isNaN('s'),        isNaN(Infinity / Infinity),        isNaN('123'),        isNaN(NaN));
console.log('Number.isNaN █►', Number.isNaN('s'), Number.isNaN(Infinity / Infinity), Number.isNaN('123'), Number.isNaN(NaN));
console.log('isNaN === Number.isNaN  █►', isNaN === Number.isNaN);
console.log('[\'NaN\'].indexOf(\'NaN\')  █►', ['NaN'].indexOf('NaN'));
console.log('[\'NaN\'].includes(\'NaN\') █►', ['NaN'].includes('NaN'));

try {
    console.log('isNaN(10n)', isNaN(10n));
} catch (e) {
    console.log('Error:', e.message);
}

console.log('\n░░░░░░░░░░░░░░░░ Finite checks ░░░░░░░░░░░░░░░░');
console.log('isNaN        █►',        isFinite('123'),        isFinite('s'),        isFinite(Infinity / Infinity),        isFinite(NaN));
console.log('Number.isNaN █►', Number.isFinite('123'), Number.isFinite('s'), Number.isFinite(Infinity / Infinity), Number.isFinite(NaN));
console.log('isFinite === Number.isFinite █►', isFinite === Number.isFinite);
