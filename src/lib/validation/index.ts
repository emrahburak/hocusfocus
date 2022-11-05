
const path = require("path");


export const IsPath = (obj) => {let file = path.resolve(obj.path); }



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
