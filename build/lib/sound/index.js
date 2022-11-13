const sound = require("sound-play");
const fs = require("fs");
const os = require("os");
const spawn = require("child_process").spawn;
// gelen data yüklü ise öntanımlı platform sesi çal
// değilse yükte belirtilmiş dosya yolundaki müziği çel
