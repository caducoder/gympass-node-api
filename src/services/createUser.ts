import { prisma } from "@/lib/prisma.js";
import { hash } from "bcryptjs";

interface CreateUserParams {
  name: string;
  email: string;
  password: string
}

export async function createUserService({name, email, password}: CreateUserParams) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(userWithSameEmail) {
    throw new Error("User with this e-mail already exists")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })
}