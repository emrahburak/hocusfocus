const sound = require("sound-play");

const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require("child_process").spawn;

// utils

//   VALIDATION

interface Reducer {
  (obj:object,...fns:Function[]):object
}

export const pipe:Reducer = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);


interface ITrace {
  (label: any):any;
}

export const trace: ITrace = (label) => (value) => {
  console.log(
    `${label}: ${{...value}}`
  );
  return {...value};
};


interface IValidator {
  (obj: any): object;
}

export const optionValidatorPath: IValidator = (obj) => {
  let path = obj.path ? obj.path : null;
  return { ...obj, path };
};

export const optionValidatorDuration: IValidator = (obj) => {
  let duration = obj.duration ? obj.duration : null;
  return { ...obj, duration };
};


export const IsPath = (obj) => {let file = path.resolve(obj.path); }





// BUSINESS

// function type
interface IGenerator {
  (secs: any): IterableIterator<string>;
}
// convert seconds to time format
export const toTime: IGenerator = function* (
  secs: any
): IterableIterator<string> {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

//only generator functions
export const iteration = (iteretor: IGenerator, val: any) => {
  return iteretor(val).next().value;
};

// function provider
const queue: any[] = [];

interface ILoadable {
  (fn: Function, arg: String): number;
}
// load function to function provider
export const load: ILoadable = (fn: Function, arg: String): number => {
  return queue.push([fn, arg]);
};

// dump and run  functions  from function provider
export const dump: Function = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};
