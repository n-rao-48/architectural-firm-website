import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getCloudinaryConfigStatus } from './config/cloudinary.js';
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

function getFirstSetEnvName(names) {
  for (const name of names) {
    if ((process.env[name] || '').trim()) {
      return name;
    }
  }
  return null;
}

function buildStartupCheckStatus() {
  const mongoEnvNames = ['MONGO_URI', 'MONGODB_URI', 'DATABASE_URL'];
  const mongoEnvSource = getFirstSetEnvName(mongoEnvNames);
  const mongoUri = mongoEnvSource ? (process.env[mongoEnvSource] || '').trim() : '';
  const mongoPresent = Boolean(mongoUri);
  const mongoSchemeValid = mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://');
  const mongoLooksMalformed = mongoUri.includes('mailto:') || mongoUri.includes('%[');

  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();
  const smtpService = (process.env.SMTP_SERVICE || 'gmail').trim().toLowerCase();

  const cloudinary = getCloudinaryConfigStatus();
  const missingRequiredEnv = getRequiredMissingEnv();

  const mongoConfigured = mongoPresent && mongoSchemeValid && !mongoLooksMalformed;
  const smtpConfigured = Boolean(smtpUser && smtpPass);
  const cloudinaryConfigured = Boolean(cloudinary.configured);

  const overallHealthy = missingRequiredEnv.length === 0 && mongoConfigured;

  return {
    status: overallHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    runtime: {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
    },
    checks: {
      requiredEnv: {
        ok: missingRequiredEnv.length === 0,
        missing: missingRequiredEnv,
      },
      mongo: {
        configured: mongoConfigured,
        envSource: mongoEnvSource,
        present: mongoPresent,
        schemeValid: mongoPresent ? mongoSchemeValid : null,
        malformed: mongoPresent ? mongoLooksMalformed : null,
      },
      cloudinary: {
        configured: cloudinaryConfigured,
      },
      smtp: {
        configured: smtpConfigured,
        service: smtpService,
      },
    },
  };
}

function logFatal(label, error) {
  console.error(`FATAL: ${label}`);
  if (error?.stack) {
    console.error(error.stack);
  } else {
    console.error(error);
  }
}

function getRequiredMissingEnv() {
  const required = ['JWT_SECRET'];
  return required.filter((name) => !(process.env[name] || '').trim());
}

function validateStartupConfig() {
  const missing = getRequiredMissingEnv();
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  const mongoUri = (
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    ''
  ).trim();

  if (!mongoUri) {
    throw new Error('Missing MongoDB URI. Set MONGO_URI (or MONGODB_URI / DATABASE_URL).');
  }

  if (mongoUri.includes('mailto:') || mongoUri.includes('%[')) {
    throw new Error(
      'MongoDB URI appears malformed (possibly copied from markdown). Check URI encoding and remove markdown artifacts.',
    );
  }

  const cloudinary = getCloudinaryConfigStatus();
  if (!cloudinary.configured) {
    console.warn(
      'Cloudinary is not fully configured. Upload routes will return clear errors until vars are set.',
    );
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
  const startupStatus = buildStartupCheckStatus();
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
    validateStartupConfig();
    await connectDB();

    app.listen(port, () => {
      console.log(`Backend API running on port ${port}`);
    });
  } catch (error) {
    logFatal('Failed to start server', error);
    process.exit(1);
  }
}

startServer();