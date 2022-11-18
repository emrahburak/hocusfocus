import { payload } from './../f-queue/index';
import { errors } from "../constants";

import * as Cons from "../constants";

const path = require("path");
const os = require("os");
const fs = require("fs");

// export const IsPath = (obj) => {
//   let file = path.resolve(obj.path);
// };

interface IValidator {
  (obj: any): object;
}

// Arguments Null Check
export const isPath: IValidator = (obj) => {
  let path = obj.path ? obj.path : -1;
  return { ...obj, path };
};

const isAlpaNum = str => str.match(/^[0-9]+[a-z]$/);
const isNum = str => str.match(/^[0-9]+$/);

export const isDuration: IValidator = (obj) => {
  let duration = obj.duration ? obj.duration : -1;
  return { ...obj, duration };
};

// File path Check
export const pathResolver = (obj) => {
  let result = path.resolve(String(obj["path"]));
  return { ...obj, path: result };
};

export const afterPathResolver = (obj) => {
  try {
    let error = fs.statSync(obj["path"]).isFile() ? Cons.errors.OPENFILE : -1;
  } catch (e) {
    return { ...obj, ERRORS: [e.message] };
  }
  return { ...obj };
};




// Os Check
const getPlatform:Function = () => {
  return os.platform() ? os.platform() : -1;
}

export const addOsPlatform: Function = (obj) => {
  return {...obj,platform:getPlatform()}
};
