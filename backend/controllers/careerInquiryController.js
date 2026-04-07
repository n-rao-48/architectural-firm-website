import CareerInquiry from '../models/careerInquiryModel.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeSkills(skillsInput) {
  if (Array.isArray(skillsInput)) {
    return skillsInput.map((skill) => String(skill).trim()).filter(Boolean);
  }

  if (typeof skillsInput === 'string' && skillsInput.trim()) {
    return skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
}

export async function createInquiry(req, res) {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const gender = typeof req.body.gender === 'string' ? req.body.gender.trim() : '';
    const state = typeof req.body.state === 'string' ? req.body.state.trim() : '';
    const skills = normalizeSkills(req.body.skills);

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    let age;
    if (req.body.age !== undefined && req.body.age !== null && req.body.age !== '') {
      age = Number(req.body.age);
      if (!Number.isFinite(age) || age <= 0) {
        return res.status(400).json({ message: 'Age must be a valid positive number' });
      }
    }

    let dob;
    if (req.body.dob) {
      const parsedDate = new Date(req.body.dob);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'DOB must be a valid date' });
      }
      dob = parsedDate;
    }

    const inquiry = await CareerInquiry.create({
      name,
      email,
      gender,
      age,
      dob,
      state,
      skills,
    });

    return res.status(201).json(inquiry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid career inquiry payload', error: error.message });
    }
    return res.status(500).json({ message: 'Failed to create career inquiry', error: error.message });
  }
}

export async function getAllInquiries(_req, res) {
  try {
    const inquiries = await CareerInquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch career inquiries', error: error.message });
  }
}
