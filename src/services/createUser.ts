import { prisma } from "@/lib/prisma.js";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import type { UsersRepository } from "@/repositories/repository-interfaces.js";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";



interface CreateUserParams {
  name: string;
  email: string;
  password: string
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name, 
    email, 
    password
  }: CreateUserParams) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
  
    await this.usersRepository.create({email, name, password_hash})
  }
}

