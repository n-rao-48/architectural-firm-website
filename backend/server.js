import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getCloudinaryConfigStatus } from './config/cloudinary.js';
import connectDB from './config/db.js';
import { getStartupConfigStatus, validateEnvironment } from './config/envValidation.js';

import { getInquiries } from './controllers/emailController.js';

import authRoutes from './routes/authRoutes.js';
import careerInquiryRoutes from './routes/careerInquiryRoutes.js';
import clientInquiryRoutes from './routes/clientInquiryRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const parsedPort = Number.parseInt(process.env.PORT || '5000', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 5000;

function logFatal(label, error) {
  console.error(`FATAL: ${label}`);
  if (error?.stack) {
    console.error(error.stack);
  } else {
    console.error(error);
  }
}

function logStartupValidation() {
  const report = validateEnvironment();

  if (report.warnings.length > 0) {
    for (const warning of report.warnings) {
      console.warn(`WARN: ${warning}`);
    }
  }

  if (!report.ok) {
    for (const error of report.errors) {
      console.error(`ERROR: ${error}`);
    }
    throw new Error('Environment validation failed. Check startup logs above.');
  }

  const cloudinary = getCloudinaryConfigStatus();
  if (!cloudinary.configured) {
    console.warn('WARN: Cloudinary upload features are disabled until env vars are configured.');
  }
}

process.on('uncaughtException', (error) => {
  logFatal('Uncaught Exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logFatal('Unhandled Rejection', reason);
  process.exit(1);
});


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

function isAllowedVercelPreview(origin) {
  try {
    const hostname = new URL(origin).hostname;
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || isAllowedVercelPreview(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
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
    startupCheck: '/api/startup-check',
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

app.get('/api/startup-check', (_req, res) => {
  const startupStatus = getStartupConfigStatus();
  const statusCode = startupStatus.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(startupStatus);
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

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((error, _req, res, _next) => {
  console.error('Request error:', error?.stack || error);

  const statusCode = error.message?.startsWith('CORS blocked') ? 403 : 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode === 403 ? 'Origin is not allowed by CORS policy' : 'Unexpected server error',
    error: error.message,
  });
});


// =========================
// START SERVER (DB FIRST)
// =========================
async function startServer() {
  try {
    logStartupValidation();
    await connectDB();

    const server = app.listen(port, () => {
      console.log(`Backend API running on port ${port}`);
    });

    server.on('error', (error) => {
      logFatal('HTTP server listen error', error);
      process.exit(1);
    });
  } catch (error) {
    logFatal('Failed to start server', error);
    process.exit(1);
  }
}

startServer();