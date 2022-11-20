"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.compose = exports.afterArguments = exports.withArguments = void 0;
const FU = __importStar(require("../f-utils"));
const FQ = __importStar(require("../f-queue"));
const Valid = __importStar(require("../validation"));
const Counter = __importStar(require("../counter"));
const Print = require("one-line-print");
function withArguments(opt) {
    return FU.Maybe["of"](opt).map(Valid.isPath).map(Valid.isDuration).join();
}
exports.withArguments = withArguments;
function afterArguments(obj) {
    return FU.Maybe["of"](obj)
        .map(Valid.pathResolver)
        .map(Valid.afterPathResolver)
        .map(Valid.orDefaultPath)
        .join();
}
exports.afterArguments = afterArguments;
const compose = (obj) => {
    return FU.pipe(obj, withArguments, afterArguments);
};
exports.compose = compose;
// action run
const run = (obj) => {
    return new Promise((resolve) => {
        // check path & file
        let result = (0, exports.compose)(obj);
        Print.newLine("Pomodoro");
        //   // before countdown result payload
        FQ.loadQueue(resolve, result["path"]);
        //   // start countdown
        Counter.countDown(result["duration"], FQ.dumpQueue);
    });
};
exports.run = run;
