export class UserAlreadyExistsError extends Error {
  public readonly name = 'UserAlreadyExistsError'

  constructor (email: string) {
    super(`User with email ${email} already exists`)
  }
}
