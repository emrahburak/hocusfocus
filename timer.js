// const co = require('co');

const iteration  =  (iteretor,val) => {
    return iteretor(val).next().value;
}

const toTime = function*(secs) {
        yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};


const boolean = function(){
    return true
}




let counter = function(n,callback){
    let timer =  setInterval(()=>{
        let getTime = iteration(toTime,n)
        // let getTime = toTime(n).next().value;
        console.log(getTime);
        n = n - 1;
        if(n <= 0)
            clearInterval(timer)
            callback(true);
    },1000);
};


var flag = true;

const step1 = (n) => setInterval(()=>{
    let getTime = iteration(toTime,n)
    console.log(getTime);
    n = n - 1;
},1000)

step1(5);

const run = () => {
    return new Promise((resolve,reject) => {
        let result = counter(5,boolean)
        if(result){
            resolve(result);
        }else{
            reject("Some thing went wrong");
        }
    });
};

// run().then(res => console.log(res)).catch(err => console.log(err));

// counter(5,boolean);;
