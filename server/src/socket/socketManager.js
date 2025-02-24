const jwt = require('jsonwebtoken');

class SocketManager {
    constructor(io) {
        this.io = io;
        this.connectedUsers = new Map();
        this.setupSocketHandlers();
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('authenticate', (token) => {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    this.connectedUsers.set(decoded.id, socket.id);
                    socket.userId = decoded.id;
                    socket.emit('authenticated', { status: 'success' });
                } catch (err) {
                    socket.emit('authenticated', { 
                        status: 'error',
                        message: 'Authentication failed'
                    });
                }
            });

            socket.on('disconnect', () => {
                if (socket.userId) {
                    this.connectedUsers.delete(socket.userId);
                }
                console.log('Client disconnected');
            });
        });
    }

    sendNotification(userId, type, data) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.io.to(socketId).emit('notification', { type, data });
        }
    }
}

module.exports = SocketManager;