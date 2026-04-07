import { Router } from 'express';
import { getInquiries, sendEmail } from '../controllers/emailController.js';

const router = Router();

router.post('/', sendEmail);
router.get('/inquiries', getInquiries);

export default router;
