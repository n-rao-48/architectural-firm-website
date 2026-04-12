function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function getFirstPresentEnv(envNames) {
  for (const name of envNames) {
    if (isNonEmpty(process.env[name])) {
      return name;
    }
  }
  return null;
}

function getMissing(envNames) {
  return envNames.filter((name) => !isNonEmpty(process.env[name]));
}

function looksMalformedMongoUri(uri) {
  if (!uri) return false;
  return uri.includes('mailto:') || uri.includes('%[') || uri.includes('](');
}

function isLikelyWeakJwt(secret) {
  const value = (secret || '').trim();
  if (value.length < 32) return true;

  const weakValues = new Set([
    'secret',
    'jwt_secret',
    'changeme',
    'password',
    'admin123',
    '123456',
  ]);

  return weakValues.has(value.toLowerCase());
}

export function validateEnvironment() {
  const errors = [];
  const warnings = [];

  const required = ['JWT_SECRET'];
  const missingRequired = getMissing(required);
  if (missingRequired.length > 0) {
    errors.push(`Missing required environment variables: ${missingRequired.join(', ')}`);
  }

  const mongoEnvCandidates = ['MONGO_URI', 'MONGODB_URI', 'DATABASE_URL'];
  const mongoSource = getFirstPresentEnv(mongoEnvCandidates);
  const mongoUri = mongoSource ? process.env[mongoSource].trim() : '';

  if (!mongoSource) {
    errors.push('Missing MongoDB URI. Set one of: MONGO_URI, MONGODB_URI, DATABASE_URL');
  } else {
    const hasValidScheme = mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://');
    if (!hasValidScheme) {
      errors.push(`${mongoSource} must start with mongodb:// or mongodb+srv://`);
    }

    if (looksMalformedMongoUri(mongoUri)) {
      errors.push(`${mongoSource} appears malformed (possibly copied from markdown/email format)`);
    }
  }

  if (isNonEmpty(process.env.JWT_SECRET) && isLikelyWeakJwt(process.env.JWT_SECRET)) {
    warnings.push('JWT_SECRET appears weak. Use a random secret with at least 32 characters.');
  }

  const cloudinaryVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];
  const missingCloudinary = getMissing(cloudinaryVars);
  if (missingCloudinary.length > 0) {
    warnings.push(
      `Cloudinary is not fully configured. Missing: ${missingCloudinary.join(', ')} (upload routes will fail)`
    );
  }

  const smtpRequired = ['SMTP_USER', 'SMTP_PASS'];
  const missingSmtp = getMissing(smtpRequired);
  if (missingSmtp.length > 0) {
    warnings.push(
      `SMTP is not fully configured. Missing: ${missingSmtp.join(', ')} (email routes may fail)`
    );
  }

  if (!isNonEmpty(process.env.ADMIN_PASSWORD) && !isNonEmpty(process.env.ADMIN_PASSWORD_HASH)) {
    warnings.push('Admin credentials are not explicitly configured. Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH.');
  }

  const hasConfiguredCorsOrigin =
    isNonEmpty(process.env.CLIENT_ORIGIN) ||
    isNonEmpty(process.env.CLIENT_ORIGINS) ||
    isNonEmpty(process.env.DEPLOYED_CLIENT_ORIGIN);

  if ((process.env.NODE_ENV || '').toLowerCase() === 'production' && !hasConfiguredCorsOrigin) {
    warnings.push(
      'No CORS origin env configured for production. Set CLIENT_ORIGIN, CLIENT_ORIGINS, or DEPLOYED_CLIENT_ORIGIN.'
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    details: {
      mongoEnvSource: mongoSource,
      hasJwtSecret: isNonEmpty(process.env.JWT_SECRET),
      hasCloudinary: missingCloudinary.length === 0,
      hasSmtp: missingSmtp.length === 0,
      hasCorsOrigin: hasConfiguredCorsOrigin,
    },
  };
}

export function getStartupConfigStatus() {
  const report = validateEnvironment();

  return {
    status: report.ok ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    runtime: {
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
    },
    checks: {
      requiredEnv: {
        ok: report.errors.length === 0,
        errors: report.errors,
      },
      warnings: report.warnings,
      mongo: {
        envSource: report.details.mongoEnvSource,
        configured: Boolean(report.details.mongoEnvSource),
      },
      jwt: {
        configured: report.details.hasJwtSecret,
      },
      cloudinary: {
        configured: report.details.hasCloudinary,
      },
      smtp: {
        configured: report.details.hasSmtp,
      },
      corsOrigin: {
        configured: report.details.hasCorsOrigin,
      },
    },
  };
}
