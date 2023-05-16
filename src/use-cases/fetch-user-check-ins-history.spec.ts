import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInHistoryUseCaseUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCaseUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUseCaseUseCase(checkInsRepository)
  })

  // Test Check-in a single user
  it('should be able to fetch check-in history', async () => {
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
    const { checkIns } = await sut.execute({
      userId: 'any_user_id',
      page: 1,
    })

    // check if check-ins are correct
    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: 'any_user_id',
          gym_id: 'any_gym_id',
        }),
        expect.objectContaining({
          user_id: 'any_user_id',
          gym_id: 'any_gym_id2',
        }),
        expect.objectContaining({
          user_id: 'any_user_id',
          gym_id: 'any_gym_id3',
        }),
      ]),
    )
  })

  // Test Check-in a single user
  it('should be able to fetch paginated check-in history', async () => {
    // create fake check-ins
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'any_user_id',
        gym_id: `any_gym_id_${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'any_user_id',
      page: 2,
    })

    // check if check-ins are correct
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: 'any_user_id',
          gym_id: 'any_gym_id_21',
        }),
        expect.objectContaining({
          user_id: 'any_user_id',
          gym_id: 'any_gym_id_22',
        }),
      ]),
    )
  })
})
