import { User, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, left, right } from '@/shared'
import { UserAlreadyExistsError } from '@/usecases/errors'
import { UserRepository } from '@/usecases/ports'
import { Usecase } from './ports'

type UsecaseReturnType = Promise<Either<InvalidNameError | InvalidEmailError | UserAlreadyExistsError, UserData>>

export class RegisterUserOnMailingListUsecase implements Usecase {
  private readonly repository: UserRepository

  constructor (repository: UserRepository) {
    this.repository = repository
  }

  async execute (userData: UserData): UsecaseReturnType {
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
