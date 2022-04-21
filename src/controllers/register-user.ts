import { UserData } from '@/entities'
import { Usecase } from '@/usecases/ports'
import { MissingParamError } from './errors'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created, serverError } from './utils'

export class RegisterUserController {
  private readonly usecase: Usecase

  constructor (usecase: Usecase) {
    this.usecase = usecase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
    } catch (error) {
      return serverError(error)
    }
  }
}
