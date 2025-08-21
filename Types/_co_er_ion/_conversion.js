// conversion - changing data type
// hints: string, number, default

// == - default
// >, < - number

// Date - number
// Objects - default

console.log('priority 1 █►', Symbol.toPrimitive, '(string | number | default)');
console.log('priority 2 && string █►', Symbol.toString, Symbol.valueOf)
console.log('priority 3 && (number || default) █►', Symbol.valueOf, Symbol.toString)
