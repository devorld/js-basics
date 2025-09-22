import {ClassChild} from '../../Types/Object/inheritance/class-private.js'
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

const protectProtectedProps = function protectProtectedProps(target) {
    const throwAccessError = (propName) => {
        throw new Error(`⛔  Cannot access protected property ${propName}`);
    };

    return new Proxy(target, {
        construct(target, argArray, newTarget) {
            return protectProtectedProps(Reflect.construct(target, argArray, newTarget));
        },
        set(target, propName, newValue, receiver) {
            if (typeof propName === "string" && propName.startsWith('_')) {
                throwAccessError(propName);
            }

            return Reflect.set(target, propName, newValue, receiver);
        },
        get(target, propName, receiver) {
            if (typeof propName === "string" && propName.startsWith('_')) {
                throwAccessError(propName);
            }

            return Reflect.get(target, propName, receiver);
        },
        deleteProperty(target, propName) {
            if (typeof propName === "string" && propName.startsWith('_')) {
                throwAccessError(propName);
            }

            return Reflect.deleteProperty(target, propName);
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(propName => !(typeof propName === "string" && propName.startsWith('_')));
        },
        getPrototypeOf(target) {
            const proto = Reflect.getPrototypeOf(target);

            return ["object", "function"].includes(typeof proto) && proto !== null ? protectProtectedProps(proto) : proto;
        },
        apply(target, thisArg, argArray) {
            return Reflect.apply(target, thisArg, argArray);
        }
    });
}

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ class ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("class")

const ClassProxied = protectProtectedProps(ClassChild)

p.buff(clr.nsep, ClassProxied);
p.flush();

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ instance ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("instance")

// noinspection JSValidateTypes - 🤔
const instanceProxied = new ClassProxied();

p.buff(clr.nsep, instanceProxied);
p.flush();

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ tests for properties ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("tests for properties");

try {
    p.buff(ClassProxied._pseudoProtectedA);
} catch (e) {
    p.buff("ClassProxied._pseudoProtectedA", clr.sep, e.name, e.message);
}

try {
    p.buff(ClassProxied._pseudoProtectedC);
} catch (e) {
    p.buff("ClassProxied._pseudoProtectedC", clr.sep, e.name, e.message);
}

try {
    p.buff(instanceProxied._pseudoProtected1);
} catch (e) {
    p.buff("instanceProxied._pseudoProtected1", clr.sep, e.name, e.message);
}

try {
    p.buff(instanceProxied._pseudoProtected3);
} catch (e) {
    p.buff("instanceProxied._pseudoProtected3", clr.sep, e.name, e.message);
}

p.flush();

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ tests for methods ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("tests for methods");

try {
    p.buff(ClassProxied._stringifyChildClass());
} catch (e) {
    p.buff("ClassProxied._stringifyChildClass", clr.sep, e.name, e.message);
}

try {
    p.buff(ClassProxied._stringifyParentClass());
} catch (e) {
    p.buff("ClassProxied._stringifyParentClass", clr.sep, e.name, e.message);
}

try {
    p.buff(instanceProxied._stringifyChildInstance());
} catch (e) {
    p.buff("instanceProxied._stringifyChildInstance", clr.sep, e.name, e.message);
}

try {
    p.buff(instanceProxied._stringifyParentInstance());
} catch (e) {
    p.buff("instanceProxied._stringifyParentInstance", clr.sep, e.name, e.message);
}

p.flush();

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ getPrototypeOf ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
p.title("getPrototypeOf")

p.buff(`Object${clr.func}.getPrototypeOf${clr.reset}(${clr.func}ClassProxied${clr.reset})`, clr.sep, Object.getPrototypeOf(ClassProxied));
p.buff(`Object${clr.func}.getPrototypeOf${clr.reset}(${clr.var}instanceProxied${clr.reset})`, clr.sep, Object.getPrototypeOf(instanceProxied));
p.flush();

try {
    for (let key in instanceProxied) {
        p.buff(clr.sep, key, instanceProxied[key]);
    }
} catch (e) {
    p.buff("🐞", clr.sep, e.name, e.message);
}

p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  {proxy, revoke} = Proxy.revocable(target, { ... traps ... }) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(" {proxy, revoke} = Proxy.revocable(target, { ... traps ... })");

const log = (...args) => console.log('🍞', ...args.map(s => s.replaceAll("\n", "\n🍞 ")));

// noinspection JSValidateTypes - 🤔
let {proxy: objProxied, revoke: revokeFunc} = Proxy.revocable(new ClassProxied(), {
    get(target, p, receiver) {
        console.debug('🔍', target, p, receiver)

        return Reflect.get(target, p, receiver);
    }
});

objProxied.print(log);

revokeFunc();

try {
    objProxied.print(log);
} catch (e) {
    console.trace(clr.sep, e.name, "🐞", e.message);
}

p.flush();
