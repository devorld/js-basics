import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})


p.head("Promise")

const promise = new Promise(
    (
    resolveCb,
    rejectCb
    ) => Date.now() % 10 >= 5 ? resolveCb("LESS") : rejectCb("MORE")
);

promise
    .then(
        (value) => p.buff("resolve 1", clr.sep, value),
        (reason) => p.buff("reject 1", clr.sep, reason)
    )
    .catch(
        (reason) => p.buff("reject 2", clr.sep, reason)
    )
    .finally(
        () => p.buff("finally") ?? p.flush()
    );

p.flush();
