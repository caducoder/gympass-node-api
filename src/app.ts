import fastify from "fastify";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { createUser } from "./controllers/createUser.js";
import { ZodError } from "zod";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createUser)

// app.setErrorHandler((error, request, reply) => {
// 	if(error instanceof ZodError) {
// 		return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
// 	}

// 	console.log( error)

// 	return reply.status(500).send({ message: 'Internal Server Error.'})
// })