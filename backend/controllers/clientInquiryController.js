import ClientInquiry from '../models/clientInquiryModel.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createInquiry(req, res) {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const phone = typeof req.body.phone === 'string' ? req.body.phone.trim() : '';
    const projectType = typeof req.body.projectType === 'string' ? req.body.projectType.trim() : '';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const inquiry = await ClientInquiry.create({
      name,
      email,
      phone,
      projectType,
      message,
    });

    return res.status(201).json(inquiry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid client inquiry payload', error: error.message });
    }
    return res.status(500).json({ message: 'Failed to create client inquiry', error: error.message });
  }
}

export async function getAllInquiries(_req, res) {
  try {
    const inquiries = await ClientInquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch client inquiries', error: error.message });
  }
}
