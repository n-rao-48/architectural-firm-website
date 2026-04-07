import Inquiry from '../models/Inquiry.js';
import { sendEmail as sendMail } from '../services/emailService.js';

const allowedArchitectEmails = new Set([
  's.kaps@rediffmail.com',
  'd.kaps@rediffmail.com',
  'ngrao7nsk@gmail.com',
]);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isEnabled(value) {
  return String(value || '').trim().toLowerCase() === 'true';
}

function getEmailRoutingFields(architectEmail) {
  const ccField = isEnabled(process.env.ENABLE_CC) ? architectEmail : undefined;
  const failSafeEmail = typeof process.env.FAIL_SAFE_EMAIL === 'string' ? process.env.FAIL_SAFE_EMAIL.trim() : '';
  const bccField = isEnabled(process.env.ENABLE_BCC) && failSafeEmail ? failSafeEmail : undefined;

  return { ccField, bccField };
}

function escapeHtml(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function sendEmail(req, res) {
  const architectEmail = typeof req.body.architectEmail === 'string' ? req.body.architectEmail.trim().toLowerCase() : '';
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

  if (!name || !email || !message || !architectEmail) {
    return res.status(400).json({ success: false, message: 'Name, email, message and architectEmail are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid sender email format' });
  }

  if (!allowedArchitectEmails.has(architectEmail) &&
  architectEmail !== process.env.SMTP_USER?.trim().toLowerCase() &&
  architectEmail !== process.env.FAIL_SAFE_EMAIL?.trim().toLowerCase()) {
    return res.status(400).json({
    success: false,
    message: 'Invalid architect email selected', });
  }

  const { ccField, bccField } = getEmailRoutingFields(architectEmail);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    await Inquiry.create({
      name,
      email,
      message,
      architectEmail,
    });
  } catch {
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  try {
    // 1) Confirmation email to the user.
    await sendMail({
      to: email,
      cc: ccField,
      bcc: bccField,
      subject: 'We received your inquiry',
      text: [
        `Hello ${name},`,
        '',
        'Thank you for contacting Kapadnekar Design Consultancy.',
        'Our team has received your inquiry and will get back to you soon.',
        '',
        'Your submitted message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b2b2b;">
          <p>Hello <strong>${safeName}</strong>,</p>
          <p>Thank you for contacting Kapadnekar Design Consultancy.</p>
          <p>Our team has received your inquiry and will get back to you soon.</p>
          <p><strong>Your submitted message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    // 2) Notification email to selected architect.
    await sendMail({
      to: architectEmail,
      bcc: bccField,
      subject: '[Website Inquiry] New Inquiry from Website',
      text: [
        'New inquiry received from website',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Architect Email (selected): ${architectEmail}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b2b2b;">
          <h2 style="margin: 0 0 12px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Architect Email (selected):</strong> ${architectEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch {
    return res.status(500).json({ success: false, message: 'Email sending failed (data saved)' });
  }
}

export async function getInquiries(_req, res) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inquiries });
  } catch {
    return res.status(500).json({ success: false, message: 'Database error' });
  }
}
