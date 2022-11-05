
export var Maybe = function(val:any) {
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


// function getMyStatus(obj) {
//   return Maybe["of"](obj)
//     .getProp('path')
//     .map()

// }


