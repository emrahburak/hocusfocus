import { Maybe } from "./../f-utils/index";
import {soundMetaData} from '../constants'


const sound = require("sound-play");

const fs = require("fs");
const path = require("path");
const os = require("os");
const spawn = require("child_process").spawn;

// gelen data yüklü ise öntanımlı platform sesi çal
// değilse yükte belirtilmiş dosya yolundaki müziği çel


export const  withSound =  (cmd) => spawn(cmd);

