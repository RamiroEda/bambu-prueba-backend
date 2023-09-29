import express from "express";
import { container, injectable } from "tsyringe";
import { IMiddleware } from "./models/middleware";
import { IController } from "./models/controller";

interface ServerOptions {
  port?: number;
  middlewares?: { new (...args: any): IMiddleware }[];
  controllers?: { new (...args: any): IController }[];
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
        server.app.use(container.resolve(middleware).handle);
      });
    }

    if (options.controllers) {
      console.log("Loading controllers...");
      const instances = options.controllers.map((it) => container.resolve(it));

      console.table(
        instances.reduce((acc, m, index) => {
          acc[options.controllers?.[index].name ?? ""] = m.toString();
          return acc;
        }, {} as any)
      );

      instances.forEach((controller) => {
        controller.registerIn(server.app);
      });
    }

    server.app.listen(options.port ?? 3000);
    return server;
  }
}
