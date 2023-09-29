import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

@injectable()
export class UserRepository {
  create({ password, ...data }: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(password, 10),
      },
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
