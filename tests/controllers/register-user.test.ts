import { InMemoryUserRepository } from '#/usecases/repository'
import { RegisterUserController } from '@/controllers'
import { MissingParamError } from '@/controllers/errors'
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

  it('should return a 400 when request with missing name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'john_doe@email.com'
      }
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithMissingName)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect(response.body.message).toBe('Missing parameter(s) from request: name')
  })

  it('should return a 400 when request with missing email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'John Doe'
      }
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect(response.body.message).toBe('Missing parameter(s) from request: email')
  })

  it('should return a 400 when request with missing all data', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {}
    }
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingListUsecase = new RegisterUserOnMailingListUsecase(repository)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect(response.body.message).toBe('Missing parameter(s) from request: name,email')
  })
})
