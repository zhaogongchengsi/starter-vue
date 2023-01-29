import FileWorker from "./fileSplit?worker";

export interface FileOptions {
  onChanged?: (index: number) => void;
  quantity: number;
}

export function fileSplit(file: File, { quantity, onChanged }: FileOptions) {
  const fileSplitWorker: Worker = new FileWorker();
  const fileArr: File[] = [];

  return new Promise((res, rej) => {
    fileSplitWorker.onmessage = (e: any) => {
      const { block, index } = e.data;
      fileArr.push(block);
      onChanged && onChanged(index);
      if (index === quantity) {
        res(fileArr);
      }
    };
    fileSplitWorker.postMessage({
      quantity,
      file,
    });
  });
}
