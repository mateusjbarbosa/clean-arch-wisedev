import { User, UserData } from '../entities'
import { InvalidEmailError, InvalidNameError } from '../entities/errors'
import { Either, left, right } from '../shared'
import { UserAlreadyExistsError } from './errors'
import { UserRepository } from './ports'

type UsecaseReturnType = Promise<Either<InvalidNameError | InvalidEmailError | UserAlreadyExistsError, UserData>>

export class RegisterUserOnMailingListUsecase {
  private readonly repository: UserRepository

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async perform (userData: UserData): UsecaseReturnType {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const userExists = await this.repository.findByEmail(userData.email)

    if (userExists) {
      return left(new UserAlreadyExistsError(userData.email))
    }

    await this.repository.add(userData)

    return right(userData)
  }
}
