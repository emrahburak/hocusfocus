interface Reducer {
  (obj:object,...fns:Function[]):object
}

export const pipe:Reducer = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);
