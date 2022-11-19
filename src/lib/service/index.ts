import * as FU from "../f-utils";
import * as Cons from "../constants";
import * as Event from "../event";
import * as FQ from "../f-queue";
import * as Valid from "../validation";

import * as Counter from "../counter";

const Print = require("one-line-print");

export function withArguments(opt) {
  return FU.Maybe["of"](opt).map(Valid.isPath).map(Valid.isDuration).join();
}

export function afterArguments(obj) {
  return FU.Maybe["of"](obj)
    .map(Valid.pathResolver)
    .map(Valid.afterPathResolver)
    .map(Valid.addOsPlatform)
    .join();
}

export const compose = (obj: object) => {
  return FU.pipe(obj, withArguments, afterArguments);
};



// action run
export const run = (obj) => {
  return new Promise((resolve, reject) => {
    // check path & file
    let status = false;
    function isPause(){
      return status = !status
    }
    let result = compose(obj);

    if (!result["errors"]) {
      Print.newLine("Pomodoro");

      //before countdown result payload
      // load(testCallback, "testCallback");
      FQ.loadQueue(resolve, result["path"]);

      Event.consumer(Cons.commands.EMIT_COUNTER, isPause);

      if (!status) {
        // start countdown
        Counter.countDown(result["duration"], FQ.dumpQueue);
      }
    } else {
      let error = new Error(result["errors"][0]);
      reject(result);
    }
  });
};
