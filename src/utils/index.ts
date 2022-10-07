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


var Maybe = function(val:any) {
  this.__value = val;
};


Maybe["of"] = function(val:any){
  return new  Maybe(val);
};


const getProp = function(name:string){
  return name
}

Maybe.prototype.isNothing = function(fn){
  return (this.__value === null || fn(this.__value) === undefined);
}


Maybe.prototype.map = function(fn){
  if(this.isNothing(fn)){
    return Maybe["of"](null)
  }
  return Maybe["of"](fn(this.__value));
}

function getMyStatus(obj) {
  return Maybe["of"](obj)
    .getProp('path')
    .map()

}


