
const FU = require('../f-utils')


const isBlock = (input) => {
    input.includes('block') && console.log(input," with blok work");
    return input;
}

const isRoutine = (input) => {
    input.includes('routine') && console.log(input," with routine work")
    return input
}

const isSet = (input) => {
    input.includes('set') 
    && FU.Maybe.of(input)
        .map(isBlock)
        .map(isRoutine)
        .join();
}
const inputMaybe = (input) => {
    return FU.Maybe.of(input)
        .map(isSet)
        .join();
}


module.exports = {
    inputMaybe,
}