import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const configuredEmail = process.env.ADMIN_EMAIL || 'admin@bhoomiconstruction.com';
  const configuredPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  const allowedEmails = [configuredEmail.toLowerCase(), 'admin@bhoomiconstruction.com'];
  const emailMatch = allowedEmails.includes(email.toLowerCase());
  let passwordMatch = false;

  if (configuredHash) {
    passwordMatch = await bcrypt.compare(password, configuredHash);
  } else {
    passwordMatch = password === configuredPassword;
  }

  if (!emailMatch || !passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ email: configuredEmail, role: 'admin' });

  return res.json({
    token,
    admin: { email: configuredEmail },
  });
}
