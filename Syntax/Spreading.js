import {rangeObj} from '../Types/Object/iterate.js'
import {CTC} from '../utils/console.js'
import {printer} from '../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})

function spread(iterable) {
    const result = [];

    for (let el of iterable) {
        result.push(el);
    }

    return result;
}

function getArgs() {
    return arguments;
}


p.head(`${clr.func}...${clr.reset}iterableObj`);

p.title("string");

const str = "Lorem ipsum";
p.buff(`showArgs(${clr.func}spread(${clr.var}"Lorem ipsum"${clr.reset}))`, clr.sep, getArgs(spread(str)));
p.buff();
p.buff(`showArgs(${clr.func}...${clr.var}"Lorem ipsum"${clr.reset})`, clr.sep, getArgs(...str));
p.flush();

p.title("iterable Object");

p.buff(`showArgs(${clr.func}spread(${clr.var}rangeObj${clr.reset}))`, clr.sep, getArgs(spread(rangeObj)));
p.buff();
p.buff(`showArgs(${clr.func}...${clr.var}rangeObj${clr.reset})`, clr.sep, getArgs(...rangeObj));
p.flush();
