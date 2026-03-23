import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

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
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false,
  }),
);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Architecture Firm Backend API is running',
    health: '/api/health',
    authLogin: '/api/auth/login',
    projects: '/api/projects',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.use((error, _req, res, _next) => {
  res.status(500).json({ message: 'Unexpected server error', error: error.message });
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
