import cloudinary from '../config/cloudinary.js';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../models/projectModel.js';

function uploadToCloudinary(fileBuffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      },
    );

    stream.end(fileBuffer);
  });
}

export async function listProjects(req, res) {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
}

export async function getProject(req, res) {
  try {
    const project = await getProjectById(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
}

export async function createProjectHandler(req, res) {
  try {
    let imageUrl = '';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, process.env.CLOUDINARY_FOLDER || 'architecture-firm/projects');
      imageUrl = uploadResult.secure_url;
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
      image_url: imageUrl,
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
}

export async function updateProjectHandler(req, res) {
  try {
    const projectId = Number(req.params.id);
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

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, process.env.CLOUDINARY_FOLDER || 'architecture-firm/projects');
      updates.image_url = uploadResult.secure_url;
    }

    const sanitizedUpdates = Object.fromEntries(Object.entries(updates).filter(([, value]) => value !== undefined && value !== ''));
    const updated = await updateProject(projectId, sanitizedUpdates);

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
}

export async function deleteProjectHandler(req, res) {
  try {
    await deleteProject(Number(req.params.id));
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
}

export async function uploadImageHandler(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer, process.env.CLOUDINARY_FOLDER || 'architecture-firm/projects');
    return res.json({ image_url: uploadResult.secure_url });
  } catch (error) {
    return res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
}
