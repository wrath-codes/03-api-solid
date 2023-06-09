import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../interfaces/users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  // Find a user by id
  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)
    if (!user) {
      return null
    } else {
      return user
    }
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)
    if (!user) {
      return null
    } else {
      return user
    }
  }

  // Create a single user
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
