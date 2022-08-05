const Print = require("one-line-print");

const convert = (secs) => {
  const sign = secs < 0;
  const hhmmss = new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
  return sign ? "-" + hhmmss : hhmmss;
};

const setLogger = (d) => {
  let n = d;

  Print.newLine("testing");
  let counter = setInterval(() => {

    Print.line(convert(n));

    n = n - 1;

    if(n < 0){

        console.log('Done')
        setTimeout(()=> clearInterval(counter),1000)
    }


  }, 1000);
};

const converter = (num) => {
  var hours = Math.floor(num / (60 * 60));
  var minutes = Math.floor(num / 60);
  var seconds = num % 60;
  var result = hours + ":" + minutes + ":" + seconds;

  console.log(result);
};

// converter(3700);

setLogger(5);

// console.log(convert(3700));
