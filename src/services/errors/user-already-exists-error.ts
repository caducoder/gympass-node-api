export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with this e-mail already exists')
  }
}