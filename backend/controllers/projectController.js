import cloudinary from '../config/cloudinary.js';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from '../models/projectModel.js';


// =========================
// CLOUDINARY UPLOAD
// =========================
function uploadToCloudinary(fileBuffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
}


// =========================
// FILE HANDLING
// =========================
function getIncomingImageFiles(req) {
  if (Array.isArray(req.files)) return req.files;

  const filesFromArrayField = Array.isArray(req.files?.images) ? req.files.images : [];
  const filesFromLegacyField = Array.isArray(req.files?.image) ? req.files.image : [];
  const singleFile = req.file ? [req.file] : [];

  return [...filesFromArrayField, ...filesFromLegacyField, ...singleFile];
}


// =========================
// CONTROLLERS
// =========================

export async function listProjects(req, res) {
  try {
    const projects = await getAllProjects();
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch projects',
      error: error.message,
    });
  }
}


export async function getProject(req, res) {
  try {
    const project = await getProjectById(req.params.id); // ✅ FIXED (no Number)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch project',
      error: error.message,
    });
  }
}


export async function createProjectHandler(req, res) {
  try {
    const incomingFiles = getIncomingImageFiles(req);
    const uploadedUrls = [];

    for (const file of incomingFiles) {
      const uploadResult = await uploadToCloudinary(
        file.buffer,
        process.env.CLOUDINARY_FOLDER || 'architecture_firm/projects'
      );
      uploadedUrls.push(uploadResult.secure_url);
    }

    const project = await createProject({
      name: req.body.name,
      type: req.body.type,
      city: req.body.city,
      location: req.body.location,
      area: req.body.area,
      project_year: req.body.project_year,
      status: req.body.status,
      maps_query: req.body.maps_query,
      description: req.body.description,
      image_url: uploadedUrls[0] || '',
      image_urls: uploadedUrls, // ✅ store as array (NOT string)
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create project',
      error: error.message,
    });
  }
}


export async function updateProjectHandler(req, res) {
  try {
    const projectId = req.params.id; // ✅ FIXED

    const existing = await getProjectById(projectId);
    if (!existing) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updates = {
      name: req.body.name,
      type: req.body.type,
      city: req.body.city,
      location: req.body.location,
      area: req.body.area,
      project_year: req.body.project_year,
      status: req.body.status,
      maps_query: req.body.maps_query,
      description: req.body.description,
    };

    const incomingFiles = getIncomingImageFiles(req);

    if (incomingFiles.length) {
      const uploadedUrls = [];

      for (const file of incomingFiles) {
        const uploadResult = await uploadToCloudinary(
          file.buffer,
          process.env.CLOUDINARY_FOLDER || 'architecture_firm/projects'
        );
        uploadedUrls.push(uploadResult.secure_url);
      }

      updates.image_url = uploadedUrls[0];
      updates.image_urls = uploadedUrls; // ✅ array
    }

    // remove undefined / empty fields
    const sanitizedUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    const updated = await updateProject(projectId, sanitizedUpdates);

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update project',
      error: error.message,
    });
  }
}


export async function deleteProjectHandler(req, res) {
  try {
    await deleteProject(req.params.id); // ✅ FIXED
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete project',
      error: error.message,
    });
  }
}


export async function uploadImageHandler(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      process.env.CLOUDINARY_FOLDER || 'architecture_firm/projects'
    );

    return res.json({
      image_url: uploadResult.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Image upload failed',
      error: error.message,
    });
  }
}