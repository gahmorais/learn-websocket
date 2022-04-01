import { io } from "socket.io-client";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
const socket = io("http://localhost:3000", {
  autoConnect: true,
});

const currentDir = dirname(fileURLToPath(import.meta.url));

socket.on("connect", () => {
  let images = 0;
  socket.emit("image").on("images", (listener) => {
    const imageStream = join(currentDir, `./public/${images}.jpg`);
    writeFileSync(imageStream, listener);
    images++;
  });
});
