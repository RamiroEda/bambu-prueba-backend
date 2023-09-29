import { NextFunction, Request, Response, Express } from "express";

interface Handler {
  path: string;
  router: any;
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
}
