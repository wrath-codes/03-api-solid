import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-memory'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)
  return useCase
}
