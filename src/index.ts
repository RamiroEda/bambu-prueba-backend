import "reflect-metadata";
import { Server } from "./server";
import { AuthMiddleware } from "./middlewares/auth";
import { RegisterController } from "./controllers/register/RegisterController";
import { ValidationController } from "./controllers/validation/ValidationController";
import { UserController } from "./controllers/user/UserController";
import { PORT } from "./constants";

function main() {
  try {
    Server.start({
      port: PORT,
      middlewares: [],
      controllers: [RegisterController, ValidationController, UserController],
    });
  } catch (e) {
    console.error(e);
  }
}

main();
