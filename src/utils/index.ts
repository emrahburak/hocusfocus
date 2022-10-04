const sound = require("sound-play");

const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require("child_process").spawn;

// utils

//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };

// composeItems
export const pipe: Function =
  (...fns) =>
  (x) =>
    fns.reduce((y, fn) => fn(y), x);

// test function

interface ITrace {
  (label: any);
}

export const trace: Function = (label) => (value) => {
  console.log(`${{...value}}`)
  return {...value}

};

const dataProvider: Function = (data: any, name: string) => (value) => {
  value[name] = data;
  return { ...value };
};

const isNothing = (value: any) => {
  if(value !== null || value != undefined) {
    return value
  }
  return null;
}


interface IValidator {
  (value: any, name: string): object;
}

export const flagPathValidator = (obj) => {
  let path = obj.path ? obj.path : null
  return dataProvider(path,'path');
};

export const flagDurationValidator = (obj) => {
    let duration = obj.duration ? obj.duration :null
    return dataProvider(duration,'duration')
};

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
