import {test, expect, describe, it} from 'vitest'
import { CreateUserService } from './createUser.js';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js';
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js';

describe("Create User Service", () => {
  it("Should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({
      name: "Jonh Doe",
      email: "johndoe@example.com",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))

  })
  it("Should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password: "123456"
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("Should throw error when email already exists", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const email = "jonhdoe@example.com"

    await createUserService.execute({
      name: "Jonh Doe",
      email,
      password: "123456"
    })

    await expect(() => createUserService.execute({
      name: "Jonh Doe",
      email,
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})