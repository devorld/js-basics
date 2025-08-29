import {monolog} from '../../../utils/monolog.js'
import {CONSOLE_TEXT_COLOR} from '../../../utils/console.js'

const proxyObj = new Proxy(monolog, {
    get(target, prop, receiver) {
        // console.log('args1', target);
        // console.log('args2', prop);
        // console.log('args3', receiver);
        // console.log('this', this);
        // console.log("target, receiver, this", target === receiver, target === this, receiver === this);
        console.log('target >', target);
        console.log('prop >', prop);
        console.log('target?.[prop] >', target?.[prop]);

        return target?.[prop] || console.log;
    }
});


console.log('--- --- ---');

console.log("proxyObj.printHeader === console.log", proxyObj.printHeader === console.log);
console.log("proxyObj.print234 === console.log", proxyObj.print234 === console.log);

console.log('--- --- ---');

proxyObj.printHeader(1);
proxyObj.print123(2);

const p = new Proxy(monolog, { get: (t, f) => t?.[f] || console.log})
const c = new Proxy(CONSOLE_TEXT_COLOR, { get: (t, p) => t?.[p] || ""})
