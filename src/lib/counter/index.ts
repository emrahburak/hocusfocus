const Print = require("one-line-print");


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


// infinity counter
interface ICounter {
  (duration: number, callback: Function): any;
}

export const countDown: ICounter = function (
  n_duration: number,
  callback: Function
) {
  let countdownTimer: any = setInterval(() => {
    let getTime = iteration(toTime, n_duration);
    Print.line(`${getTime}`);
    n_duration--;
    if (n_duration < 0) {
      return [clearInterval(countdownTimer), callback()];
    }
  }, 1000);
};
