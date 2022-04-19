import { UserRepository } from '../ports/user-repository'
import { UserData } from '../register-user-on-mailing-list/user-data'

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[] = []

  constructor (users: UserData[]) {
    this.users = users
  }

  public async add (user: UserData): Promise<void> {
    const userExists = await this.findByEmail(user.email)

    if (!userExists) {
      this.users.push(user)
    }
  }

  public async findAll (): Promise<UserData[]> {
    return this.users
  }

  public async findByEmail (email: string): Promise<UserData> {
    const users = this.users.filter(user => user.email === email)

    if (users.length > 0) {
      return users[0]
    }

    return null
  }
}
