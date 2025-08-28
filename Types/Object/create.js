const obj1 = {};
const obj2 = Object.create(null);
const obj3 = fabric();
const obj4 = new Constructor();
const getProps = (obj) => [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
const getDescriptors = (obj) => Object.getOwnPropertyDescriptors(obj);

console.log('obj1 █►',obj1, getProps(obj1));
console.log(getDescriptors(obj1), '\n');

console.log('obj2 █►',obj2, getProps(obj2));
console.log(getDescriptors(obj2), '\n');

console.log('obj3 █►', obj3, obj3.a, obj3.getA(), getProps(obj3));
console.log(getDescriptors(obj3), '\n');

console.log('obj4 █►',obj4, obj4.a, obj4.getA(), getProps(obj4));
console.log(getDescriptors(obj4), '\n');

console.log('prototype █►', obj1.prototype === obj2.prototype, obj2.prototype === obj3.prototype, obj3.prototype === obj4.prototype);
console.log('Object.getPrototypeOf(obj1) {} █►', Object.getPrototypeOf(obj1));
console.log('Object.getPrototypeOf(obj3) {} █►', Object.getPrototypeOf(obj3), Object.getPrototypeOf(obj3) === Object.getPrototypeOf(obj1));
console.log('Object.getPrototypeOf(obj2) O.c █►', Object.getPrototypeOf(obj2));
console.log('Object.getPrototypeOf(obj4) new █►', Object.getPrototypeOf(obj4));

function fabric() {
    const result = {};

    result.a = 1;
    result.getA = function () {
        return result.a;
    };

    return result;
}

function Constructor() {
    this.a = 1;
    this.getA = function () {
        return this.a;
    };
}

const arrayOfArrays = [
    [1, 11],
    [2, 22],
    [5, 55],
    [7, 77],
];

console.log('Object.fromEntries(arrayOfArrays) █►', Object.fromEntries(arrayOfArrays));