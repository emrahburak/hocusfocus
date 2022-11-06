
const path = require("path");


export const IsPath = (obj) => {let file = path.resolve(obj.path); }



interface IValidator {
  (obj: any): object;
}

export const isPath: IValidator = (obj) => {
  let path = obj.path ? obj.path : null;
  return { ...obj, path };
};

export const isDuration: IValidator = (obj) => {
  let duration = obj.duration ? obj.duration : null;
  return { ...obj, duration };
};
