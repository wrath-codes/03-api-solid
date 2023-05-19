import '@fastify/jwt'

declare module '@fastify/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyJWT {
    user: {
      role: 'ADMIN' | 'MEMBER'
      sub: string
    }
  }
}
