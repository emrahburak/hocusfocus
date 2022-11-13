import { errors } from "../constants";
import * as FU from '../f-utils';

const path = require("path");
const os = require("os");
const fs = require("fs");

export const IsPath = (obj) => {
  let file = path.resolve(obj.path);
};

interface IValidator {
  (obj: any): object;
}

export const isPath: IValidator = (obj) => {
  let path = obj.path ? obj.path : undefined;
  return { ...obj, path };
};

export const isDuration: IValidator = (obj) => {
  let duration = obj.duration ? obj.duration : undefined;
  return { ...obj, duration };
};


export const isRealFilePath = (obj) => {
  let myFile: string = path.resolve(String(obj["path"]));
  var stats: boolean = fs.statSync(myFile).isFile();

  if (!stats) {
    return { ...obj, error: errors.OPENFILE };
  }
  return obj;
};

export const getPlatform: Function = () => {
  return os.platform;
};
