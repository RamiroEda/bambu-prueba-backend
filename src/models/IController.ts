import { Request, Response, Express, NextFunction } from "express";
import { IMiddleware } from "./IMiddleware";
import { throwValidationError } from "./ValidationException";
import Joi from "joi";
import { container } from "tsyringe";

/**
 * Interfaz que define un handler de un controlador.
 */
interface Handler {
  path: string;
  handler: (req: Request, res: Response) => any;
  method: "get" | "post" | "put" | "delete";
  middlewares?: { new (...args: any): IMiddleware }[];
  bodySchema?: Joi.Schema;
}

/**
 * Interfaz que deben implementar todos los controladores.
 */
export abstract class IController {
  /**
   * Lista de handlers registrados en el controlador.
   */
  private handlersRegistry: Handler[] = [];

  /**
   * Registra un handler en el controlador para que sea registrado en la aplicación de Express.
   * @param handler Handler a registrar.
   */
  protected registerHandler(handler: Handler): void {
    this.handlersRegistry.push(handler);
  }

  /**
   * Registra todos los handlers del controlador en la aplicación de Express.
   * @param app Aplicación de Express.
   */
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

  /**
   * Devuelve una representación en string del controlador. Útil para mostrar información de los handlers registrados.
   */
  toString(): string {
    return this.handlersRegistry.map((h) => h.path).join("\n");
  }
}
