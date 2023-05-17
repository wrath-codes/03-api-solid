import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  // Test Check-in a single user
  it('should be able to get check-in count from metrics', async () => {
    // create fake check-ins
    await checkInsRepository.create({
      user_id: 'any_user_id',
      gym_id: 'any_gym_id',
    })

    await checkInsRepository.create({
      user_id: 'any_user_id',
      gym_id: 'any_gym_id2',
    })

    await checkInsRepository.create({
      user_id: 'any_user_id',
      gym_id: 'any_gym_id3',
    })

    // fetch check-ins
    await expect(
      sut.execute({
        userId: 'any_user_id',
      }),
    ).resolves.toEqual({
      checkInsCount: 3,
    })
  })
})
