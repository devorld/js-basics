let value1;
const value2 = undefined;
const value3 = void 0;
// noinspection JSVoidFunctionReturnValueUsed,JSPotentiallyInvalidConstructorUsage
const value4 = Constructor();

console.log(`typeof █► ${typeof undefined}\n`);
// noinspection JSUnusedAssignment
console.log(`value1 █► ${value1}`);
console.log(`value2 █► ${value2}`);
console.log(`value3 █► ${value3}`);
console.log(`value4 █► ${value4}`);
// noinspection JSUnusedAssignment
console.log(value1 === value2, value2 === value3, value3 === value4);

function Constructor() {
    this.a = 1;
    this.getA = function () {
        return this.a;
    }
}
