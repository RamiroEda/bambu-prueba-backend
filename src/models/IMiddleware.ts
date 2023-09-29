import { NextFunction, Request, Response } from "express";

/**
 * Interfaz que deben implementar todos los middlewares.
 */
export interface IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void | Promise<void>;
}
