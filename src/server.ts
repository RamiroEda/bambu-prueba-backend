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

    server.app.use(express.json());
    server.app.use(express.urlencoded({ extended: true }));

    if (options.middlewares) {
      console.log("Loading middlewares...");
      console.table(options.middlewares.map((m) => m.name));

      options.middlewares.forEach((middleware) => {
        server.app.use(new middleware().handle);
      });
    }

    if (options.controllers) {
      console.log("Loading controllers...");
      console.table(
        options.controllers.reduce((acc, m) => {
          const instance = new m();
          acc[m.name] = instance.toString();
          return acc;
        }, {} as any)
      );

      options.controllers.forEach((controller) => {
        const instance = new controller();
        instance.registerIn(server.app);
      });
    }

    server.app.listen(options.port ?? 3000);
    return server;
  }
}
