import {getTypeName, TYPE_NAME as TN} from '../Types/_identify.js';
import {CONSOLE_TEXT_COLOR, CTC} from './console.js'

const FunctionGranularity = {
    FullCode: "FullCode",
    BodyCodeReplacement: "BodyCodeReplacement",
    ObjectAllProps: "ObjectAllProps",
    ObjectUniqueProps: "ObjectUniqueProps",
};

const MAX_NEST_LEVEL = 0;
const EXPOSE_FUNCTIONS = FunctionGranularity.ObjectUniqueProps;

function adaptOutput(part, nestingLevel = 0) {
    const typeName = getTypeName(part);
    let result;

    switch (typeName) {
        case TN.SYMBOL:
            result = String(part);
            break;
        case TN.ARRAY:
            result = nestingLevel > 0 ? '\n' : '';
            result += '    '.repeat(nestingLevel) + `Array(${part.length}) [${part.map(el => adaptOutput(el, nestingLevel + 1)).join(',')}]`;
            break;
        case TN.DATE:
            result = part.toLocaleString();
            break;
        case TN.SET:
            result = new Set(part);
            break;
        case TN.MAP:
            result = new Map(part);
            break;
        case TN.FUNCTION:
            result = EXPOSE_FUNCTIONS
                ? adaptOutput({
                    type: "?function?", ...Object.fromEntries(Object.entries(Object
                            .getOwnPropertyDescriptors(part)).map(
                            ([k, v]) => [k,
                                nestingLevel < MAX_NEST_LEVEL
                                    ? adaptOutput(v?.value, nestingLevel + 1)
                                    : funcBodyReplacer(v)]
                        )
                    )
                }, nestingLevel + 1)
                : funcBodyReplacer(part);
            break;
        case TN.WEAK_SET:
        case TN.WEAK_MAP:
        case TN.OBJECT:
            result = `${typeName}(${Object.entries(part).length}) ${
                highlightSystemCode(
                    JSON.stringify(
                        objectExposer(part, MAX_NEST_LEVEL, nestingLevel + 1),
                        undefined,
                        4)
                )
                    .replaceAll(/\\r\\n/g, "\r\n")
                    .replaceAll(/\\n/g, "\n    ")
                    .replaceAll(/\\"/g, "\"")
                    .replaceAll(/\\u001b\[34m|\\u001b\[35m|\\u001b\[36m|\\u001b\[0m/g, "")
            }`;
            break;
        default:
            try {
                result = String(part);
            } catch (e) {
                console.error("🐞", getTypeName(part), part, e)
            }
            break;
    }

    return result;
}

function objectExposer(obj, maxNestLevel = 99, nestLevel = 0) {
    return Object.fromEntries(
        Reflect.ownKeys(obj).map(
            key => {
                const d = Object.getOwnPropertyDescriptor(obj, key);
                const k = typeof key !== "symbol" ? key : `?${String(key)}?`
                const v = d?.value;
                const vType = typeof v;

                // getter and setter
                if (d?.writable === undefined) {
                    return [`${k} ?accessor?>`, Object.assign(Object.create(null), {
                        get: funcBodyReplacer(d?.get),
                        set: funcBodyReplacer(d?.set)
                    })];
                }

                switch (vType) {
                    case "undefined":
                        return [`${k} ?${vType}?>`, String(v)];
                    case "symbol":
                        return [`${k} ?${vType}?>`, String(v)];
                    case "function":
                        return [`${k} ?${vType}?>`, funcBodyReplacer(v)];
                    case "object":
                        if (v !== null) {
                            return nestLevel < maxNestLevel
                                ? [`${k} ?${vType}?>`, objectExposer(v, maxNestLevel, nestLevel + 1)]
                                : [`${k} ?${vType}?>`, Object.prototype.toString.call(v)];
                        }
                }

                // "null" and ...rest types
                return [`${k} ?${vType}?>`, v];
            }
        ).concat([[
            `?[[Prototype]]? ?${typeof Object.getPrototypeOf(obj)}?>`,
            Object.getPrototypeOf(obj) !== null
                ? nestLevel < maxNestLevel
                    ? objectExposer(Object.getPrototypeOf(obj), maxNestLevel, nestLevel + 1)
                    : Object.prototype.toString.call(obj)
                : null,
        ]])
    );
}

function objectToJSON(obj) {
    return obj.toString();
}

function functionExposer(funcObj) {
    switch (EXPOSE_FUNCTIONS) {
        case FunctionGranularity.ObjectAllProps:
            return objectToJSON(funcObj); // + type: ?fuction?
        case FunctionGranularity.ObjectUniqueProps:
            return "hehe";
        case FunctionGranularity.FullCode:
            return String(funcObj);
    }
    // case FunctionGranularity.BodyCodeReplacement:
    // default:
    return funcBodyReplacer(funcObj);
}

function funcBodyReplacer(value) {
    return String(value).replace(/{.*}/s, "{[code]}")
}

function highlightSystemCode(strValue) {
    if (typeof strValue !== "string" || !strValue.length) {
        return strValue;
    } else {
        return strValue
            .replaceAll(/(\?\[\[Prototype]]\?)/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
            .replaceAll(/(\[native code]|\[code])/g, `${CONSOLE_TEXT_COLOR.FgCyan}$1${CTC.reset}`)
            .replaceAll(/(\[object Object])/g, `${CTC.var}$1${CTC.reset}`)
            .replaceAll(/(\?function\?>)/g, `${CTC.func}$1${CTC.reset}`)
    }
}

export {adaptOutput};
