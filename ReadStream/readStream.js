const fs = require("node:fs/promises");
const SOURCE_FILE_PATH = "./source.txt";
const DEST_FILE_PATH = "./destination.txt";
(async () => {
  console.time("readStream");
  const fileReadDescriptor = await fs.open(SOURCE_FILE_PATH, "r");
  const fileWriteDescriptor = await fs.open(DEST_FILE_PATH, "w");
  let split = "";
  const streamRead = fileReadDescriptor.createReadStream();
  const streamWrite = fileWriteDescriptor.createWriteStream();

  // this event will be called when the stream is ready to read the file, and will be called for each chunk of size readableHighWaterMark
  streamRead.on("data", (chunk) => {
    const chunkArray = chunk.toString("utf-8").trim().split(" ");

    if (split) {
      chunkArray[0] = split + chunkArray[0];
      split = "";
    }

    if (
      Number(chunkArray[chunkArray.length - 1]) !==
      Number(chunkArray[chunkArray.length - 2]) + 1
    ) {
      split = chunkArray.pop();
    }

    const chunkConvertedEven = chunkArray.filter(
      (num) => Number(num) % 2 === 0
    );

    streamWrite.write(chunkConvertedEven.join(" ") + " ");
  });

  // this event will be called when the stream is done reading the file
  streamRead.on("end", () => console.timeEnd("readStream"));

  // console.log(stream.readableHighWaterMark);
  // console.log(stream.readableLength);
})();
