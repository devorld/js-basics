const do_mix_in = (target, source) => Object.assign(target, source);

// initial data
class ObjectVerbose extends Object {
    print() {
        return this.toString();
    }
}

const donor = { print() {console.log(this.toString())} };

// mix into - instance
const obj = new ObjectVerbose();

obj.print();


do_mix_in(obj, donor);

printHeader("obj");

obj.print();

// mix into - class
do_mix_in(ObjectVerbose, donor);

const childClass = new ObjectVerbose();

printHeader("childClass");

childClass.print();

// mix into - class prototype
do_mix_in(ObjectVerbose.prototype, donor);

const childProto = new ObjectVerbose();

printHeader("childProto");

childProto.print();

// other
function printHeader(text) {console.log(`\n___ ${text} >`)}
