import { io } from "socket.io-client";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

const socket = io("http://localhost:3000", {
  autoConnect: true,
});

const currentDir = dirname(fileURLToPath(import.meta.url));

function receiveImages({ size, images }) {
  console.log('recebendo images')
  for (let i = 0; i < size; i++) {
    saveFile(images[i], `${i}.jpg`);
  }
}

function saveFile(file, filename) {
  const imageStream = join(currentDir, `./public/${filename}`);
  writeFileSync(imageStream, file);
}

socket.on("connect", () => {
  socket.emit("image", "", receiveImages);
});
