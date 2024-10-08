import { FastifyInstance } from 'fastify'

export const addGame = (fastify: FastifyInstance) => {
    fastify.route({
        method: 'POST',
        url: '/addgame',
        schema: {
            body: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        buyin: { type: 'number' },
                        rank: { type: 'number' }
                    },
                    required: ['id', 'buyin', 'rank']
                }
            }
        },
        // this function is executed for every request before the handler is executed
        preHandler: async (request, reply) => {
            // E.g. check authentication
        },
        handler: async (request, reply) => {
            console.log(request, reply)
            return { hello: 'world' }
        }
    })
}