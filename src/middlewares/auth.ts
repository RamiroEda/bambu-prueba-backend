import { injectable } from "tsyringe";
import { IMiddleware } from "../models/middleware";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware implements IMiddleware {
  handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {
    const authHeader = req.headers.authorization;
    const [tokenType, token]: (string | undefined)[] =
      authHeader?.split(" ") ?? [];

    console.log("authMiddleware");
    next();
  }
}
