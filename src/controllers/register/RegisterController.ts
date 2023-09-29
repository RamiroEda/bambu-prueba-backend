import { Request, Response } from "express";
import { IController } from "../../models/IController";
import { autoInjectable, injectable } from "tsyringe";
import { UserRepository } from "../user/data/repositories/UserRepository";
import { EmailRepository } from "./data/repositories/EmailRepository";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";

@autoInjectable()
export class RegisterController extends IController {
  constructor(
    private userRepository: UserRepository,
    private emailRepository: EmailRepository
  ) {
    super();
    this.registerHandler({
      path: "/register",
      handler: this.register,
      method: "post",
      bodySchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        name: Joi.string().required(),
      }),
    });
  }

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists)
      return res.status(409).json({ message: "User already exists" });

    const user = await this.userRepository.create({ email, password, name });

    const verificationToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await this.emailRepository.sendEmail(
      user.email,
      "Welcome!",
      `
      <h1>Welcome ${user.name}!</h1>
      <p>Click <a href="http://localhost:3000/verify-email/${verificationToken}">here</a> to verify your email.</p>
    `
    );
  }
}
