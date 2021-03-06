import { InMemoryUserRepository } from '#/usecases/repository'
import { UserData } from '@/entities'

describe('In memory user repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const repository = new InMemoryUserRepository(users)

    const user = await repository.findByEmail('john_doe@gmail.com')

    expect(user).toBeNull()
  })

  it('should return user if user is found', async () => {
    const users: UserData[] = []
    const repository = new InMemoryUserRepository(users)

    const name = 'John Doe'
    const email = 'john_doe@email.com'

    await repository.add({ name, email })

    const user = await repository.findByEmail('john_doe@email.com')

    expect(user.name).toBe('John Doe')
  })

  it('should return all users', async () => {
    const users: UserData[] = [
      {
        name: 'John Doe',
        email: 'john_doe@email.com'
      },
      {
        name: 'Jane Doe',
        email: 'jane_doe@email.com'
      }
    ]
    const repository = new InMemoryUserRepository(users)

    const allUsers = await repository.findAll()

    expect(allUsers.length).toBe(2)
  })
})
