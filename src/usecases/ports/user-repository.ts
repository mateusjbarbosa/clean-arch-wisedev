import { UserData } from '../../entities'

export interface UserRepository {
  add(user: UserData): Promise<void>
  findAll(): Promise<UserData[]>
  findByEmail(email: string): Promise<UserData>
}
