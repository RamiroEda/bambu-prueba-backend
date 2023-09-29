import express from "express";
import { injectable } from "tsyringe";
import { IMiddleware } from "./models/middleware";
import { IController } from "./models/controller";

interface ServerOptions {
  port?: number;
  middlewares?: { new (): IMiddleware }[];
  controllers?: { new (): IController }[];
}

@injectable()
export class Server {
  private app = express();

  static async start(options: ServerOptions = {}) {
    const server = new Server();
    server.app.listen(options.port ?? 3000);
    server.app.use(express.json());
    server.app.use(express.urlencoded({ extended: true }));

    if (options.middlewares) {
      options.middlewares.forEach((middleware) => {
        server.app.use(new middleware().handle);
      });
    }

    if (options.controllers) {
      options.controllers.forEach((controller) => {
        const instance = new controller();
        instance.registerIn(server.app);
      });
    }

    return server;
  }
}
