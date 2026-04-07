import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      default: 'pune',
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      default: 'N/A',
    },
    project_year: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'completed',
    },
    maps_query: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      default: '',
    },
    image_urls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    versionKey: false,
  }
);

const Project = mongoose.model('Project', projectSchema);


// =========================
// CRUD FUNCTIONS
// =========================

export async function getAllProjects() {
  return await Project.find().sort({ created_at: -1 });
}

export async function getProjectById(id) {
  return await Project.findById(id);
}

export async function createProject(project) {
  const created = await Project.create({
    ...project,
    city: project.city || 'pune',
    area: project.area || 'N/A',
    status: project.status || 'completed',
  });
  return created;
}

export async function updateProject(id, updates) {
  return await Project.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
}

export async function deleteProject(id) {
  await Project.findByIdAndDelete(id);
}