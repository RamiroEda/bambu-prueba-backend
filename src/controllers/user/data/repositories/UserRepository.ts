import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

/**
 * Repositorio para la gestión de usuarios.
 */
@singleton()
export class UserRepository {
  /**
   * Crea un usuario.
   * @param data Datos del usuario.
   * @returns Usuario creado.
   */
  create({ password, ...data }: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(password, 10),
      },
    });
  }

  /**
   * Actualiza un usuario.
   * @param id ID del usuario.
   * @param data Datos del usuario.
   * @returns Usuario actualizado.
   */
  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Busca un usuario por su email.
   * @param email Email del usuario.
   * @returns Usuario encontrado.
   */
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
