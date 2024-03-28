const fs = require("fs").promises;

// async function writeNumbersToFile(x, filePath) {
//   let fd;
//   try {
//     console.time("writeMany");
//     fd = await fs.open(filePath, "w");
//     const stream = fd.createWriteStream();
//     for (let i = 1; i <= x; i++) {
//       // await fs.writeFile(fd, `${i} `);
//       const buff = Buffer.from(`${i} `, "utf-8");
//       stream.write(buff);
//       // await fd.write(`${i} `);
//     }
//     console.timeEnd("writeMany");
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (fd !== undefined) await fd.close();
//   }
// }

async function writeNumbersToFile(x, filePath) {
  let fd;
  try {
    console.time("writeMany");
    fd = await fs.open(filePath, "w");
    const stream = fd.createWriteStream();
    console.log(stream.writableHighWaterMark);
    console.log(stream.writableLength);
    const buff = Buffer.alloc(4000);
    stream.write(Buffer.alloc(4000));
    console.log(stream.writableLength);
    stream.write(Buffer.alloc(4000));
    console.log(stream.writableLength);
    stream.write(Buffer.alloc(4000));
    console.log(stream.writableLength);
    stream.write(Buffer.alloc(4000));
    console.log(stream.writableLength);
    stream.write(Buffer.alloc(4000));
    console.log(stream.writableLength);

    // for (let i = 1; i <= x; i++) {
    //   // await fs.writeFile(fd, `${i} `);
    //   const buff = Buffer.from(`${i} `, "utf-8");
    //   console.log(`buff.length: ${buff.length}`);
    //   stream.write(buff);
    //   console.log(stream.writableLength);
    //   // await fd.write(`${i} `);
    // }
    console.timeEnd("writeMany");
  } catch (err) {
    console.error(err);
  } finally {
    if (fd !== undefined) await fd.close();
  }
}

// Usage

writeNumbersToFile(10000, "./text.txt");
