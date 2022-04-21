import { InMemoryUserRepository } from '#/usecases/repository'
import { RegisterUserController } from '@/controllers'
import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingListUsecase } from '@/usecases'
import { UserRepository } from '@/usecases/ports'

describe('Register user web controller', () => {
  it('should return a 201 when request with valid data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john_doe@email.com'
      }
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(request.body)
  })

  it('should return a 400 when request with invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'J',
        email: 'john_doe@email.com'
      }
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  it('should return a 400 when request with invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john_doe'
      }
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })
})
