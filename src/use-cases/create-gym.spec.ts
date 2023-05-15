import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  // Test Create a single gym
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: null,
      phone: null,
      latitude: 123.456,
      longitude: 456.123,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
