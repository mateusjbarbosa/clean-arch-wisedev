import { InMemoryUserRepository } from '#/usecases/repository'
import { UserData } from '@/entities'
import { RegisterUserOnMailingListUsecase } from '@/usecases'
import { UserRepository } from '@/usecases/ports'

describe('Register user on mailing list usecase', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'John Doe'
    const email = 'john_doe@email.com'

    await usecase.execute({ name, email })
    const user = await repository.findByEmail(email)

    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john_doe@email.com')
  })

  it('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'J'
    const email = 'john_doe@email.com'

    const response = (await usecase.execute({ name, email })).value as Error
    const user = await repository.findByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toBe('InvalidNameError')
  })

  it('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)

    const name = 'John Doe'
    const email = 'john_doe'

    const response = (await usecase.execute({ name, email })).value as Error
    const user = await repository.findByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toBe('InvalidEmailError')
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

    const responseUser1 = (await usecase.execute(user1)).value as UserData
    expect(responseUser1.email).toBe('same@email.com')

    const responseUser2 = (await usecase.execute(user2)).value as Error
    expect(responseUser2.name).toBe('UserAlreadyExistsError')
    expect(responseUser2.message).toBe(`User with email ${user2.email} already exists`)
  })
})
