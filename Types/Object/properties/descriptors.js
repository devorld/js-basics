const remapDescriptors = (obj) => Object.fromEntries(
    Object.entries(Object.getOwnPropertyDescriptors(obj)).map(
        ([k, d]) => {
            const funcBodyReplacer = (value) => String(value).replace(/{.*}/s, "{[code]}");
            const vType = typeof (d?.value);

            switch (vType) {
                case "function":
                    return [`${k} ?${typeof vType}?>`, funcBodyReplacer(d?.value)];
                case "undefined":
                    return [`${k} ?${vType}?>`, String(d?.value)];
                case "object":
                    if (d?.value !== null) {
                        return [`${k} ?${vType}?>`, remapDescriptors(d?.value)];
                    }
                // null -> default:
                default:
                    // other type values
                    return [`${k} ?${vType}?>`, d?.value];
            }

            /*
            * commit and delete
            * correctly works before re-writing to switch()...case:
            return d?.writable !== undefined && !k.endsWith("?>")
                ? typeof d?.value === "object" && d?.value !== null
                    // object value, not null
                    ? [`${k} ?${typeof d?.value}?>`, remapDescriptors(d?.value)]
                    // undefined, function, other values
                    : ["undefined", "function"].includes(typeof (d?.value))
                        // undefined, function values
                        ? typeof d?.value === "function"
                            // function type value
                            ? [`${k} ?${typeof d?.value}?>`, funcBodyReplacer(d?.value)]
                            // undefined type value
                            : [`${k} ?${typeof d?.value}?>`, String(d?.value)]
                        // other type values
                        : [`${k} ?${typeof d?.value}?>`, d?.value]
                // getter and setter
                : [k, Object.assign(Object.create(null), {
                    get: funcBodyReplacer(d?.get),
                    set: funcBodyReplacer(d?.set)
                })];
             */
        }
    )
);

export {remapDescriptors};
