import {CTC, printAll} from '../../utils/console.js'
import {formatter as fer} from '../../utils/formatter.js'
import {printer} from '../../utils/monolog.js'
import {objShallowCopyAndChild, ySymProp} from './_examples.js'

const CloneCopyMethods = {
    byDescriptorsValuesRecursive: "byDescriptorsValuesRecursive",
    byDescriptorsValuesAndPrototypeRecursive: "byDescriptorsValuesAndPrototypeRecursive",

    // clones Getters and Setters logic
    // values: object <-- same refs
    byDescriptors: "byDescriptors",
    byDescriptorsPrototypeRecursive: "byDescriptorsPrototypeRecursive",

    // converts Getters and Setters to properties with current state value
    // values: object <-- clones recursively
    byAllKeys: "byAllKeys",
    byAllKeysPrototypeRecursive: "byAllKeysPrototypeRecursive",
};

const _clone = (variable, method = CloneCopyMethods.byDescriptorsValuesRecursive) => {
    const isNotObject = (v) => typeof v !== "object" || v === null;
    const isDataDtor = (dtorObj) => dtorObj.writable !== undefined;
    const getParentRef = (obj) => Object.getPrototypeOf(obj);
    const getDtors = (obj) => Object.getOwnPropertyDescriptors(obj);
    const createObjNew = (parentRef) => Object.create(parentRef ?? null);
    const setPropsByDtors = (targetObj, objDtors) => Object.defineProperties(targetObj, objDtors);
    const makeDtorsWithClonedValues = (objDtors) => {
        Reflect.ownKeys(objDtors).forEach(key => Object.assign(objDtors[key],
            isDataDtor(objDtors[key]) ? {value: _clone(objDtors[key].value, method)} : null))

        return objDtors;
    };

    if (isNotObject(variable)) {
        return variable;
    }

    switch (method) {
        // by descriptors + recursion(values) and recursion(prototypes)
        case CloneCopyMethods.byDescriptorsValuesRecursive:
            return setPropsByDtors(
                createObjNew(getParentRef(variable)),
                makeDtorsWithClonedValues(getDtors(variable)),
            );
        case CloneCopyMethods.byDescriptorsValuesAndPrototypeRecursive:
            return setPropsByDtors(
                createObjNew(
                    _clone(getParentRef(variable), method)
                ),
                makeDtorsWithClonedValues(getDtors(variable)),
            );
        // by descriptors without values recursion (object refs copies)
        case CloneCopyMethods.byDescriptors:
            return setPropsByDtors(
                createObjNew(getParentRef(variable)),
                getDtors(variable),
            );
        case CloneCopyMethods.byDescriptorsPrototypeRecursive:
            return setPropsByDtors(
                createObjNew(
                    _clone(getParentRef(variable), method)
                ),
                getDtors(variable),
            );
        // by keys  = getters and setters are replacing with data properties (equal "values instead of formulas")
        case CloneCopyMethods.byAllKeys:
            return Object.setPrototypeOf(
                Object.fromEntries(
                    Reflect.ownKeys(variable).map(key =>
                        [key, _clone(variable[key], method)])
                ),
                getParentRef(variable)
            );
        case CloneCopyMethods.byAllKeysPrototypeRecursive:
            return Object.setPrototypeOf(
                Object.fromEntries(
                    Reflect.ownKeys(variable).map(key =>
                        [key, _clone(variable[key], method)])
                ),
                _clone(getParentRef(variable), method)
            );
    }

    throw new Error("Reached unreachable corner of code");
};

// noinspection JSUnresolvedReference - analogue of __name__ == "__main__"
const isMainModule = import.meta.main;

