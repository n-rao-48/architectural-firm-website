import { getDbClient, query } from '../config/db.js';

const client = getDbClient();
const memoryProjects = [];
let memoryId = 1;
let ensureSchemaPromise;

const projectSelectColumns = 'id, name, type, city, location, area, project_year, status, maps_query, description, image_url, created_at';

const mysqlColumnDefinitions = {
  city: "city VARCHAR(100) NOT NULL DEFAULT 'pune'",
  area: "area VARCHAR(100) DEFAULT 'N/A'",
  project_year: 'project_year VARCHAR(20)',
  status: "status VARCHAR(20) NOT NULL DEFAULT 'completed'",
  maps_query: 'maps_query VARCHAR(255)',
};

async function ensureProjectSchema() {
  if (client === 'memory') return;

  if (!ensureSchemaPromise) {
    ensureSchemaPromise = (async () => {
      if (client === 'postgres') {
        await query("ALTER TABLE projects ADD COLUMN IF NOT EXISTS city VARCHAR(100) NOT NULL DEFAULT 'pune'");
        await query("ALTER TABLE projects ADD COLUMN IF NOT EXISTS area VARCHAR(100) DEFAULT 'N/A'");
        await query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_year VARCHAR(20)');
        await query("ALTER TABLE projects ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'completed'");
        await query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS maps_query VARCHAR(255)');
        return;
      }

      for (const [columnName, definition] of Object.entries(mysqlColumnDefinitions)) {
        const rows = await query(
          `SELECT COUNT(*) AS count FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = ?`,
          [columnName],
        );
        const exists = Number(rows?.[0]?.count || 0) > 0;
        if (!exists) {
          await query(`ALTER TABLE projects ADD COLUMN ${definition}`);
        }
      }
    })();
  }

  await ensureSchemaPromise;
}

function placeholders(startIndex, count) {
  return Array.from({ length: count }, (_, i) => `$${startIndex + i}`).join(', ');
}

export async function getAllProjects() {
  await ensureProjectSchema();

  if (client === 'memory') {
    return [...memoryProjects].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  if (client === 'postgres') {
    return query(`SELECT ${projectSelectColumns} FROM projects ORDER BY created_at DESC`);
  }

  return query(`SELECT ${projectSelectColumns} FROM projects ORDER BY created_at DESC`);
}

export async function getProjectById(id) {
  await ensureProjectSchema();

  if (client === 'memory') {
    return memoryProjects.find((project) => project.id === Number(id)) || null;
  }

  if (client === 'postgres') {
    const rows = await query(`SELECT ${projectSelectColumns} FROM projects WHERE id = $1 LIMIT 1`, [id]);
    return rows[0] || null;
  }

  const rows = await query(`SELECT ${projectSelectColumns} FROM projects WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createProject(project) {
  await ensureProjectSchema();

  if (client === 'memory') {
    const created = {
      id: memoryId,
      name: project.name,
      type: project.type,
      city: project.city || 'pune',
      location: project.location,
      area: project.area || 'N/A',
      project_year: project.project_year || null,
      status: project.status || 'completed',
      maps_query: project.maps_query || null,
      description: project.description,
      image_url: project.image_url,
      created_at: new Date().toISOString(),
    };
    memoryId += 1;
    memoryProjects.unshift(created);
    return created;
  }

  if (client === 'postgres') {
    const rows = await query(
      `INSERT INTO projects (name, type, city, location, area, project_year, status, maps_query, description, image_url) VALUES (${placeholders(1, 10)}) RETURNING ${projectSelectColumns}`,
      [
        project.name,
        project.type,
        project.city || 'pune',
        project.location,
        project.area || 'N/A',
        project.project_year || null,
        project.status || 'completed',
        project.maps_query || null,
        project.description,
        project.image_url,
      ],
    );
    return rows[0];
  }

  const result = await query(
    'INSERT INTO projects (name, type, city, location, area, project_year, status, maps_query, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      project.name,
      project.type,
      project.city || 'pune',
      project.location,
      project.area || 'N/A',
      project.project_year || null,
      project.status || 'completed',
      project.maps_query || null,
      project.description,
      project.image_url,
    ],
  );

  const insertedId = result.insertId;
  return getProjectById(insertedId);
}

export async function updateProject(id, updates) {
  await ensureProjectSchema();

  if (client === 'memory') {
    const index = memoryProjects.findIndex((project) => project.id === Number(id));
    if (index === -1) return null;

    memoryProjects[index] = {
      ...memoryProjects[index],
      ...updates,
    };
    return memoryProjects[index];
  }

  if (client === 'postgres') {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index += 1;
    }

    if (fields.length === 0) {
      return getProjectById(id);
    }

    values.push(id);

    const rows = await query(
      `UPDATE projects SET ${fields.join(', ')} WHERE id = $${index} RETURNING ${projectSelectColumns}`,
      values,
    );

    return rows[0] || null;
  }

  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    return getProjectById(id);
  }

  values.push(id);

  await query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
  return getProjectById(id);
}

export async function deleteProject(id) {
  if (client === 'memory') {
    const index = memoryProjects.findIndex((project) => project.id === Number(id));
    if (index !== -1) {
      memoryProjects.splice(index, 1);
    }
    return;
  }

  if (client === 'postgres') {
    await query('DELETE FROM projects WHERE id = $1', [id]);
    return;
  }

  await query('DELETE FROM projects WHERE id = ?', [id]);
}
