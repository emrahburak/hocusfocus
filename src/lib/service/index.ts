import * as FU from "../f-utils";
import * as Cons from "../constants";
import * as Event from "../event";
import * as FQ from "../f-queue";
import * as Valid from "../validation";
import * as Play from "../sound";

import * as Counter from "../counter";

const Print = require("one-line-print");

export function withArguments(opt) {
  return FU.Maybe["of"](opt).map(Valid.isPath).map(Valid.isDuration).join();
}

export function afterArguments(obj) {
  return FU.Maybe["of"](obj)
    .map(Valid.durationParserMinute)
    .map(Valid.pathResolver)
    .map(Valid.afterPathResolver)
    .map(Valid.orDefaultPath)
    .join();
}

export const compose = (obj: object) => {
  return FU.pipe(obj, withArguments, afterArguments);
};

// action run
export const run = (obj) => {
  return new Promise((resolve) => {
    // check path & file
    let result = compose(obj);

    Print.newLine("Pomodoro");

    //   // before countdown result payload
    FQ.loadQueue(resolve, result["path"]);

    //   // start countdown
    Counter.countDown(result["duration"], FQ.dumpQueue);
  });
};
