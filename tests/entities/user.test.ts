import { InvalidEmailError } from '../../src/entities/errors/invalid-email'
import { InvalidNameError } from '../../src/entities/errors/invalid-name'
import { User } from '../../src/entities/user'
import { left } from '../../src/shared/either'

describe('User domain entity', () => {
  it('should create a user', () => {
    const userData = {
      name: 'John Doe',
      email: 'john_doe@email.com'
    }
    const user: User = User.create(userData).value as User

    expect(user.name.value).toBe('John Doe')
    expect(user.email.value).toBe('john_doe@email.com')
  })

  it('should not create user with invalid email', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'John Doe', email: invalidEmail })

    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it('should not create user with invalid name', () => {
    const invalidName = 'J' + ' '.repeat(10)
    const error = User.create({ name: invalidName, email: 'any@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  it('should not create user with invalid name', () => {
    const invalidName = 'J'.repeat(256)
    const error = User.create({ name: invalidName, email: 'any@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })
})
