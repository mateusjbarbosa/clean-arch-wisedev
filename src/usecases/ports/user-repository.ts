import { UserData } from '../register-user-on-mailing-list/user-data'

export interface UserRepository {
  add(user: UserData): Promise<void>
  findAll(): Promise<UserData[]>
  findByEmail(email: string): Promise<UserData>
}
