import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  // Test Search for gyms
  it('should be able to search for gyms', async () => {
    // create fake check-ins
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.8949505,
      longitude: -43.1262581,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -22.8949505,
      longitude: -43.1262581,
    })

    await gymsRepository.create({
      title: 'Node.js Gym',
      description: null,
      phone: null,
      latitude: -22.8949505,
      longitude: -43.1262581,
    })

    // search for gyms
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'JavaScript Gym',
        }),
      ]),
    )
  })

  // Test Search for gyms paginated
  it('should be able to search for gyms paginated', async () => {
    // create fake gyms
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8949505,
        longitude: -43.1262581,
      })
    }

    // search for gyms
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'JavaScript Gym 21',
        }),
        expect.objectContaining({
          title: 'JavaScript Gym 22',
        }),
      ]),
    )
  })
})
