// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

const TYPE_NAME = {
    UNDEFINED: 'undefined',
    NULL: 'null',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    BIGINT: 'bigint',
    STRING: 'string',
    SYMBOL: 'symbol',
    ARRAY: 'Array',
    OBJECT: 'Object',
    DATE: 'Date',
    FUNCTION: 'function',

    SET: 'Set',
    MAP: 'Map',
    WEAK_SET: 'WeakSet',
    WEAK_MAP: 'WeakMap',
}

function getTypeName(variable) {
    const NULL_TYPE = "null";
    const objType = typeof({})
    let typeStr = typeof variable;

    typeStr = variable !== null ? typeStr : NULL_TYPE;

    if (typeStr !== objType) return typeStr;

    typeStr = variable?.constructor?.name

    return typeStr;
}

if (isMainModule) {
    const examples = new Map([
        ['undefined', void 0],
        ['null', null],
        ['boolean', true],
        ['number', 1],
        ['bigint', 1n],
        ['string', 'a'],
        ['symbol', Symbol(1)],

        ['map', new Map],
        ['set', new Set()],
        ['array', []],
        ['object', {}],
        ['date', new Date()],
        ['function', (() => void 0)],
    ]);

    console.table(Array.from(examples).map(v => v[2] = {
        key: v[0],
        value: v[1],
        typeof: typeof (v[1]),
        getType: getTypeName(v[1])
    }));
    console.log('');
    examples.forEach((v, k) => typeof v === 'object' && v !== null && console.log(
        k,
        v[Symbol.toStringTag],
        v.constructor.name,
    ));

    const date = new Date();
    console.log('date', typeof date, date, date.constructor.name);

    const obj = {a: 1, b: 2};
    console.log('obj =', JSON.stringify(obj), Object.entries(obj).length);
}

export {TYPE_NAME, getTypeName};
