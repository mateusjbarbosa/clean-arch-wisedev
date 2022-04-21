import { InMemoryUserRepository } from '#/usecases/repository'
import { RegisterUserController } from '@/controllers'
import { MissingParamError } from '@/controllers/errors'
import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingListUsecase } from '@/usecases'
import { Usecase, UserRepository } from '@/usecases/ports'

class ErrorThrowingUsecaseStub implements Usecase {
  async execute (request: HttpRequest): Promise<void> {
    throw new Error()
  }
}

const makeSut = (): RegisterUserController => {
  const users: UserData[] = []
  const repository: UserRepository = new InMemoryUserRepository(users)
  const usecase: Usecase = new RegisterUserOnMailingListUsecase(repository)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  return controller
}

describe('Register user web controller', () => {
  it('should return a 201 when request with valid data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john_doe@email.com'
      }
    }
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(request)

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
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(requestWithInvalidName)

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
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(requestWithInvalidEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  it('should return a 400 when request with missing name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'john_doe@email.com'
      }
    }
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(requestWithMissingName)

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
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(requestWithMissingEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect(response.body.message).toBe('Missing parameter(s) from request: email')
  })

  it('should return a 400 when request with missing all data', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {}
    }
    const sut = makeSut()
    const response: HttpResponse = await sut.handle(requestWithMissingEmail)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect(response.body.message).toBe('Missing parameter(s) from request: name,email')
  })

  it('should return a 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'john_doe@email.com'
      }
    }
    const usecase: Usecase = new ErrorThrowingUsecaseStub()
    const sut: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
