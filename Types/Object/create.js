const objSymExample = {
    a: 1,
    b: 2,
    c: Symbol(3),
    4: 'd',
    5: 'e',
    6: Symbol('f'),
    [Symbol(7)]: 'g',
    [Symbol('h')]: 8
};

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const objO1 = Object(1);
    const objO2 = new Object(1);

    console.log(objO1 === objO2)

    console.dir(objO1, {showHidden: true});

    console.dir(objO2, {showHidden: true});

    console.log("Reflect.getPrototypeOf(objO1) === Reflect.getPrototypeOf(objO2)", Reflect.getPrototypeOf(objO2) === Reflect.getPrototypeOf(objO2));


    const objO3 = Object(objO1);
    const objO4 = new Object(objO1);
    console.log("Object(objO1) === new Object(objO1) :", objO3 === objO4);
        console.dir(1, {showHidden: true});

    const obj1 = {};
    const obj2 = Object.create(null);
    const obj3 = fabric();
    const obj4 = new Constructor();
    const getProps = (obj) => [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
    const getDescriptors = (obj) => Object.getOwnPropertyDescriptors(obj);

    console.log('obj1 █►', obj1, getProps(obj1));
    console.log(getDescriptors(obj1), '\n');

    console.log('obj2 █►', obj2, getProps(obj2));
    console.log(getDescriptors(obj2), '\n');

    console.log('obj3 █►', obj3, obj3.a, obj3.getA(), getProps(obj3));
    console.log(getDescriptors(obj3), '\n');

    console.log('obj4 █►', obj4, obj4.a, obj4.getA(), getProps(obj4));
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
}

export {objSymExample};
