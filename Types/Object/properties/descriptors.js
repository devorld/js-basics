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
            }
            // null -> default:
            // other type values
            return [`${k} ?${vType}?>`, d?.value];
        }
    )
);

export {remapDescriptors};
