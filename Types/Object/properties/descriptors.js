const remapDescriptors = (obj) => Object.fromEntries(
    Object.entries(Object.getOwnPropertyDescriptors(obj)).map(
        ([k, d]) => d?.writable !== undefined
            ? [k, d?.value]
            : [k, {get: d?.get, set: d?.set}]
    )
);

export {remapDescriptors};
