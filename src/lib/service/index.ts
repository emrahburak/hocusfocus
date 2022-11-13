import * as FU from "../f-utils";
import * as Cons from "../constants";
import * as FQ from "../f-queue";
import * as Valid from "../validation";
import * as Test from "../trace";

import * as Counter from "../counter";

const Print = require("one-line-print");

export function getArguments(opt) {
  return FU.Maybe["of"](opt)
    .map(Valid.isPath)
    .map(Valid.isDuration)
    .join();
}

export function getPayload(obj){
    return FU.Maybe["of"](obj["path"])
        .map(Valid.isRealFilePath)
    .join()
}


export const cap = (obj:object) => {
    return FU.pipe(
        obj,
        getArguments
    )
}


export const service = (payload: object) => {
  return new Promise((resolve, reject) => {
    payload ? resolve(payload) : reject(payload["ERRORS"])
  })};

    
interface IRunable {
  (file: string, time: number): PromiseLike<any>;
}

// action run
// const run: IRunable = (file: string, time_s: number) => {
//   return new Promise((resolve, reject) => {
//     // check path & file
//     let myFile: string = path.resolve(file);
//     var stats: boolean = fs.statSync(myFile).isFile();

//     if (stats) {
//       Print.newLine("Pomodoro");

//       //before countdown result payload
//       // load(testCallback, "testCallback");
//       FQ.payload(resolve, myFile);

//       // start countdown
//       Counter.counter(time_s, FQ.dump);
//     } else {
//       let result = new Error("Cant open file. Path is not corret");
//       reject(result);
//     }
//   });
// }
