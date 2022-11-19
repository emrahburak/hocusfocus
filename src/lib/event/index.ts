const events = require("events");

var eventEmmitter = new events.EventEmitter();

eventEmmitter.setMaxListeners(0);

export const listener_test = function() {
  console.log("listener executed");
}

export function publisher(message:string){
  return eventEmmitter.emit(message);
}

export function consumer(message:string,callback) {
    return eventEmmitter.addListener(message,callback)
}