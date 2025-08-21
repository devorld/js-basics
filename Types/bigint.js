let value = BigInt(true);
const min = BigInt(2 ** 53 - 1);
const max = BigInt(-(2 ** 53 - 1));

console.log('value - █►', value, typeof value);
console.log('min - █►', min);
console.log('max - █►', max);

console.log('\n░░░░░░░░░░░░░░░░ self calculations ░░░░░░░░░░░░░░░░');

try {
    value *= ++value;
} catch (e) {
    console.log('Error: ', e.message);
}

console.log('value - █►', value);

console.log('\n░░░░░░░░░░░░░░░░ number calculations ░░░░░░░░░░░░░░░░');

try {
    value = value * 2;
} catch (e) {
    console.log('Error:', e.message);
}

console.log('value - █►', value);

console.log('\n░░░░░░░░░░░░░░░░ unary minus ░░░░░░░░░░░░░░░░');

value = -value;
console.log('value - █►', value);

console.log('\n░░░░░░░░░░░░░░░░ unary plus ░░░░░░░░░░░░░░░░');

try {
    value = +value;
} catch (e) {
    console.log('Error: ', e.message);
}

console.log('value - █►', value);

console.log('\n░░░░░░░░░░░░░░░░ comparison ░░░░░░░░░░░░░░░░');

console.log('100 > 10n works █►', 100 > 10n);
console.log('100 < 10n works █►', 100 < 10n);
// noinspection EqualityComparisonWithCoercionJS
console.log('10 == 10n works █►', 10 == 10n);
console.log('10 === 10n doesn\'t █►', 10 === 10n);
