import {Fabric} from './Object/class.js'

const TYPE_NAME = {
    UNDEFINED: 'undefined',
    NULL: 'null',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    BIGINT: 'bigint',
    STRING: 'string',
    SYMBOL: 'symbol',

    FUNCTION: 'function',

    OBJECT: 'Object',

    ARRAY: 'Array',
    DATE: 'Date',

    SET: 'Set',
    MAP: 'Map',
    WEAK_SET: 'WeakSet',
    WEAK_MAP: 'WeakMap',

    INSTANCE: 'InstanceObject',
}

const getPropNames = (obj) => [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)];
const getProps = (obj) =>
    Object.entries(Object.getOwnPropertyDescriptors(obj))
        .map(propArray => ({[propArray[0]]: propArray[1].value}))
        .reduce((accumulator, propObj) => Object.assign(accumulator, propObj), {});

function getTypeName(variable) {
    const NULL_TYPE = "null";
    const objType = typeof({})
    let typeStr = typeof variable;

    typeStr = variable !== null ? typeStr : NULL_TYPE;

    if (typeStr !== objType) return typeStr;

    // only "object" gets to this logic below
    typeStr = variable?.constructor?.name ?? TYPE_NAME.OBJECT;

    typeStr = Object.values(TYPE_NAME).includes(typeStr) ? typeStr : TYPE_NAME.INSTANCE;

    return typeStr;
}

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const examples = new Map([
        ['undefined', void 0],
        ['null', null],
        ['boolean', true],
        ['number', 1],
        ['bigint', 1n],
        ['string', 'a'],
        ['symbol', Symbol(1)],

        ['function', (() => void 0)],
        ['new Function()', new Function()],

        ['object', {}],

        ['array', []],
        ['date', new Date()],

        ['map', new Map],
        ['set', new Set()],
        ['weakMap', new WeakMap],
        ['weakSet', new WeakSet()],

        ['new Promise()', new Promise(() => {})],
        ['new Fabric()', new Fabric(null, null)],
    ]);

    console.table(Array.from(examples).map(v => v[2] = {
        key: v[0],
        value: v[1],
        typeof: typeof (v[1]),
        getType: getTypeName(v[1]),
    }));
    console.table(Array.from(examples).reduce((acc, v) => Object.assign(acc, {
        [v[0]]: {
            "String(v)": String(v[1]),
            "v.toString()": v[1]?.toString?.(),
        }
    }), {}));

    const acc = [];

    console.log('\nv[Symbol.toStringTag]');
    examples.forEach((v, k) => typeof v === 'object' && v !== null && acc.push({
        k,
        "v[Symbol.toStringTag]": v[Symbol.toStringTag],
        "v.constructor.name": v.constructor.name,
    }));
    console.table(acc);

    const date = new Date();
    console.log('date', typeof date, date, date.constructor.name);

    const obj = {a: 1, b: 2};
    console.log('obj =', JSON.stringify(obj), Object.entries(obj).length);
}

export {TYPE_NAME, getTypeName, getProps, getPropNames};
