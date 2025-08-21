const func = new Function();
const getProps = (obj) => [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];

console.log('func █►', func);
console.log('func type █►', typeof func);
console.log('Object.getPrototypeOf(func) █►', Object.getPrototypeOf(func));
console.log('getProps(func) █►', getProps(func));
console.log('Object.getOwnPropertyDescriptors(func) █►\n', Object.getOwnPropertyDescriptors(func));
