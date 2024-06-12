import http from 'http'
import { app } from './app'
import { env } from './config/envs'
import { initSocket } from './sockets/init'

const server = http.createServer(app)

initSocket(server)

server.listen(env.port, () => {
    console.log('Servidor HTTP funcionando en ' + env.port)
})
