import { createServer } from "http";
import { Server } from "socket.io";
import { dirname, join } from "path";
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
const httpServer = createServer();
const socket = new Server(httpServer);

const currentDir = dirname(fileURLToPath(import.meta.url));
socket.on("connect", (client) => {
  console.log(`client ${client.id} conectado`);
  client.on("image", sendImages);
  client.on("disconnect", onDisconnected);
});

function onDisconnected(reason) {
  console.log("desconectando " + reason);
}

function createFileStream(dir) {
  return readFileSync(dir);
}

function sendImages(_, send) {
  const filesImages = readdirSync(join(currentDir, "./assets"));
  const imagesStream = filesImages.map((image) => {
    const images = join(currentDir, `./assets/${image}`);
    return createFileStream(images);
  });
  console.log("enviando imagens");
  send({ size: imagesStream.length, images: imagesStream });
}

httpServer.listen(3000, () => {
  console.log("Server online!");
});
