"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSound = void 0;
const sound = require("sound-play");
const fs = require("fs");
const path = require("path");
const os = require("os");
const spawn = require("child_process").spawn;
// gelen data yüklü ise öntanımlı platform sesi çal
// değilse yükte belirtilmiş dosya yolundaki müziği çel
const withSound = (cmd) => spawn(cmd);
exports.withSound = withSound;
