import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

@singleton()
export class UserRepository {
  create({ password, ...data }: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(password, 10),
      },
    });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
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
