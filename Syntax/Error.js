process.on("uncaughtException", (...args) => console.error("> NodeJS > :", ...args));

// full example

function generateAndProcessError() {
    try {
        console.debug("some code");

        return 1;

        // noinspection ExceptionCaughtLocallyJS
        throw 37331;

        /*
        throw {
            name: "CustomError",
            message: "Some description about threw error",
            stack: "callstack",
        }
        */

        // never reached
        return 2;

    } catch (error) {

        console.error(`error info: ${error} <${typeof error}>`);

        return 20;

    } finally {
        console.log("end up");

        return 30;
    }
}

console.log(generateAndProcessError());

console.table([]);

// finally example

function beSureInFinallyExecution() {
    try {
        console.debug("some code");

        throw {
            name: "CustomError",
            message: "Some description about threw error",
            stack: "callstack",
        }

    } finally {
        console.log("ALWAYS clean up");
    }
}

try {
    beSureInFinallyExecution();
} catch (e) {
    console.error("e:", e);
    throw e;
}

console.table([]);
