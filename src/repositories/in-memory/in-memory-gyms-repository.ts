import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../interfaces/gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  // Find a gym by id
  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  // Create a single gym
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
