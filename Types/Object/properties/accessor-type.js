import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})


const obj1Verbose = {
    _value: 0,
    set value(value) {
        p.buff(`WRITE: from (${this._value}) - to (${value})`);
        p.flush({keepMaxLengths: true});
        this._value = value;
    },
    get value() {
        p.buff(`READ: (${this._value})`);
        p.flush({keepMaxLengths: true});
        return this._value;
    },
};


p.head(`getter and setter`);
p.buff(`obj1Verbose${clr.func}.value${clr.reset}`, clr.sep, obj1Verbose.value);
p.buff(`obj1Verbose${clr.func}.value =${clr.reset} 111`, clr.sep, obj1Verbose.value = 111);
p.buff(`obj1Verbose${clr.func}.value${clr.reset}`, clr.sep, obj1Verbose.value);
p.flush();
