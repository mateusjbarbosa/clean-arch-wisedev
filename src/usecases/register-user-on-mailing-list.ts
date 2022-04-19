import { InvalidEmailError } from '../entities/errors/invalid-email'
import { InvalidNameError } from '../entities/errors/invalid-name'
import { User } from '../entities/user'
import { UserData } from '../entities/user-data'
import { Either, left, right } from '../shared/either'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { UserRepository } from './ports/user-repository'

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
