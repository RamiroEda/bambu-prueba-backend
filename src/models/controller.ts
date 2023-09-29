import { Request, Response, Express } from "express";

interface Handler {
  path: string;
  router: (req: Request, res: Response) => any;
}

export abstract class IController {
  private handlersRegistry: Handler[] = [];

  protected register(handler: Handler): void {
    this.handlersRegistry.push(handler);
  }

  registerIn(app: Express): void {
    this.handlersRegistry.forEach((handler) => {
      app.use(handler.path, handler.router);
    });
  }

  toString(): string {
    return this.handlersRegistry.map((h) => h.path).join("\n");
  }
}
