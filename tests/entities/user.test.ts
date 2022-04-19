import { User } from '../../src/entities/user'

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
    const error = User.create({ name: 'John Doe', email: invalidEmail }).value as Error

    expect(error.name).toBe('InvalidEmailError')
    expect(error.message).toBe(`Invalid email: ${invalidEmail}`)
  })

  it('should not create user with invalid name (minimal length)', () => {
    const invalidName = 'J' + ' '.repeat(10)
    const error = User.create({ name: invalidName, email: 'any@email.com' }).value as Error

    expect(error.name).toBe('InvalidNameError')
    expect(error.message).toBe(`Invalid name: ${invalidName}`)
  })

  it('should not create user with invalid name (maximum length)', () => {
    const invalidName = 'J'.repeat(256)
    const error = User.create({ name: invalidName, email: 'any@email.com' }).value as Error

    expect(error.name).toBe('InvalidNameError')
    expect(error.message).toBe(`Invalid name: ${invalidName}`)
  })

  it('should not create user with invalid name (null)', () => {
    const invalidName = null
    const error = User.create({ name: invalidName, email: 'any@email.com' }).value as Error

    expect(error.name).toBe('InvalidNameError')
    expect(error.message).toBe(`Invalid name: ${invalidName}`)
  })

  it('should not create user with invalid name (empty)', () => {
    const invalidName = ''
    const error = User.create({ name: invalidName, email: 'any@email.com' }).value as Error

    expect(error.name).toBe('InvalidNameError')
    expect(error.message).toBe(`Invalid name: ${invalidName}`)
  })
})
