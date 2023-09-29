import jwt from "jsonwebtoken";
import { autoInjectable, injectable } from "tsyringe";
import { IMiddleware } from "../models/IMiddleware";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../constants";

/**
 * Middleware que verifica que el token de autorización sea válido.
 */
@autoInjectable()
export class AuthMiddleware implements IMiddleware {
  handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {
    const authHeader = req.headers.authorization;
    const [tokenType, token]: (string | undefined)[] =
      authHeader?.split(" ") ?? [];

    try {
      const verified = jwt.verify(token, JWT_SECRET);

      if (!verified) throw new Error("Invalid token");
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
