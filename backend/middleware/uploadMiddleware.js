import multer from 'multer';

const allowedMimeTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/svg+xml',
]);

const allowedExtensions = new Set(['.png', '.jpeg', '.jpg', '.pneg']);

function hasAllowedExtension(fileName = '') {
  const lower = fileName.toLowerCase();
  return Array.from(allowedExtensions).some((extension) => lower.endsWith(extension));
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (allowedMimeTypes.has(file.mimetype) || hasAllowedExtension(file.originalname)) {
      callback(null, true);
      return;
    }

    callback(new Error('Only image files are allowed (.png, .jpeg, .jpg, .pneg).'));
  },
});

export default upload;
