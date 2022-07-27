
const sound = require('sound-play');
const commander = require('commander');

const path = require('path');
const fs = require('fs');


// basic plain
commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
//   .option('-f, --flag', 'Detects if the flag is present.')
  .option('-p, --path <value>', 'Overwriting value.', './audio/audio.mp3')
  .parse(process.argv);

const options = commander.opts();
const absoloutePath = path.resolve(options.path);


// chek some rules
const flag = (options.flag ? 'Flag is present.' : 'Flag is not present.');
var stats = fs.statSync(absoloutePath);


//

// console.log('Flag:', `${flag}`);
// console.log('Custom:', `${options.path}`);
// console.log(absoloutePath)
// console.log(args)
// console.log(argsAll)


// const filePath = path.join(__dirname,`${options.path}`);
stats.isFile() ? sound.play(absoloutePath).then(res => console.log('DONE!')) : console.log("opps")



// console.log(process.argv[process.argv.length -1]);





