import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const [tokenType, token]: (string | undefined)[] =
    authHeader?.split(" ") ?? [];

  console.log("authMiddleware");
  next();
}
