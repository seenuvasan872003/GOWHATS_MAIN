require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const checkTenant = require('./middleware/tenantMiddleware');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

// Import routes
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const webhookRoutes = require('./routes/webhook');
const templatesRoutes = require('./routes/templates');
const messagesRouter = require('./routes/messages');
const whatsappRoutes = require('./routes/whatsapp');


const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', apiLimiter);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', [auth, checkTenant], messagesRouter);
app.use('/api/contacts', [auth, checkTenant], contactsRoutes);
app.use('/webhook', webhookRoutes);
app.use('/api/templates', [auth, checkTenant], templatesRoutes);
app.use('/api/whatsapp', [auth, checkTenant], whatsappRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

// Socket authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.tenant_id = decoded.tenant_id;
    socket.user_id = decoded._id;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

// Socket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.tenant_id);
  
  socket.join(socket.tenant_id);

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.tenant_id, 'Reason:', reason);
    socket.leave(socket.tenant_id);
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Make io available globally
global.io = io;

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});