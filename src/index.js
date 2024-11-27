import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { config } from './config/index.js'
import { userRoutes } from './routes/users.js'
import { authRoutes } from './routes/auth.js'

const app = new Hono()

// Global middleware
app.use('*', logger)
app.use('*', errorHandler)

// Routes
app.route('/api/users', userRoutes)
app.route('/api/auth', authRoutes)

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

// Start server
serve({
  fetch: app.fetch,
  port: config.port
}, (info) => {
  console.log(`Server is running on port ${info.port}`)
})