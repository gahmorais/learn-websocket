import { createServer } from "http";
import { Server } from "socket.io";
import { dirname, join } from "path";
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
const httpServer = createServer();
const socket = new Server(httpServer);

const currentDir = dirname(fileURLToPath(import.meta.url));
socket.on("connection", (client) => {
  console.log("conectado");
  client.on("image", sendImages);
  client.on("disconnect", (reason) => {
    console.log("desconectando " + reason);
  });
});

function sendImages() {
  for (let i = 1; i < 4; i++) {
    console.log("enviando imagens");
    const image = join(currentDir, `./assets/${i}.jpg`);
    const imageStream = readFileSync(image);
    socket.emit("images", imageStream);
  }
}

httpServer.listen(3000);
