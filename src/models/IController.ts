import { Request, Response, Express } from "express";
import { IMiddleware } from "./IMiddleware";
import { throwValidationError } from "./ValidationException";
import Joi from "joi";

interface Handler {
  path: string;
  handler: (req: Request, res: Response) => any;
  middlewares?: { new (...args: any): IMiddleware }[];
  bodySchema?: Joi.Schema;
}

export abstract class IController {
  private handlersRegistry: Handler[] = [];

  protected registerHandler(handler: Handler): void {
    this.handlersRegistry.push(handler);
  }

  registerIn(app: Express): void {
    this.handlersRegistry.forEach((handler) => {
      app.use(handler.path, (req, res) => {
        const validation = handler.bodySchema?.validate(req.body);

        if (validation?.error) {
          return throwValidationError(res, validation.error);
        }

        handler.handler(req, res);
      });
    });
  }

  toString(): string {
    return this.handlersRegistry.map((h) => h.path).join("\n");
  }
}
