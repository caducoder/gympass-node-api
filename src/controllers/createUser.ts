import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUserService } from "@/services/createUser.js";

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
        await createUserService({email, name, password})

        return reply.status(201).send()
      } catch (error) {
        return reply.status(400).send()
      }
    
    }
  )
}