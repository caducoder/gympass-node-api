import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { CreateUserService } from "@/services/createUser.js";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";

export const createUser: FastifyPluginAsyncZod = async app => {
  app.post("/users",
    { schema: {
      body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })
    }}, async (request, reply) => {
      const {name, email, password} = request.body

      try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const createUserService = new CreateUserService(prismaUsersRepository)
        await createUserService.execute({email, name, password})

        return reply.status(201).send()
      } catch (error: unknown) {
        console.log(error)
        return reply.status(400).send()
      }
    
    }
  )
}