import nodemailer from 'nodemailer';

let cachedTransporter;

function toBoolean(value, defaultValue = false) {
  if (typeof value !== 'string') {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function getDefaultSmtpConfig(service) {
  if (service === 'outlook') {
    return {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
    };
  }

  if (service === 'yahoo') {
    return {
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
    };
  }

  return {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
  };
}

export function getEmailTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const smtpService = (process.env.SMTP_SERVICE || 'gmail').trim().toLowerCase();
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP_USER and SMTP_PASS must be configured');
  }

  if (smtpService === 'gmail') {
    // Gmail supports compact service-based transport config.
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    return cachedTransporter;
  }

  // Non-Gmail providers use host/port config (with optional env overrides).
  const defaults = getDefaultSmtpConfig(smtpService);
  const host = (process.env.SMTP_HOST || defaults.host).trim();
  const port = Number(process.env.SMTP_PORT || defaults.port);
  const secure = toBoolean(process.env.SMTP_SECURE, defaults.secure);

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return cachedTransporter;
}
