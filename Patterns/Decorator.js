function calculate(x) {
    console.log(`Calculating for ${x}...............`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    cachingDecorator.originFunc = func;

    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }

        let result = func(x);

        cache.set(x, result);
        return result;
    };
}

calculate = cachingDecorator(calculate);

console.log("Result for 2:", calculate(1));
console.log("Run again for 1:", calculate(1));
console.log();
console.log("Result for 2:", calculate(2));
console.log("Run again for 1:", calculate(2));
console.log(...[JSON.stringify({
    v: cachingDecorator,
}, (k, v) => k === "global" ? "?global?" : v === undefined ? "?undefined?" : typeof(v) === "function" ? Object.getOwnPropertyNames(v).reduce((acc, k) => Object.assign(acc, {[k]: v[k]}), {"?type?": "function"}) : v, 1).replaceAll(/\\r\\n/g, "\r\n"), "█►", new Date().toISOString().split(/[TZ]/)[1], "█►"].reverse());
