import { Router } from 'express';
import { createInquiry, getAllInquiries } from '../controllers/careerInquiryController.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', getAllInquiries);

export default router;
