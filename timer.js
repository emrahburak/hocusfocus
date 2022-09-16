// const co = require('co');



const toTime = function*(secs) {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

const iteration  =  (iteretor,val) => {
    return iteretor(val).next().value;
}


let counter = function*(n){
    let timer = yield setInterval(()=>{
        let getTime = iteration(toTime,n)
            

        // let getTime = toTime(n).next().value;
        console.log(getTime);
        n = n - 1;
        if(n < 0)
            clearInterval(timer)
    },1000);
};


counter(2500).next();