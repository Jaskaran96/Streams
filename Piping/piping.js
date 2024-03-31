const fs = require("node:fs/promises");
const SOURCE_FILE_PATH = "../source.txt";
const DEST_FILE_PATH = "../destination.txt";

(async () => {
  console.time("piping");
  const fileReadDescriptor = await fs.open(SOURCE_FILE_PATH, "r");
  const fileWriteDescriptor = await fs.open(DEST_FILE_PATH, "w");

  const readStream = fileReadDescriptor.createReadStream();
  const writeSteam = fileWriteDescriptor.createWriteStream();

  //the destination of the pipe has to be a write stream
  //The readable.pipe() method attaches a Writable stream to the readable, causing it to switch automatically into flowing mode and push all of its data to the attached Writable. The flow of data will be automatically managed so that the destination Writable stream is not overwhelmed by a faster Readable stream.

  readStream.pipe(writeSteam);
  readStream.on("end", () => {
    console.timeEnd("piping");
    console.log("this was the end");
  });
})();
