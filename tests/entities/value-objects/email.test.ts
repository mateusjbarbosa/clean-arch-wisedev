import { Email } from '../../../src/entities/value-objects'

describe('Email validation', () => {
  it('should accept valid email', () => {
    const email: string = 'john_doe@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeTruthy()
  })

  it('should not accept null strings', () => {
    const email: string = null
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept empty strings', () => {
    const email: string = ''
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept strings larger than 320 chars', () => {
    const email: string = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept email without an at-sign', () => {
    const email: string = 'johndoeemail.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept local part larger than 64 chars', () => {
    const email: string = 'l'.repeat(65) + '@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept empty local part', () => {
    const email: string = '@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept local part with invalid char', () => {
    const email: string = 'john doe@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept local part with two dots', () => {
    const email: string = 'john..doe@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept local part with ending dot', () => {
    const email: string = 'johndoe.@email.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept domain part larger than 255 chars', () => {
    const email: string = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept empty domain part', () => {
    const email: string = 'local@'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })

  it('should not accept domain with a part larger than 63 chars', () => {
    const email: string = 'local@' + 'd'.repeat(64) + '.com'
    const isValid: boolean = Email.validate(email)

    expect(isValid).toBeFalsy()
  })
})
