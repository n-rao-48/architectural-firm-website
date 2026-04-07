import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';

import { getInquiries } from './controllers/emailController.js';

import authRoutes from './routes/authRoutes.js';
import careerInquiryRoutes from './routes/careerInquiryRoutes.js';
import clientInquiryRoutes from './routes/clientInquiryRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);


// =========================
// CORS CONFIG (PRODUCTION READY)
// =========================
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...configuredOrigins,
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false,
  })
);


// =========================
// MIDDLEWARE
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =========================
// ROOT + HEALTH
// =========================
app.get('/', (_req, res) => {
  res.json({
    message: 'Architecture Firm Backend API is running',
    health: '/api/health',
    authLogin: '/api/auth/login',
    projects: '/api/projects',
    clientInquiry: '/api/client-inquiry',
    careerInquiry: '/api/career-inquiry',
    sendEmail: '/api/send-email',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});


// =========================
// ROUTES (FINAL CLEAN STRUCTURE)
// =========================
app.get('/api/inquiries', getInquiries);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/client-inquiry', clientInquiryRoutes);
app.use('/api/career-inquiry', careerInquiryRoutes);
app.use('/api/send-email', emailRoutes);


// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Unexpected server error',
    error: error.message,
  });
});


// =========================
// START SERVER (DB FIRST)
// =========================
async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Backend API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();