import { Either, left, right } from '../shared/'
import { InvalidEmailError, InvalidNameError } from './errors'
import { UserData } from './user-data'
import { Email, Name } from './value-objects'

export class User {
  public readonly name: Name
  public readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    const emailOrError = Email.create(userData.email)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const name = nameOrError.value as Name
    const email = emailOrError.value as Email

    return right(new User(name, email))
  }
}
