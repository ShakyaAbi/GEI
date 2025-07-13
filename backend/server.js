import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Import routes
import authRoutes from './routes/auth.js';
import publicationsRoutes from './routes/publications.js';
import programAreasRoutes from './routes/programAreas.js';
import projectsRoutes from './routes/projects.js';
import uploadsRoutes from './routes/uploads.js';
import storiesRoutes from './routes/stories.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = process.env.UPLOAD_DIR || join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL] // Your production frontend URL
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/program-areas', programAreasRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/stories', storiesRoutes);

// Serve frontend static files
const frontendPath = join(__dirname, '../dist');
app.use(express.static(frontendPath));

// Serve index.html for any unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(join(frontendPath, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong on the server' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});