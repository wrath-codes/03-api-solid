import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymBodySchema.parse(request.query)

  const useCase = makeSearchGymsUseCase()

  const { gyms } = await useCase.execute({ query: q, page })

  return reply.status(200).send({ gyms })
}
