import * as Cons from "../constants";
import * as FU from '../f-utils'

const path = require("path");
const os = require("os");
const fs = require("fs");

interface IValidator {
  (obj: any): object;
}

// Arguments Null Check
export const isPath: IValidator = (obj) => {
  let path = obj.path ? obj.path : -1;
  return { ...obj, path };
};

// Regex
const isAlpaNum = (str) => str.match(/^[0-9]+[a-z]$/) && true;
const isNum = (str) => str.match(/^[0-9]+$/) && true;

// Converters
const convertMinuteToSecond = (val) => {
  return parseInt(val) * 60
};

const splitterM = val => {
  return val.split("m")[0]
}


// Parameters control
export const isDuration: IValidator = (obj) => {
  let duration = obj.duration ? String(obj.duration) : -1;
  return { ...obj, duration };
};

export const durationParserMinute = (obj) => {
  let duration = isAlpaNum(obj.duration)
    ? FU.pipe(obj.duration,splitterM,convertMinuteToSecond)
    : obj.duration;
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
    return { ...obj, errors: [e.message] };
  }
  return { ...obj };
};

export const orDefaultPath = (obj) => {
  if (!obj["errors"]) return { ...obj };
  return pathResolver({ ...obj, path: Cons.initialState.PATH });
};

// Os Check
// const getPlatform:Function = () => {
//   return os.platform() ? os.platform() : -1;
// }

// export const addOsPlatform: Function = (obj) => {
//   return {...obj,platform:getPlatform()}
// };
