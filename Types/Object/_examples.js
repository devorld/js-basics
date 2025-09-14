import {CTC, printAll} from '../../utils/console.js'
import {printer} from '../../utils/monolog.js'

const makeDataDtor = (value, optionsObj) => ({
    value,
    writable: true,
    enumerable: true,
    configurable: true,
    ...optionsObj,
});

const makeAccessDtor = (propName, objGetterSetter, optionsObj) => ({
    ...Object.getOwnPropertyDescriptor(objGetterSetter, propName),
    enumerable: true,
    configurable: true,
    ...optionsObj,
});

const sSymProp = Symbol('s');
const tSymProp = Symbol('t');
const _xSymProp = Symbol('_x');
const xSymProp = Symbol('x');
const _ySymProp = Symbol('_y');
const ySymProp = Symbol('y');

const objSymExampleDescriptors = {
    0: makeDataDtor({ref: "original"}),
    1: makeDataDtor("a"),
    2: makeDataDtor('b', {enumerable: false}),
    3: makeDataDtor('c'),

    4: makeDataDtor(4), // d
    5: makeDataDtor(5, {enumerable: false}), // e
    6: makeDataDtor(6), // f

    g: makeDataDtor(7),
    h: makeDataDtor(8, {enumerable: false}),
    i: makeDataDtor(9),

    j: makeDataDtor('j'),
    k: makeDataDtor('k', {enumerable: false}),
    l: makeDataDtor('l'),

    m: makeDataDtor(Symbol('m')),
    n: makeDataDtor(Symbol('n'), {enumerable: false}),
    o: makeDataDtor(Symbol('o')),

    [Symbol('p')]: makeDataDtor('p'),
    [Symbol('q')]: makeDataDtor('q', {enumerable: false}),
    [Symbol('r')]: makeDataDtor('r'),

    [sSymProp]: makeDataDtor(sSymProp),
    [tSymProp]: makeDataDtor(tSymProp, {enumerable: false}),
    [Symbol('u')]: makeDataDtor(Symbol('u')),

    _v: makeDataDtor('v', {configurable: false, enumerable: false, writable: false}),
    v: makeAccessDtor(
        'v',
        {
            get v() {
                return this._v;
            },
            set v(newValue) {
                this._v = newValue;
            },
        }),

    _w: makeDataDtor('w', {configurable: false, enumerable: false, writable: true}),
    w: makeAccessDtor('w', {
        get w() {
            return this._w;
        },
        set w(newValue) {
            this._w = newValue;
        },
    }, {
        enumerable: false,
        configurable: false,
    }),

    [_xSymProp]: makeDataDtor(_xSymProp, {configurable: true, enumerable: true, writable: false}),
    [xSymProp]: makeAccessDtor(xSymProp, {
        get [xSymProp]() {
            return this[_xSymProp];
        },
        set [xSymProp](newValue) {
            this[_xSymProp] = newValue;
        },
    }, {
        configurable: false,
        enumerable: false,
    }),

    [_ySymProp]: makeDataDtor(_ySymProp, {configurable: false, enumerable: false, writable: true}),
    [ySymProp]: makeAccessDtor(ySymProp, {
        get [ySymProp]() {
            return this[_ySymProp];
        },
        set [ySymProp](newValue) {
            this[_ySymProp] = newValue;
        },
    }, {
        configurable: true,
        enumerable: true,
    }),

    z: makeDataDtor(function (value) {
        return this[ySymProp] === value;
    })
};

const objSymExample = Object.defineProperties(
    Object.create(null),
    objSymExampleDescriptors,
);

const objShallowCopyAndChild = Object.defineProperties(
    Object.create(objSymExample),
    objSymExampleDescriptors,
);

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""});
    const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log});

    printAll(objSymExample[xSymProp]);
    printAll(objSymExample[ySymProp]);

    p.title(`Symbol-Setter over symbol-property with ${clr.var}{writable: false}${clr.reset}`);

    try {
        p.buff(objSymExample[xSymProp], clr.sep, objSymExample[xSymProp] = xSymProp, clr.sep, objSymExample[xSymProp]);
    } catch (e) {
        p.buff(objSymExample[xSymProp], '=', xSymProp, ':', e.message);
    }

    p.title(`Symbol-Setter symbol-property with ${clr.var}{writable: true}${clr.reset}`);

    try {
        p.buff(objSymExample[ySymProp], clr.sep, objSymExample[ySymProp] = ySymProp, clr.sep, objSymExample[ySymProp]);
    } catch (e) {
        p.buff(objSymExample[ySymProp], '=', ySymProp, ':', e.message);
    }

    p.flush();
}

export {objSymExample, objShallowCopyAndChild, ySymProp};
