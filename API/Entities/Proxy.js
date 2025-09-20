import {ClassParent} from '../../Types/Object/inheritance/class-private.js'
import {monolog, printer} from '../../utils/monolog.js'
import {CTC} from '../../utils/console.js'

const proxyObj = new Proxy(monolog, {
    get(target, prop, receiver) {
        // console.log('args1', target);
        // console.log('args2', prop);
        // console.log('args3', receiver);
        // console.log('this', this);
        console.log("target, receiver, this", target === receiver, target === this, receiver === this);
        console.log('target >', target);
        console.log('prop >', prop);
        console.log('target?.[prop] >', target?.[prop]);

        return target?.[prop] || console.log;
    }
});


console.log('--- --- ---');

console.log("proxyObj.printHeader === console.log", proxyObj.printHeader === console.log);
// noinspection JSUnresolvedReference - example of calling undefined method
console.log("proxyObj.print234 === console.log", proxyObj.print234 === console.log);

console.log('--- --- ---');

proxyObj.printHeader(1);
// noinspection JSUnresolvedReference - example of calling undefined method
proxyObj.print123(2);

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] ?? ""});
const p = new Proxy(printer ?? {}, {
    get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
        ? t?.[f] ?? console.log
        : t?.[f]
});

console.log(p, clr);


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Protected ._property ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("Protected ._property");

p.title("proxying - object");
const instance = new ClassParent();
const proxiedInstance = new Proxy(instance, {
    // TODO: implementation
});

p.buff(proxiedInstance);
p.flush();

p.title("proxying - Class");
const ClassParentProxied = new Proxy(ClassParent, {
    // TODO: implementation
});
const instanceProxied = new ClassParentProxied();

p.buff(instanceProxied);
p.flush();
