import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})

const rtd = (object) => JSON.stringify(object, undefined, 2);

p.head(`getter and setter descriptors`);

function IntEmitWrap(value = 0) {
    this._value = value;
    Object.defineProperty(this, "value", {
        set() {
            p.buff(`WRITE: from (${this._value}) - to (${value})`);
            p.flush({keepMaxLengths: true});
            this._value = value;
        },
        get() {
            p.buff(`READ: (${this._value})`);
            p.flush({keepMaxLengths: true});
            return this._value;
        },
        configurable: true,
    });
}

const intVerbose = new IntEmitWrap();

p.buff(`intVerbose${clr.func}.value${clr.reset}`, clr.sep, intVerbose.value);
p.buff(`intVerbose${clr.func}.value =${clr.reset} 111`, clr.sep, intVerbose.value = 111);
p.buff(`intVerbose${clr.func}.value${clr.reset}`, clr.sep, intVerbose.value);
p.flush();


p.head(`enumerable and configurable`);

const displayState = () => {
    p.buff(`${clr.var}intVerbose${clr.reset}`, `\n${clr.sep}`, rtd(intVerbose));
    p.flush();
    p.buff(`Object${clr.func}.getOwnPropertyDescriptors${clr.reset}(${clr.var}intVerbose${clr.reset})`, `\n${clr.sep}`, Object.getOwnPropertyDescriptors(intVerbose));
    p.flush();
};

p.title('before');
displayState();

p.title('modify enumerable and configurable');
p.buff(`Object${clr.func}.defineProperty${clr.reset}(intVerbose, ${clr.var}"value", {enumerable: true, configurable: false}${clr.reset})`, `\n${clr.sep}`, rtd(Object.defineProperty(intVerbose, "value", {enumerable: true, configurable: false})));
p.flush();
p.buff(`Object${clr.func}.defineProperty${clr.reset}(intVerbose, ${clr.var}"value", {enumerable: true, configurable: false}${clr.reset})`, `\n${clr.sep}`, rtd(Object.defineProperty(intVerbose, "_value", {enumerable: false, configurable: false})));
p.flush();

p.title('after');
displayState();
