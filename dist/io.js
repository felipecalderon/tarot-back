"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioServer = void 0;
const chat_1 = require("./chat");
const ioServer = (io) => {
    io.on('connection', (socket) => {
        console.log('usuario conectado');
        socket.on('data', async (data) => {
            if (data) {
                const response = await (0, chat_1.chat)(data);
                socket.emit('response', response);
            }
        });
        socket.on('disconnect', () => {
            console.log('usuario desconectado');
        });
    });
};
exports.ioServer = ioServer;
