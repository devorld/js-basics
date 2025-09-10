const arrayLike = {
    '0': 9,
    '1': 111,
    '2': 222,
    '3': 333,
    length: 4,


    '4': 444,
    '5': 555,
}

const ctx = {
    print() {
        console.log(this);
        console.log([].join.apply(this, [";"]));
        console.log([].join.apply(this, this));
    }
}

ctx.print.apply(arrayLike);

function argsFn() {
    console.log(JSON.stringify(Object.getOwnPropertyDescriptors(arguments), undefined, 4));
}

argsFn(111, 222, 333);
