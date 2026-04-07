import { getMailTransporter } from '../config/mail.js';

function normalizeAddressList(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((email) => String(email || '').trim())
      .filter(Boolean);
  }

  return String(value)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendEmail({ to, cc, subject, text, html, bcc }) {
  const transporter = getMailTransporter();
  const fromAddress = (process.env.FROM_EMAIL || process.env.SMTP_USER || '').trim();

  if (!to || !subject || !text) {
    throw new Error('sendEmail requires to, subject and text');
  }

  if (!fromAddress) {
    throw new Error('FROM_EMAIL or SMTP_USER must be configured');
  }

  const ccList = normalizeAddressList(cc);
  const bccList = normalizeAddressList(bcc);
  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(ccList.length ? { cc: ccList } : {}),
    ...(bccList.length ? { bcc: bccList } : {}),
  };

  return transporter.sendMail(mailOptions);
}
