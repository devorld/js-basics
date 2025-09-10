import {CTC} from '../../../utils/console.js'
import {printer} from '../../../utils/monolog.js'

const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""})
const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log})
const ts2s = (ts) => (new Date(ts)).toLocaleString();
const ts2mss = (ts) => (new Date(ts)).toLocaleString('ru-RU', {
    localeMatcher: "lookup",
    weekday: "long",
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
    timeZoneName: "shortOffset",
    formatMatcher: "best fit",
    hour12: true,
    timeZone: undefined,
});


p.head(Date.name);

let dates = {};
p.buff(`Конструктор: ${clr.func}new Date()${clr.reset}`, '█►', ...[dates.object = new Date(), dates.object.constructor.name].reverse());
p.buff(`Функция: ${clr.func}Date()${clr.reset}`, '█►', ...[dates.string = Date(), typeof dates.string].reverse());
p.buff(`Date${clr.func}.now()${clr.reset} -> timestamp`, '█►', ...[dates.number = Date.now(), typeof dates.number].reverse());


// noinspection SpellCheckingInspection - not a type
p.head("INPUT YYYY-MM-DDTHH:mm:ss.sssZ");

// noinspection SpellCheckingInspection - not a type
p.buff(`Date${clr.func}.parse${clr.reset}(YYYY-MM-DDTHH:mm:ss.sssZ)`, '█►', ts2mss(Date.parse("2025-08-30T10:52:37.123Z")));
// noinspection SpellCheckingInspection - not a type
p.buff(`Date${clr.func}.parse${clr.reset}(YYYY-MM-DDTHH:mm:ss.sssZ)`, '█►', ts2mss(Date.parse("2025-08-30T10:52:37.123+04:51")));


p.head("PRINT");

p.buff(`new Date()${clr.func}.toISOString().split(/[TZ]/)[1]${clr.reset}`,
    ...[dates.dt = new Date().toISOString().split(/[TZ]/)[1],
        '█►',
        typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.toString${clr.reset}()`, ...[dates.dt = dates.object.toString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toUTCString${clr.reset}()`, ...[dates.dt = dates.object.toUTCString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toISOString${clr.reset}()`, ...[dates.dt = dates.object.toISOString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toDateString${clr.reset}()`, ...[dates.dt = dates.object.toDateString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toTimeString${clr.reset}()`, ...[dates.dt = dates.object.toTimeString(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.toLocaleString${clr.reset}()`, ...[dates.dt = dates.object.toLocaleString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toLocaleDateString${clr.reset}()`, ...[dates.dt = dates.object.toLocaleDateString(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.toLocaleTimeString${clr.reset}()`, ...[dates.dt = dates.object.toLocaleTimeString(), '█►', typeof dates.dt].reverse());


p.head("GET");

p.title("Date parts - время местное");

p.buff(`new Date()${clr.func}.getTimezoneOffset${clr.reset}()`, ...[dates.dt = dates.object.getTimezoneOffset(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getFullYear${clr.reset}()`, ...[dates.dt = dates.object.getFullYear(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getMonth${clr.reset}()`, ...[dates.dt = dates.object.getMonth(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getDate${clr.reset}()`, ...[dates.dt = dates.object.getDate(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getDay${clr.reset}()`, ...[dates.dt = dates.object.getDay(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getHours${clr.reset}()`, ...[dates.dt = dates.object.getHours(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getMinutes${clr.reset}()`, ...[dates.dt = dates.object.getMinutes(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getSeconds${clr.reset}()`, ...[dates.dt = dates.object.getSeconds(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getMilliseconds${clr.reset}()`, ...[dates.dt = dates.object.getMilliseconds(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getTime${clr.reset}() -> timestamp`, ...[dates.dt = dates.object.getTime(), '█►', typeof dates.dt].reverse());
p.buff(`${clr.func}+${clr.reset}new Date()          -> timestamp`, ...[dates.dt = +dates.object, '█►', typeof dates.dt].reverse());

p.title("Date parts - UTC")

p.buff(`new Date()${clr.func}.getUTCFullYear${clr.reset}()`, ...[dates.dt = dates.object.getUTCFullYear(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getUTCMonth${clr.reset}()`, ...[dates.dt = dates.object.getUTCMonth(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getUTCDate${clr.reset}()`, ...[dates.dt = dates.object.getUTCDate(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getUTCDay${clr.reset}()`, ...[dates.dt = dates.object.getUTCDay(), '█►', typeof dates.dt].reverse());
p.buff();
p.buff(`new Date()${clr.func}.getUTCHours${clr.reset}()`, ...[dates.dt = dates.object.getUTCHours(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getUTCMinutes${clr.reset}()`, ...[dates.dt = dates.object.getUTCMinutes(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getUTCSeconds${clr.reset}()`, ...[dates.dt = dates.object.getUTCSeconds(), '█►', typeof dates.dt].reverse());
p.buff(`new Date()${clr.func}.getUTCMilliseconds${clr.reset}()`, ...[dates.dt = dates.object.getUTCMilliseconds(), '█►', typeof dates.dt].reverse());


p.head("SET")

p.title("Date parts - время местное")

dates.ds1 = new Date();
let twelve = 12;
p.buff(`ds1${clr.func}.setTime${clr.reset}(UNIX-milliseconds: int)`, ...[dates.dt = dates.ds1.setTime(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setDate${clr.reset}(dateObj: Date)`, ...[dates.dt = dates.ds1.setDate(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff();
p.buff(`ds1${clr.func}.setMilliseconds${clr.reset}(ms: int)`, ...[dates.dt = dates.ds1.setMilliseconds(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setSeconds${clr.reset}(sec: int, [ms: int])`, ...[dates.dt = dates.ds1.setSeconds(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setMinutes${clr.reset}(min: int, [sec: int, ms: int])`, ...[dates.dt = dates.ds1.setMinutes(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setHours${clr.reset}(hour: int, [min: int, sec: int, ms: int])`, ...[dates.dt = dates.ds1.setHours(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff();
p.buff(`ds1${clr.func}.setMonth${clr.reset}(month: int, [day: int])`, ...[dates.dt = dates.ds1.setMonth(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setFullYear${clr.reset}(year: int, [month: int, day: int])`, ...[dates.dt = dates.ds1.setFullYear(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));

p.title("Date parts - UTC")

dates.ds1 = new Date();
p.buff(`ds1${clr.func}.setUTCDate${clr.reset}(dateObj: Date)`, ...[dates.dt = dates.ds1.setUTCDate(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff();
p.buff(`ds1${clr.func}.setUTCMilliseconds${clr.reset}(ms: int)`, ...[dates.dt = dates.ds1.setUTCMilliseconds(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setUTCSeconds${clr.reset}(sec: int, [ms: int])`, ...[dates.dt = dates.ds1.setUTCSeconds(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setUTCMinutes${clr.reset}(min: int, [sec: int, ms: int])`, ...[dates.dt = dates.ds1.setUTCMinutes(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setUTCHours${clr.reset}(hour: int, [min: int, sec: int, ms: int])`, ...[dates.dt = dates.ds1.setUTCHours(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff();
p.buff(`ds1${clr.func}.setUTCMonth${clr.reset}(month: int, [day: int])`, ...[dates.dt = dates.ds1.setUTCMonth(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.buff(`ds1${clr.func}.setUTCFullYear${clr.reset}(year: int, [month: int, day: int])`, ...[dates.dt = dates.ds1.setUTCFullYear(twelve), '█►', typeof dates.dt].reverse(), '█►', ts2s(dates.dt));
p.flush();
