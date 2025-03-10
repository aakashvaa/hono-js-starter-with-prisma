export class User {
  constructor({ id, email, name, password }) {
    this.id = id
    this.email = email
    this.name = name
    this.password = password
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this
    return userWithoutPassword
  }
}