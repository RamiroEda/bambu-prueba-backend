import { Request } from "express";
import { IController } from "../../models/IController";
import { injectable } from "tsyringe";
import { UserRepository } from "./data/repositories/UserRepository";
import { EmailRepository } from "./data/repositories/EmailRepository";

@injectable()
export class RegisterController extends IController {
  constructor(
    private registerRepository: UserRepository,
    private emailRepository: EmailRepository
  ) {
    super();
    this.registerHandler({ path: "/register", handler: this.register });
  }

  register(req: Request) {
    console.log("register");
  }
}
