const str1 = 'lorem ipsum';
const str2 = str1.toUpperCase(); // boxing -> operation -> unboxing
const str3 = String(str2); // returns created primitive
// noinspection JSPrimitiveTypeWrapperUsage
const str4 = new String(str2); // constructors created only for internal usages - returns box-object

console.log('1 - █►', typeof str2);
console.log('2 - boxed operation result type █►', typeof str2);
console.log('3 - fabric result █►', typeof str3);
console.log('4 - constructor result █►', typeof str4);
console.log('4 - props █►');

const descriptors4 = Object.getOwnPropertyDescriptors(str4);

for (let prop in descriptors4) console.log('            ', `${prop} - ${descriptors4[prop].value}`);

console.log();
console.log('non-boxing █►', undefined, null);
console.log('boxing █►', String, Symbol, Number, BigInt, Boolean);
console.log('objects █►', Object, Function, Date);
