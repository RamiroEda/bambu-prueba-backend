import { injectable } from "tsyringe";
import { IController } from "../../models/IController";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";
import { UserRepository } from "../user/data/repositories/UserRepository";

@injectable()
export class ValidationController extends IController {
  constructor(private userRepository: UserRepository) {
    super();
    this.registerHandler({
      path: "/verify-email/:token",
      method: "get",
      handler: this.verifyEmail,
    });
  }

  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as
        | (jwt.JwtPayload & {
            id: string;
            email: string;
          })
        | null;

      if (!decoded) return res.status(401).json({ message: "Invalid token" });

      const user = await this.userRepository.findByEmail(decoded.email);

      if (!user) return res.status(404).json({ message: "User not found" });

      await this.userRepository.update(user.id, {
        isVerified: true,
      });

      res.json({ message: "Email verified" });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
