self.onmessage = (e) => {
  const { file, quantity } = e.data;

  let satrtIndex = 1;
  let blockSize = file.size / quantity;
  let statr = 0;
  let end = blockSize;

  while (satrtIndex <= quantity) {
    end = statr + blockSize;
    const block = file.slice(statr, end, file.type);
    statr = end;
    satrtIndex++;
    postMessage({
      block,
      index: satrtIndex - 1,
    });
  }
};

export {};
