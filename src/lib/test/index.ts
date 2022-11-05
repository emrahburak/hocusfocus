interface ITrace {
  (label: any):any;
}

export const trace: ITrace = (label) => (value) => {
  console.log(
    `${label}: ${{...value}}`
  );
  return {...value};
};

