import {CTC} from '../../../../utils/console.js'
import {printer} from '../../../../utils/monolog.js'
import {objSymExample} from '../../create.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""});
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log});


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("")

/* {
    a: 1,
    b: 2,
    c: Symbol(3),
    4: 'd',
    5: 'e',

    6: Symbol('f'),
    [Symbol(7)]: 'g',
    [Symbol('h')]: 8
} */

const ctx = Object.assign({
    getRemappedObj(a, b, c, four, five) {
        return this.getSymbols().reduce((acc, sym) => this.hasOwnProperty(sym) && !acc.hasOwnProperty(sym)
            ? Object.assign(acc, {[sym]: this[sym] ?? sym})
            : acc, {[a]: a, [b]: b, [c]: c, [four]: four, [five]: five, args: arguments.length})
    },
    getSymbols() {
        return Object.getOwnPropertySymbols(this).concat(Object.values(this).filter(el => typeof el === "symbol"));
    },
}, objSymExample);

p.buff(`${clr.var}ctx${clr.reset}`, `\n${clr.sep}`, ctx);
p.buff(`${clr.var}ctx${clr.func}.getRemappedObj()${clr.reset}`, `\n${clr.sep}`, ctx.getRemappedObj(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']));

const remapFunc = ctx.getRemappedObj;

try {
    let result;
    // noinspection JSCheckFunctionSignatures
    console.assert(...[result = remapFunc(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']), "remapFunc()", !result].reverse());
} catch (e) {
    p.flush();
    p.buff(`${clr.func}remapFunc()${clr.reset}`, clr.sep, e.message);
}

p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ remapFunc.apply(context, args = [arg1, arg2, argN]) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`remapFunc${clr.func}.apply${clr.reset}(${clr.var}context${clr.reset}, args = [arg1, arg2, argN])`);

let args;

// noinspection JSUnusedAssignment
p.buff(`${clr.var}remapFunc${clr.func}.apply(${clr.var}ctx${clr.func}, args = [ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']])${clr.reset}`, `\n${clr.sep}`, remapFunc.apply(ctx, args = [ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']]));
p.buff(`${clr.var}remapFunc${clr.func}.apply(${clr.var}ctx${clr.func}, args = {"0": ctx.a, "1": ctx.b, "2": ctx.c, "3": ctx['4'], "4": ctx['5'], length: 6})${clr.reset}`, `\n${clr.sep}`, remapFunc.apply(ctx, args = {
    "0": ctx.a,
    "1": ctx.b,
    "2": ctx.c,
    "3": ctx['4'],
    "4": ctx['5'],
    length: 6
}));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ remapFunc.call(context, arg1, arg2, argN) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`remapFunc${clr.func}.call${clr.reset}(${clr.var}context${clr.reset}, arg1, arg2, argN)`);

p.buff(`${clr.var}remapFunc${clr.func}.call(${clr.var}ctx${clr.func}, ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5'])${clr.reset}`, `\n${clr.sep}`, remapFunc.call(ctx, ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ remapFunc.bind(context)(arg1, arg2, argN) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`remapFunc${clr.func}.bind${clr.reset}(${clr.var}context${clr.reset})(arg1, arg2, argN)`);

let boundCtxFunc;

p.buff(`${clr.var}remapFunc${clr.func}.bind${clr.reset}(${clr.var}ctx${clr.reset})${clr.func}(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5'])${clr.reset}`, `\n${clr.sep}`, remapFunc.bind(ctx)(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']));
p.buff(`${clr.var}boundCtxFunc${clr.reset} = ${clr.var}remapFunc${clr.func}.bind(${clr.var}ctx${clr.func})${clr.reset}`, `\n${clr.sep}`, boundCtxFunc = remapFunc.bind(ctx));
p.buff(`${clr.var}boundCtxFunc${clr.func}(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5'])${clr.reset}`, `\n${clr.sep}`, boundCtxFunc(ctx.a, ctx.b, ctx.c, ctx['4'], ctx['5']));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ boundCtxFunc.bind(null, arg1, arg2)(argN) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`boundCtxFunc${clr.func}.bind(${clr.reset}null, ${clr.var}arg1, arg2${clr.func})${clr.reset}(argN)`);

let boundArgsFunc;

p.buff(`${clr.var}boundCtxFunc${clr.func}.bind${clr.reset}(null, ${clr.var}ctx.a, ctx.b, ctx.c${clr.reset})${clr.func}(ctx['4'], ctx['5'])${clr.reset}`, `\n${clr.sep}`, boundCtxFunc.bind(null, ctx.a, ctx.b, ctx.c)(ctx['4'], ctx['5']));
p.buff(`${clr.var}boundArgsFunc${clr.reset} = ${clr.var}boundCtxFunc${clr.func}.bind(${clr.reset}null, ${clr.var}ctx.a, ctx.b, ctx.c${clr.func})${clr.reset}`, `\n${clr.sep}`, boundArgsFunc = boundCtxFunc.bind(null, ctx.a, ctx.b, ctx.c));
p.buff(`${clr.var}boundArgsFunc${clr.func}(ctx['4'], ctx['5'])${clr.reset}`, `\n${clr.sep}`, boundArgsFunc(ctx['4'], ctx['5']));
p.flush();


// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ remapFunc.bind(ctx).bind(null, arg1).bind(null, arg2).bind(null, argN)() ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`${clr.var}remapFunc${clr.func}.bind${clr.reset}(${clr.var}ctx${clr.reset})${clr.func}.bind${clr.reset}(null, ${clr.var}arg1${clr.reset})${clr.func}.bind${clr.reset}(null, ${clr.var}arg2${clr.reset})${clr.func}.bind${clr.reset}(null, ${clr.var}argN${clr.reset})${clr.func}()${clr.reset}`);

p.buff(`${clr.var}remapFunc${clr.func}.bind${clr.var}(ctx${clr.reset})
        ${clr.func}.bind${clr.reset}(null, ${clr.var}ctx.a${clr.reset})
        ${clr.func}.bind${clr.reset}(undefined, ${clr.var}ctx.b${clr.reset})
        ${clr.func}.bind${clr.reset}(0, ${clr.var}ctx.c${clr.reset})
        ${clr.func}.bind${clr.reset}(false, ${clr.var}ctx['4']${clr.reset})
        ${clr.func}.bind${clr.reset}(globalThis, ${clr.var}ctx['5']${clr.reset})
        ${clr.func}()${clr.reset}`, `\n${clr.sep}`,
    remapFunc.bind(ctx)
        .bind(null, ctx.a)
        .bind(undefined, ctx.b)
        .bind(0, ctx.c)
        .bind(false, ctx['4'])
        .bind(globalThis, ctx['5'])
        ()
);
p.flush();
