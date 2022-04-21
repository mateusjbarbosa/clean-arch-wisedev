import { UserData } from '@/entities'
import { Usecase } from '@/usecases/ports/usecase'
import { MissingParamError } from './errors'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created } from './utils'

export class RegisterUserController {
  private readonly usecase: Usecase

  constructor (usecase: Usecase) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = httpRequest.body

    const requiredParams = ['name', 'email']
    const missingParams = requiredParams.filter((_, idx) => !userData[requiredParams[idx]])
    if (missingParams.length) {
      return badRequest(new MissingParamError(missingParams.join(',')))
    }

    const response = await this.usecase.execute(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
