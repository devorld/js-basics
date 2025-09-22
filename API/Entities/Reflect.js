// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) (async function () {
    const {CTC} = await import('../../utils/console.js');
    const {printer} = await import('../../utils/monolog.js');

    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""});
    const p = new Proxy(printer ?? {}, {
        get: (t, f) => ["head", "title", "buff", "flush"].includes(f)
            ? t?.[f] ?? console.log
            : t?.[f]
    });


    p.head(`${clr.func}.getPrototypeOf${clr.reset}`);

    p.buff(`${clr.func}Object.getPrototypeOf ${clr.reset}===${clr.func} Reflect.getPrototypeOf${clr.reset}`,
        clr.sep, Object.getPrototypeOf === Reflect.getPrototypeOf);

    p.flush();

    p.title(`${clr.func}.getPrototypeOf${clr.reset}(non-object/primitive value)`);
    p.buff(`${clr.func}Object.getPrototypeOf${clr.reset}(1) - makes auto-boxing`, clr.nsep, Object.getPrototypeOf(1));
    p.flush();

    try {
        // noinspection JSCheckFunctionSignatures - example of primitive value passed to Reflect trap
        p.buff(`${clr.func}Reflect.getPrototypeOf${clr.reset}(${clr.var}1${clr.reset})`, clr.sep, Reflect.getPrototypeOf(1));
    } catch (e) {
        p.buff(`${clr.func}Reflect.getPrototypeOf${clr.reset}(${clr.var}1${clr.reset})`, clr.sep, `${e.name} 🐞 ${e.message}`);
        p.flush();
    }

    p.buff(`${clr.func}Reflect.getPrototypeOf${clr.reset}(${clr.var}Object(1)${clr.reset}) - we make manual-boxing`, clr.nsep, Reflect.getPrototypeOf(Object(1)));

    p.flush();
}())
