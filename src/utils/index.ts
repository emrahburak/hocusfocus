// utils

// function type
interface IGenerator {
  (secs: any): IterableIterator<string>;
}
// convert seconds to time format
export const toTime: IGenerator = function* (secs: any): IterableIterator<string> {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

//only generator functions
export const iteration = (iteretor: IGenerator, val: any) => {
  return iteretor(val).next().value;
};

//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };

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

