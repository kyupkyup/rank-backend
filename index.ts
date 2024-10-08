import Fastify from 'fastify'
import { addGame } from '@api/addGame'

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
})

addGame(fastify)

// Run the server!
try {
    await fastify.listen({ port: 3000, "host": "0.0.0.0" })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}