import "reflect-metadata";
import { Server } from "./server";
import { AuthMiddleware } from "./middlewares/auth";
import { RegisterController } from "./controllers/register/RegisterController";

function main() {
  try {
    Server.start({
      port: 3000,
      middlewares: [AuthMiddleware],
      controllers: [RegisterController],
    });
  } catch (e) {
    console.error(e);
  }
}

main();
