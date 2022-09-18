// const co = require('co');

// utils
const iteration = (iteretor, val) => {
  return iteretor(val).next().value;
};

const toTime = function* (secs) {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

const testCallback = function (value) {
  console.log("this is", value);
};

const queue = [];

const load = (fn, arg) => {
  queue.push([fn, arg]);
};

const dump = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};

const counter = (n, callback) => {
  var timer = setInterval(function () {
    let getTime = iteration(toTime, n);
    // let getTime = toTime(n).next().value;
    console.log(getTime, n);
    n--;
    if (n < 0) {
      clearInterval(timer);
      callback();
    }
  }, 1000);
};

const run = () => {
  return new Promise((resolve, reject) => {
    load(testCallback, "callback");
    load(resolve, "myfile");
    if (true) {
      counter(5, dump);
    } else {
      reject("Some thing went wrong");
    }
  });
};

run()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// function rollDice(i, callback) {
//   var test = setInterval(function () {
//     let getTime = iteration(toTime, i);
//     console.log(getTime, i);
//     i--;
//     // var value = Math.floor((Math.random() * 6) + 1);
//     if (i < 1) {
//       clearInterval(test);
//       callback(i);
//     }
//   }, 1000);
// }

// counter(4, callable);
// var sayi = Math.floor(Math.random() * 25 + 5);
// rollDice(callable);

// var flag = true;

// const step1 = (n) => setInterval(()=>{
//     let getTime = iteration(toTime,n)
//     console.log(getTime);
//     n = n - 1;
// },1000)

// step1(5);

// counter(5,boolean);;
