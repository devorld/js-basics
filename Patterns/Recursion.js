// ~ 10 290 iterations
const recFunc = (iteration) => {
    console.clear();
    console.log(iteration);
    recFunc(iteration + 1);
}

recFunc(1);
