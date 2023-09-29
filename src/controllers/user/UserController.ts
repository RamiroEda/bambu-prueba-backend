import jwt from "jsonwebtoken";
import { autoInjectable } from "tsyringe";
import { IController } from "../../models/IController";
import { AuthMiddleware } from "../../middlewares/auth";
import { UserRepository } from "./data/repositories/UserRepository";
import { Request, Response } from "express";

/**
 * Controlador para la gestión de usuarios.
 */
@autoInjectable()
export class UserController extends IController {
  constructor(private userRepository: UserRepository) {
    super();
    this.registerHandler({
      path: "/current-user",
      handler: this.currentUser,
      middlewares: [AuthMiddleware],
      method: "get",
    });
  }

  /**
   * Obtiene el usuario actual.
   */
  async currentUser(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1] ?? "";
    const decoded = jwt.decode(token) as
      | (jwt.JwtPayload & {
          id: string;
          email: string;
        })
      | null;

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    console.log(decoded);

    const user = await this.userRepository.findByEmail(decoded?.email ?? "");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      ...user,
      password: undefined,
    });
  }
}
