import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import publicationsRoutes from './routes/publications.js';
import programAreasRoutes from './routes/programAreas.js';
import projectsRoutes from './routes/projects.js';
import uploadsRoutes from './routes/uploads.js';
import storiesRoutes from './routes/stories.js';
import facultyRoutes from './routes/faculty.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// IMPORTANT: Trust proxy (fixes the X-Forwarded-For error)
app.set('trust proxy', true);

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = process.env.UPLOAD_DIR || join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS: Allow your domain and development
app.use(cors({
  origin: [
    'https://geiglobal.org',
    'https://www.geiglobal.org',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers (more permissive for production)
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP temporarily
  crossOriginEmbedderPolicy: false
}));

// API rate limiting - Fix the proxy issue
app.use('/api/', rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 1000, // Increased limit
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true, // Important: trust proxy
  keyGenerator: (req) => {
    // Use X-Forwarded-For if available, otherwise req.ip
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
  }
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
app.use('/api/faculty', facultyRoutes);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, organization, subject, message } = req.body;
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ error: true, message: 'Missing required fields.' });
  }

  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: `Contact Form: ${subject}`,
      replyTo: email,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nOrganization: ${organization || ''}\nSubject: ${subject}\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Organization:</strong> ${organization || ''}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Error sending contact email:', err);
    res.status(500).json({ error: true, message: 'Failed to send message.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Serve frontend static files
const frontendPath = join(__dirname, 'dist');
app.use(express.static(frontendPath));

// Only serve index.html for non-API, non-static requests
app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/uploads') ||
    req.path.startsWith('/assets') ||
    req.path.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return next();
  }
  res.sendFile(join(frontendPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong on the server' : err.message
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});