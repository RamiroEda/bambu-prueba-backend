import { injectable } from "tsyringe";

@injectable()
export class RegisterRepository {
  constructor() {
    console.log("RegisterRepository");
  }
}