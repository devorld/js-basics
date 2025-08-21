console.log('\n░░░░░░░░░░░░░░░░ create ░░░░░░░░░░░░░░░░');

const description = 'Lorem ipsum';
const uuid1 = Symbol(description);
const uuid2 = Symbol(description);

console.log(`uuid1 as string █► ${uuid1.toString()}`);
console.log(`uuid2 as string █► ${uuid2.toString()}`);


console.log('\n░░░░░░░░░░░░░░░░ compare ░░░░░░░░░░░░░░░░');

console.log(`uuid1 === uuid2 █► ${uuid1 === uuid2}`);
console.log(`Symbol(1) === Symbol(1) █► ${Symbol(1) === Symbol(1)}`);


console.log('\n░░░░░░░░░░░░░░░░ global registry ░░░░░░░░░░░░░░░░');

const sym = Symbol.for('s')
console.log(`Symbol.for('s') === Symbol.for('s') █► ${sym=== Symbol.for('s')}`);

const symKey = Symbol.keyFor(sym)
console.log(`Symbol.keyFor(sym) === Symbol.keyFor(sym) █► ${symKey === Symbol.keyFor(sym)}`);


console.log('\n░░░░░░░░░░░░░░░░ system registry ░░░░░░░░░░░░░░░░');

for (let prop of Object.getOwnPropertyNames(Symbol)) {
    if (typeof(Symbol[prop]) === 'symbol') console.log(`█► ${prop}`);
}