if (isMainModule) {
    const clr = new Proxy(CTC ?? {}, {get: (t, p) => t?.[p] || ""});
    const p = new Proxy(printer ?? {}, {get: (t, f) => t?.[f] || console.log});

    const getParent = (parentObj) => Object.getPrototypeOf(parentObj);
    const clonedByDtorsClonedValuesChild = _clone(objShallowCopyAndChild, CloneCopyMethods.byDescriptorsValuesAndPrototypeRecursive);
    const clonedByDtorsChild = _clone(objShallowCopyAndChild, CloneCopyMethods.byDescriptorsPrototypeRecursive);
    const clonedByKeysChild = _clone(objShallowCopyAndChild, CloneCopyMethods.byAllKeysPrototypeRecursive);

    printAll(clonedByDtorsClonedValuesChild, `${clr.var}clonedByDtorsClonedValuesChild${clr.reset}`);
    printAll(clonedByDtorsChild, `${clr.var}clonedByDtorsChild${clr.reset}`);
    printAll(clonedByKeysChild, `${clr.var}clonedByKeysChild${clr.reset}`);

    p.title("Cloning results: clonedByDtorsClonedValuesChild, clonedByDtorsChild, clonedByKeysChild")

    p.buff(`👍  [Getter/Setter] - ${clr.var}clonedByDtorsClonedValuesChild${clr.reset}`, clr.nsep, clonedByDtorsClonedValuesChild);
    p.buff(`👍  [Getter/Setter] - ${clr.var}clonedByDtorsChild${clr.reset}`, clr.nsep, clonedByDtorsChild);
    p.buff(`❌  [Getter/Setter] - ${clr.var}clonedByKeysChild${clr.reset}`, clr.nsep, clonedByKeysChild);
    p.flush();


    p.title("Cloning results: clonedByDtorsClonedValuesChild, clonedByDtorsChild, clonedByKeysChild")
    p.buff(`fer.anyToString(01👍, 02, 03❌ ) === fer.anyToString(02👍, 03❌ , 01)`, clr.sep,
        fer.anyToString(clonedByDtorsClonedValuesChild) === fer.anyToString(clonedByDtorsChild),
        fer.anyToString(clonedByDtorsChild) === fer.anyToString(clonedByKeysChild),
        fer.anyToString(clonedByKeysChild) === fer.anyToString(clonedByDtorsClonedValuesChild),
    );
    p.flush();

    p.head("ref to obj tests")

    const setRefValue = (targetObj, strValue) => targetObj["0"]["ref"] = strValue;
    const setParentRefValue = (targetObj, strValue) => Object.getPrototypeOf(targetObj)["0"]["ref"] = strValue;

    setRefValue(clonedByDtorsClonedValuesChild, "01 clonedByDtorsClonedValuesChild");
    setParentRefValue(clonedByDtorsClonedValuesChild, "PARENT: 01 clonedByDtorsClonedValuesChild");
    setRefValue(clonedByDtorsChild, "02 clonedByDtorsChild");
    setParentRefValue(clonedByDtorsChild, "PARENT: 02 clonedByDtorsChild");
    setRefValue(clonedByKeysChild, "03 clonedByKeysChild");
    setParentRefValue(clonedByKeysChild, "PARENT: 03 clonedByKeysChild");

    p.buff(`👍  [Getter/Setter] - ${clr.var}clonedByDtorsClonedValuesChild${clr.reset}`, clr.nsep, clonedByDtorsClonedValuesChild);
    p.buff(`👍  [Getter/Setter] - ${clr.var}clonedByDtorsChild${clr.reset}`, clr.nsep, clonedByDtorsChild);
    p.buff(`❌  [Getter/Setter] - ${clr.var}clonedByKeysChild${clr.reset}`, clr.nsep, clonedByKeysChild);
    p.flush();


    p.head("other tests")

    p.buff(`clonedByDtorsClonedValuesChild.z(clonedByDtorsChild[ySymProp])`, clr.sep,
        clonedByDtorsClonedValuesChild.z(clonedByDtorsChild[ySymProp]),
        clonedByDtorsChild.z(clonedByKeysChild[ySymProp]),
        clonedByKeysChild.z(clonedByDtorsClonedValuesChild[ySymProp])
    );

    p.buff(`getParent(01, 02, 03) === getParent(02, 03, 01)`, clr.sep,
        getParent(clonedByDtorsClonedValuesChild) === getParent(clonedByDtorsChild),
        getParent(clonedByDtorsChild) === getParent(clonedByKeysChild),
        getParent(clonedByKeysChild) === getParent(clonedByDtorsClonedValuesChild),
    );
    p.buff(`getParent(getParent(01, 02, 03)) === getParent(getParent(01, 02, 03))`, clr.sep,
        getParent(getParent(clonedByDtorsClonedValuesChild)),
        getParent(getParent(clonedByDtorsClonedValuesChild)) === getParent(getParent(clonedByDtorsChild)),
        getParent(getParent(clonedByDtorsChild)) === getParent(getParent(clonedByKeysChild)),
        getParent(getParent(clonedByKeysChild)) === getParent(getParent(clonedByDtorsClonedValuesChild)),
    );
    p.flush();
}

export {_clone, CloneCopyMethods};
