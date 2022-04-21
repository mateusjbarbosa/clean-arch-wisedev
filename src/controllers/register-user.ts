import { UserData } from '@/entities'
import { RegisterUserOnMailingListUsecase } from '@/usecases'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created } from './utils'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingListUsecase

  constructor (usecase: RegisterUserOnMailingListUsecase) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = httpRequest.body
    const response = await this.usecase.perform(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
