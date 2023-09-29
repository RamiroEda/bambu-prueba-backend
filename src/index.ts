import "reflect-metadata";
import { Server } from "./server";

function main() {
  try {
    Server.start();
  } catch (e) {
    console.error(e);
  }
}

main();
