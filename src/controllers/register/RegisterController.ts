import { Request } from "express";
import { IController } from "../../models/controller";
import { injectable } from "tsyringe";
import { RegisterRepository } from "./data/repositories/RegisterRepository";

@injectable()
export class RegisterController extends IController {
  constructor(
    private registerRepository: RegisterRepository,
  ) {
    super();
    this.registerHandler({ path: "/register", router: this.register });
  }

  register(req: Request) {
    console.log("register");
  }
}
