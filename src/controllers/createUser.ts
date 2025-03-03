import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { CreateUserService } from "@/services/createUser.js";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error.js";

export const createUser: FastifyPluginAsyncZod = async app => {
  app.post("/users",
    { schema: {
      body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(3)
      })
    }}, async (request, reply) => {
      const {name, email, password} = request.body

      try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const createUserService = new CreateUserService(prismaUsersRepository)
        await createUserService.execute({email, name, password})

        return reply.status(201).send()
      } catch (error: unknown) {
        if (error instanceof UserAlreadyExistsError) {
          return reply.status(409).send(error)
        }
        
        throw error
      }
    }
  )
}