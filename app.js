
const sound = require('sound-play');
const path = require('path')

const args = process.argv[process.argv.length -1]

const filePath = path.join(__dirname,`${args}`);

sound.play(filePath).then(res => console.log('DONE!'));


// console.log(process.argv[process.argv.length -1]);





