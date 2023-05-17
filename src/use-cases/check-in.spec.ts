import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymRepository)

    await gymRepository.create({
      id: 'any_gym_id',
      title: 'JS Academy',
      description: 'The best gym in the world',
      phone: '21999999999',
      latitude: -22.8949505,
      longitude: -43.1262581,
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  // Test Check-in a single user
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -22.8949505,
      userLongitude: -43.1262581,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Test Check-in twice in the same day
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -22.8949505,
      userLongitude: -43.1262581,
    })

    await expect(() =>
      sut.execute({
        gymId: 'any_gym_id',
        userId: 'any_user_id',
        userLatitude: -22.8949505,
        userLongitude: -43.1262581,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  // Test Check-in twice in different days
  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -22.8949505,
      userLongitude: -43.1262581,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: -22.8949505,
      userLongitude: -43.1262581,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Test
  it('should be not able to check in on a distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymRepository.items.push({
      id: 'any_gym_id-2',
      title: '',
      description: '',
      phone: '',
      latitude: new Decimal(-22.89683859450295),
      longitude: new Decimal(-43.1236841737223),
    })

    await expect(() =>
      sut.execute({
        gymId: 'any_gym_id-2',
        userId: 'any_user_id',
        userLatitude: -22.8949505,
        userLongitude: -43.1262581,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
