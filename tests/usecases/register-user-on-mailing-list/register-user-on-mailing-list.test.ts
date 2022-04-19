import { InvalidEmailError } from '../../../src/entities/errors/invalid-email'
import { InvalidNameError } from '../../../src/entities/errors/invalid-name'
import { UserData } from '../../../src/entities/user-data'
import { left } from '../../../src/shared/either'
import { UserAlreadyExistsError } from '../../../src/usecases/errors/user-already-exists'
import { UserRepository } from '../../../src/usecases/ports/user-repository'
import { RegisterUserOnMailingListUsecase } from '../../../src/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../../src/usecases/repository/in-memory-user-repository'

describe('Register user on mailing list usecase', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'John Doe'
    const email = 'john_doe@email.com'

    const response = await usecase.perform({ name, email })

    const user = await repository.findByEmail(email)

    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john_doe@email.com')
    expect(response.isRight()).toBeTruthy()
  })

  it('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'J'
    const email = 'john_doe@email.com'

    const response = await usecase.perform({ name, email })
    const user = await repository.findByEmail(email)

    expect(user).toBeNull()
    expect(response.isLeft()).toBeTruthy()
    expect(response).toEqual(left(new InvalidNameError()))
  })

  it('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'John Doe'
    const email = 'john_doe'

    const response = await usecase.perform({ name, email })
    const user = await repository.findByEmail(email)

    expect(user).toBeNull()
    expect(response.isLeft()).toBeTruthy()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  it('should not add user if email already register', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const user1 = {
      name: 'John Doe',
      email: 'same@email.com'
    }

    const user2 = {
      name: 'Joana Doe',
      email: 'same@email.com'
    }

    const responseUser1 = await usecase.perform(user1)
    expect(responseUser1.isRight()).toBeTruthy()

    const responseUser2 = await usecase.perform(user2)
    expect(responseUser2.isLeft()).toBeTruthy()
    expect(responseUser2).toEqual(left(new UserAlreadyExistsError()))
  })
})
