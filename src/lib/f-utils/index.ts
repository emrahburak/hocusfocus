
import * as Valid from '../validation';
const R = require('ramda');

const compose = R.compose;
const path = R.path;
const prop = R.prop;




interface Reducer {
  (obj:object,...fns:Function[]):object
}

export const pipe:Reducer = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);


var Maybe = function(val) {
  this.__value = val;
};


Maybe["of"] = function(val){
  return new  Maybe(val);
};


Maybe.prototype.isNothing = function(){
  return (this.__value === null || this.__value === undefined);
}


Maybe.prototype.map = function(fn){
  if(this.isNothing()){
    return Maybe["of"](null)
  }
  return Maybe["of"](fn(this.__value));
}

Maybe.prototype.join= function(){
    return this.__value;
}

Maybe.prototype.orElse = function(argv){
  if(this.isNothing()){
    return Maybe["of"](argv)
  }
  return this;
}




export function getOption(opt){
  return Maybe["of"](opt)
    .map(Valid.isPath)
    .map(Valid.isDuration)
    .join();
}





