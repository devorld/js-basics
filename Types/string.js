let strValue = 'ipsum';
const func = (...args) => args.forEach((a, i) => console.log(`${i}:`, typeof a, Array.isArray(a), '█►', a));

func(`Lorem ${strValue} dolor sit amet`);
func`Lorem ${strValue} dolor sit amet`;

console.log('\n░░░░░░░░░░░░░░░░ iterating ░░░░░░░░░░░░░░░░');

// by each property
for (let prop in strValue) console.log(prop, strValue[prop], '█►', strValue.at(+prop), '█►', strValue.at(-prop), -prop);

// by each element
for (let val of strValue) console.log('►', val);

console.log('\n- before = ', strValue);
try {
    strValue[3] = 'z'; // no effect, string is read-only AND no error in CommonJS
} catch (e) {
    console.log(e.message);
}
console.log('- after = ', strValue);

console.log('\n░░░░░░░░░░░░░░░░ methods ░░░░░░░░░░░░░░░░');
/*

.indexOf(str, minPos) | .lastIndexOf(str, maxPos)

.startsWith(str) | .includes(str) | .endsWith(str)

.slice(fromPosIncludes, toPosOmits) - positive, negative, order sensitive
.substring(fromPosIncludes, toPosOmits) - positive, order insensitive
.substr(fromPosIncludes, charsCount) - positive, negative

*/

//          01234
strValue = 'Hello';

console.log('█►', strValue);
console.log('█►', '01234');

console.log('indexOf(\'l\')     █►', strValue.indexOf('l'), strValue.indexOf('l', 2), strValue.indexOf('l', 3), strValue.indexOf('l', 4));
console.log('lastIndexOf(\'l\') █►', strValue.lastIndexOf('l'), strValue.lastIndexOf('l', 3), strValue.lastIndexOf('l', 2), strValue.lastIndexOf('l', 1));

console.log('slice(1:3) █►', strValue.slice(1,3));

['Hello', 'Johnny', 'Cage'].forEach(el => console.log(el.concat('.'.repeat(10 - el.length)), '|   ', '|'));
