import { Router } from 'express';
import {
    createProjectHandler,
    deleteProjectHandler,
    getProject,
    listProjects,
    updateProjectHandler,
    uploadImageHandler,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', protect, upload.any(), createProjectHandler);
router.put('/:id', protect, upload.any(), updateProjectHandler);
router.delete('/:id', protect, deleteProjectHandler);
router.post('/upload', protect, upload.single('image'), uploadImageHandler);

export default router;
