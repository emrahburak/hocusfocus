export const initialState = {
  DURATION: 1500,
  PATH: "./audio/beep.wav",
};

export const testState = {
  DURATION: 1500,
  PATH: "",
  ERRORS: null
};

export const errors = {
    OPENFILE: "Cant open file. Path is not corret"
}

// export const soundMetaData = {
//   VIN32:"[console]::beep(800,400);[console]::beep(800,400);[console]::beep(800,1000);",
//   DARVIN:"",
//   LINUX: "",
//   UNIX:""
// }

export const commands = {
  EMIT_COUNTER:"EMIT_COUNTER"
}