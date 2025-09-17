import {getTypeName, TYPE_NAME as TN} from '../Types/_identify.js';
import {CONSOLE_TEXT_COLOR, CTC} from './console.js'

const FunctionGranularity = {
    FullCode: "FullCode",
    BodyCodeReplacement: "BodyCodeReplacement",
    ObjectAllProps: "ObjectAllProps",
    ObjectUniqueProps: "ObjectUniqueProps",
};

const PrototypeType = {
    Any: "Any",
    Unique: "Unique",
    None: "None",
    _standardObjectProtoRef: Object.prototype,
    _standardFunctionProtoRef: Function.prototype,
}

const formatter = {
    MAX_NEST_LEVEL: 9,
    EXPOSE_FUNCTIONS: FunctionGranularity.ObjectUniqueProps,
    SHOW_INSTANCE_PROTOTYPE: PrototypeType.Unique,
    SHOW_FUNCTION_PROTOTYPE: PrototypeType.Unique,
    functionStandardPropsNames: ["length", "name", "arguments", "caller", "constructor", "length", "name"],

    anyToString: function (part, maxNestLevel = this.MAX_NEST_LEVEL, nestingLevel = 0, willBeStringified = false, ctorRef) {
        if (!Number.isFinite(nestingLevel) || nestingLevel > maxNestLevel + 1) {
            return "🤯";
        }

        const typeName = getTypeName(part);
        const typesPassAsIs = [TN.MAP, TN.SET];
        let result;

        switch (typeName) {
            case TN.SYMBOL:
                result = this.symbolToString(part);
                break;
            case TN.ARRAY:
                result = this.arrayToString(part, maxNestLevel, nestingLevel);
                break;
            case TN.DATE:
                result = this.dateToString(part);
                break;
            case TN.FUNCTION:
                result = this.functionToString(part, maxNestLevel, nestingLevel)
                break;
            case TN.INSTANCE:
            case TN.OBJECT:
                result = this.objectToString(part, maxNestLevel, nestingLevel, [], ctorRef);
                break;
            default:
                !willBeStringified && typesPassAsIs.includes(typeName)
                    ? result = part
                    : result = this.otherToString(part);
                break;
        }

        return result;
    },

    objectToString: function (obj, maxNestLevel = this.MAX_NEST_LEVEL, nestLevel = 0, skipKeys = [], ctorRef) {
        let actualCtorRef = ctorRef;

        if (obj === null) {
            return `${Object.prototype.toString.call(obj)}`;
        } else if (nestLevel > maxNestLevel) {
            return `${Object.prototype.toString.call(obj)}${obj?.constructor?.name}(${Reflect.ownKeys(obj).length})`;
        } else if (obj === PrototypeType._standardObjectProtoRef) {
            return `${CONSOLE_TEXT_COLOR.BgGray}[object ?rootObjectPrototype?]${CTC.reset}`;
        } else if (obj === PrototypeType._standardFunctionProtoRef) {
            return `${CONSOLE_TEXT_COLOR.BgGray}[object ?rootFunctionPrototype?]${CTC.reset}`;
        }

        if (typeof obj === "function") {
            actualCtorRef = obj;
        }

        const result = Object.fromEntries(
            Reflect.ownKeys(obj)
                .filter(key =>
                    !skipKeys
                        .concat(this.SHOW_FUNCTION_PROTOTYPE === PrototypeType.None ? ["prototype"] : [])
                        .includes(key))
                .map(key => {
                        const d = Object.getOwnPropertyDescriptor(obj, key);
                        const k = typeof key !== "symbol" ? key : `?${String(key)}?`
                        const v = d?.value;
                        const vType = typeof v;

                        if (key === "constructor" &&
                            this.SHOW_FUNCTION_PROTOTYPE === PrototypeType.Unique &&
                            v === actualCtorRef) {

                            return [`${k} ?${vType}?>`, "?parentRef?"];
                        }

                        // getter and setter
                        if (d?.writable === undefined) {
                            return [`${k} ?accessor?>`, Object.assign(Object.create(null), {
                                get: this.funcBodyReplacer(d?.get),
                                set: this.funcBodyReplacer(d?.set)
                            })];
                        }

                        return [`${k} ?${vType}?>`, this.anyToString(v, maxNestLevel, nestLevel + 1, true, actualCtorRef)];
                    }
                ).concat(
                this.SHOW_INSTANCE_PROTOTYPE === PrototypeType.None
                || (this.SHOW_INSTANCE_PROTOTYPE === PrototypeType.Unique && [PrototypeType._standardObjectProtoRef, PrototypeType._standardFunctionProtoRef].includes(Object.getPrototypeOf(obj)))
                    ? []
                    : [[
                        `?[[Prototype]]? ?${typeof Object.getPrototypeOf(obj)}?>`,
                        this.anyToString(Object.getPrototypeOf(obj), maxNestLevel, nestLevel + 1, true, actualCtorRef),
                    ]])
        );

        return `${Object.prototype.toString.call(obj)}${obj?.constructor?.name}(${Reflect.ownKeys(obj).length}) ${
            this.highlightSystemCode(
                JSON.stringify(
                    result,
                    undefined,
                    4)
            )
        }`;
    },

    functionToString: function (funcObj, maxNestLevel = this.MAX_NEST_LEVEL, nestingLevel = 0) {
        if (nestingLevel > maxNestLevel) {
            return this.funcBodyReplacer(funcObj);
        }

        switch (this.EXPOSE_FUNCTIONS) {
            case FunctionGranularity.BodyCodeReplacement:
                return this.funcBodyReplacer(funcObj);
            case FunctionGranularity.ObjectAllProps:
                return this.objectToString(funcObj, maxNestLevel, nestingLevel + 1);
            case FunctionGranularity.ObjectUniqueProps:
                return this.objectToString(funcObj, maxNestLevel, nestingLevel + 1, this.functionStandardPropsNames);
            case FunctionGranularity.FullCode:
                return String(funcObj);
        }

        throw new Error("Reached unreachable corner of code");
    },

    funcBodyReplacer: function (value) {
        return String(value).replace(/{.*}/s, "{[code]}")
    },

    highlightSystemCode: function (strValue) {
        if (typeof strValue !== "string" || !strValue.length) {
            return strValue;
        } else {
            return strValue
                .replaceAll(/(\?\[\[Prototype]]\?)/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
                .replaceAll(/(\[native code]|\[code])/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
                .replaceAll(/(\[object Object])/g, `${CTC.var}$1${CTC.reset}`)
                .replaceAll(/(\?function\?>)/g, `${CTC.func}$1${CTC.reset}`)
                .replaceAll(/\\r\\n/g, "\r\n")
                .replaceAll(/\\n/g, "\n    ")
                .replaceAll(/\\"/g, "\"")
                .replaceAll(/\\u001b\[34m|\\u001b\[35m|\\u001b\[36m|\\u001b\[0m|\\u001b\[100m/g, "")
        }
    },

    symbolToString(symbol) {
        return String(symbol);
    },

    dateToString(date) {
        return date.toLocaleString();
    },

    arrayToString(array, maxNestLevel = this.MAX_NEST_LEVEL, nestingLevel = 0) {
        let result;

        result = nestingLevel > 0 ? '\n' : '';
        result += '    '.repeat(nestingLevel) + `Array(${array.length}) [${nestingLevel <= maxNestLevel
            ? array.map(el => this.anyToString(el, maxNestLevel, nestingLevel + 1)).join(',')
            : "?items?"
        }]`;

        return result;
    },

    otherToString(value) {
        let result;

        try {
            result = ![undefined, null].includes(value) ? String(value) : `${CONSOLE_TEXT_COLOR.BgGray}${value}${CTC.reset}`;
        } catch (error) {
            console.table({
                "🐞": error.name,
                v: value,
                "getTypeName(v)": getTypeName(value),
                "typeof v": typeof value,
                "e.message": error.message,
            });
            result = `🐞 ${error.message} 🐞`;
        }

        return result;
    },
};


// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const func1 = (v) => v;
    const func2 = function (v) {
        return v
    };

    function func3(v) {
        return v
    }

    const array = [
        (v) => {
            return v
        },
        new Function(),
        function (v) {
            return v
        },
        func1,
        func2,
        func3,
    ];

    console.table(array.map(f => ({
        f,
        "String(f)": String(f),
        "Object.prototype.toString.call(f)": Object.prototype.toString.call(f),
        "formatter.functionToString(f)": formatter.functionToString(f),
    })));

    array.forEach(f => console.log('\n\n💚',
        '\n❗',/*"String(f)": */String(f),
        '❗',/*"FullCode": */{...formatter, EXPOSE_FUNCTIONS: FunctionGranularity.FullCode}.functionToString(f),
        '❗',/*"BodyCodeReplacement": */{
            ...formatter,
            EXPOSE_FUNCTIONS: FunctionGranularity.BodyCodeReplacement
        }.functionToString(f),
        '\n❗',/*"ObjectAllProps": */formatter.highlightSystemCode({
            ...formatter,
            EXPOSE_FUNCTIONS: FunctionGranularity.ObjectAllProps
        }.functionToString(f)),
        '\n❗',/*"ObjectUniqueProps": */formatter.highlightSystemCode({
            ...formatter,
            EXPOSE_FUNCTIONS: FunctionGranularity.ObjectUniqueProps
        }.functionToString(f)),
    ));

    const temp = {...formatter, EXPOSE_FUNCTIONS: FunctionGranularity.ObjectUniqueProps}.functionToString(array[5]);

    console.log(temp);
}

export {formatter};
