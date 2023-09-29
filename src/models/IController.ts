import { Request, Response, Express, NextFunction } from "express";
import { IMiddleware } from "./IMiddleware";
import { throwValidationError } from "./ValidationException";
import Joi from "joi";
import { container } from "tsyringe";

interface Handler {
  path: string;
  handler: (req: Request, res: Response) => any;
  method: "get" | "post" | "put" | "delete";
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
      const middlewares =
        handler.middlewares?.map(
          (it) => (req: Request, res: Response, next: NextFunction) =>
            container.resolve(it).handle(req, res, next)
        ) ?? [];
      app[handler.method](
        handler.path,
        middlewares,
        (req: Request, res: Response) => {
          const validation = handler.bodySchema?.validate(req.body);

          if (validation?.error) {
            return throwValidationError(res, validation.error);
          }

          handler.handler?.call(this, req, res);
        }
      );
    });
  }

  toString(): string {
    return this.handlersRegistry.map((h) => h.path).join("\n");
  }
}
