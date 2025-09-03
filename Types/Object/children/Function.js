// noinspection GrazieInspection
import {getPropNames, getProps} from '../../index.js';
import {CTC} from '../../../utils/console.js';
import {printer} from '../../../utils/monolog.js';

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})


//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Function creation ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`Function creation`)

const functionExpression1 = new Function("argFe1", "argFe2", "return argFe1 + argFe2");

/*
const functionExpression1 = {
      #type: "function",
      #[[Environment]]: GlobalSC, |<--- ВСЕГДА ТОЛЬКО и СРАЗУ =-> globalThis
      #[[Scopes]]: [GlobalSC]}; |<--- ВСЕГДА ТОЛЬКО и СРАЗУ =-> globalThis
*/

const functionExpression2 = function () {
};

/*
const functionExpression2 = {
      #type: "function",
      #[[Environment]]: ModuleSC,
      #[[Scopes]]: [ModuleSC, GlobalSC],
};
*/

function functionDeclaration1() {
}

/*
const functionDeclaration1 = {
      #type: "function",
      #[[Environment]]: ModuleSC,
      #[[Scopes]]: [ModuleSC, GlobalSC],
};
*/

const namedFunctionExpressionA = function selfInternalNamedFunctionB() {
    // noinspection UnnecessaryLocalVariableJS - example
    let staticSelfFunc = selfInternalNamedFunctionB;

    return staticSelfFunc;
}

/*
const namedFunctionExpressionA = {
      #type: "function",
      #[[Environment]]: ModuleSC,
      #[[Scopes]]: [ModuleSC, GlobalSC],
};

const selfInternalNamedFunctionB = self;
*/

