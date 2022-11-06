
// function provider
const queue: any[] = [];

interface ILoadable {
  (fn: Function, arg: String): number;
}
// load function to function provider
export const payload: ILoadable = (fn: Function, arg: String): number => {
  return queue.push([fn, arg]);
};

// dump and run  functions  from function provider
export const dump: Function = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};
