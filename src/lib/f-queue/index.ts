
// function provider
const queue: any[] = [];

interface ILoadable {
  (fn: Function, arg: String): number;
}
// load function to function provider
export const loadQueue: ILoadable = (fn: Function, arg: String): number => {
  return queue.push([fn, arg]);
};

// dump and run  functions  from function provider
export const dumpQueue: Function = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};