p.buff(`${clr.var}functionExpression1${clr.reset} = new Function()`, clr.sep, functionExpression1);
p.buff(`${clr.var}functionExpression2${clr.reset} = function () {}`, clr.sep, functionExpression2);
p.buff(`function ${clr.var}functionDeclaration1${clr.reset}() {}`, clr.sep, functionDeclaration1);
p.buff(`${clr.var}namedFunctionExpressionA${clr.reset} = function ${clr.var}selfInternalNamedFunctionB${clr.reset}() {}`, clr.sep, namedFunctionExpressionA, "🚫selfInternalNamedFunctionB🚫");
p.buff();
p.buff(`${clr.func}typeof${clr.reset} functionExpression1`, clr.sep, typeof functionExpression1);
p.buff(`Object${clr.func}.getOwnPropertyNames${clr.reset}(functionExpression1)`, clr.sep, getPropNames(functionExpression1));
p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(functionExpression1)`, clr.sep, getProps(functionExpression1));
p.buff(`Object${clr.func}.getPrototypeOf${clr.reset}(functionExpression1)`, clr.sep, Object.getPrototypeOf(functionExpression1));
p.flush();


//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ argsStructuring(a, b, ...args) = argsStructuring(1, 2, 3, 4, 5) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`argsStructuring(${CTC.var}a${CTC.reset}, ${CTC.var}b${CTC.reset}, ...${CTC.var}args${CTC.reset}) = argsStructuring(1, 2, 3, 4, 5)`);

function argsStructuring(a, b, ...args) {
    p.buff(`${CTC.var}arguments${CTC.reset}`, clr.sep, arguments);
    p.buff(`${CTC.var}a${CTC.reset}`, clr.sep, a);
    p.buff(`${CTC.var}b${CTC.reset}`, clr.sep, b);
    p.buff(`${CTC.var}args${CTC.reset}`, clr.sep, args);
    p.flush();
}

argsStructuring(1, 2, 3, 4, 5);


//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ () => {} ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head(`() => {}`);

const arrowFunc = (a, b, ...args) => [a, b, args];

p.buff(`${CTC.var}(a, b, ...args)${CTC.reset} => {}, arrowFunc(1, 2, 3, 4, 5)`, clr.sep, ...arrowFunc(1, 2, 3, 4, 5));
p.flush();
//endregion

//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ LexicalEnvironment ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("LexicalEnvironment");

p.title("Parent and Child LexicalEnvironments");

function parentFunc1(pArg11, pArg12) {
    // noinspection JSUnresolvedReference,JSUnusedGlobalSymbols - "global" object, childFunc1 field/variable
    const pLexicalEnvironment = {
        pEnvironmentRecord: {childFunc1, pArg1: pArg11, pArg2: pArg12, self: this},
        pOuter: globalThis ?? global ?? window,
    }

    childFunc1(10101, 10102);

    function childFunc1(cArg11, cArg12) {
        let replacer;

        // noinspection JSUnusedAssignment - replacer field/variable
        const cLexicalEnvironment = {
            cEnvironmentRecord: {replacer, cArg1: cArg11, cArg2: cArg12, self: this},
            cOuter: pLexicalEnvironment,
        };

        replacer = (key, value) => {
            switch (key) {
                case "":
                    return value;
                case "global":
                    return "global";
                case "performance":
                    return value.toString(); // stop recursion
                default:
                    return value; // recursion
            }
        }

        /*
        replacer.[[Environment]] === cLexicalEnvironment
        */

        p.buff(`${clr.var}childLexicalEnvironment${clr.reset}`, clr.sep, JSON.stringify(cLexicalEnvironment, replacer, ' '));
        p.flush();
    }

    /*
    childFunc1.[[Environment]] === pLexicalEnvironment
    */
}

parentFunc1(121, 122);
//endregion


//region ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ [[Scope]], [[Environment]], LexicalEnvironment and context ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
p.head("function - [[Environment]]");
p.head("{ EnvRecord: new func.[[Scopes]][0],");
p.head("Outer: func.[[Environment]] === func.[[Scopes]][1] }");
/*
[[Environment]] - псевдо-поле у объекта типа "function", которое хранит ссылку на LexicalEnvironment в котором был создан
*/
/*
getResultFunc = {
    name : getResult
    #type: "function",
    #[[Environment]]: sc01LexicalEnvironment = {
        EnvironmentRecord: sc01,
        Outer: sc02LexicalEnvironment = {
            EnvironmentRecord: sc02,
            Outer: childFunc2LexicalEnvironment = {
                EnvironmentRecord: childFunc2,
                Outer: parentFunc2LexicalEnvironment = {
                    EnvironmentRecord: parentFunc2,
                    Outer: ModuleLexicalEnvironment = {
                        EnvironmentRecord: Module,
                        Outer: GlobalLexicalEnvironment = {
                            EnvironmentRecord: Global,
                            Outer: null
                        }
                    }
                }
            }
        }
    },
    #[[Scopes]]:  [sc01, sc02, childFunc2, parentFunc2, ModuleSC, GlobalSC];
}
*/
// scope 06 - GlobalSC        console
// scope 05 - ModuleSC        parentFunc2
function parentFunc2(pArg21, pArg22) {                          // scope 04 - parentFunc2SC:  childFunc2, pArg21, pArg22
    return function childFunc2(cArg21, cArg22) {                // scope 03 - childFunc2:   a, cArg21, cArg22
        const a = cArg21;

        // noinspection UnnecessaryLabelJS - scope name
        sc02: {                                                 // scope 02 - sc02:         b, c
            const b = cArg22
            const c = pArg21;
            // noinspection UnnecessaryLabelJS - scope name
            sc01: {                                             // scope 01 - sc01:         d
                const d = pArg22;

                /*
                const sc01LexicalEnvironment = {
                    cEnvironmentRecord: sc01 === {d},
                    cOuter: sc02LexicalEnvironment,
                };
                */

                return function getResult(gr01) {               // scope 00 - getResultSC:    gr01
                    // .#[[Environment]] = sc01LexicalEnvironment

                    // debugger;                                // context:                 this === undefined
                    return a + b + c + d + gr01 + (!this || JSON.stringify(getProps(this), undefined, ' '));
                }
            }
        }
    }
}
/*
// Запуск/выполнение функции и автоматическое создание лексического окружения, в котором выполняется запуск:

// лексическое окружение/блок кода, внутри которого выполняется запуск
scRun: {
    // автоматически создаваемое лексическое окружение для выполнения запускаемой функции
    let getResultFuncLE = {
        // для каждого запуска - своё
        EnvironmentRecord: new getResultSC(),
        // следующий уровень всегда у запусков единый и равен - лексическому окружению, в котором функция была объявлена/создана
        Outer: getResultFunc["[[Environment]]"]
            // (from property) getResultFunc.#[[Environment]] === (get value) sc01LexicalEnvironment ^
    };

    getResultFunc(); // with getResultFuncLE
}
*/
const childFunc2Obj = parentFunc2(20101, 20101);
const that = {
    th: "th",
    at: "at",
    getResultFunc: childFunc2Obj(221, 222),
};

p.buff(`${clr.var}childFunc2Obj${clr.reset}`, clr.sep, childFunc2Obj);
p.buff(`childFunc2Obj${clr.var}[props]${clr.reset}`, clr.sep, getProps(childFunc2Obj));
p.buff(`${clr.var}getResultFunc${clr.reset} function from childFunc2Obj`, clr.sep, that.getResultFunc);
p.buff(`${clr.func}getResultFunc()${clr.reset} - call last nested function`, clr.sep, that.getResultFunc());
p.buff(`${clr.var}that${clr.reset}`, clr.sep, that);
p.flush();
//endregion


p.head(`Closures by .[[Environment]] reference: Sandbox - makeCounter`);

// noinspection JSUnusedAssignment - example
let count = 111;

function makeCounter() {
    let count = 13;

    return {
        plus: function () {
            return ++count;
        },
        minus: function () {
            return count -= 10;
        },
        get: function () {
            return count;
        }
    };
}

p.title("3 constructor execs")

// noinspection JSUnusedAssignment - example
count = 222;

const plusFunc = makeCounter().plus;
const minusFunc = makeCounter().minus;
const printFunc = makeCounter().get;

// noinspection JSUnusedAssignment - example
count = 333;

p.buff("3 plus", clr.sep, plusFunc(), plusFunc(), plusFunc());
p.buff("10 minus", clr.sep, minusFunc());
p.buff("get", clr.sep, printFunc());
p.flush();

p.title("1 constructor exec")

// noinspection JSUnusedAssignment - example
count = 444;

const counter = makeCounter();

count = 555;

p.buff("3 plus", clr.sep, counter.plus(), counter.plus(), counter.plus());
p.buff("10 minus", clr.sep, counter.minus());
p.buff("get", clr.sep, counter.get());
p.flush();
