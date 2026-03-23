# Architecture Firm - Current Site Structure

This document reflects the current repository layout and active route map.

## Monorepo Layout

```text
Architecture Firm/
|- backend/
|  |- config/
|  |- controllers/
|  |- middleware/
|  |- models/
|  |- routes/
|  |- utils/
|  |- package.json
|  |- schema.sql
|  \- server.js
|- frontend/
|  |- public/
|  |- src/
|  |  |- app/
|  |  |  |- admin/
|  |  |  |- components/
|  |  |  |- contexts/
|  |  |  |- data/
|  |  |  |- lib/
|  |  |  |- pages/
|  |  |  |- App.tsx
|  |  |  \- routes.tsx
|  |  |- styles/
|  |  \- types/
|  |- index.html
|  |- package.json
|  \- vite.config.ts
|- guidelines/
|- ATTRIBUTIONS.md
|- README.md
\- SITE_STRUCTURE.md
```

## Frontend Route Map

### Public routes

- `/` -> Home
- `/inquiry` -> Inquiry page
- `/apply` -> Application page
- `/team` -> Profile page
- `/projects` -> Projects gallery
- `/projects/ongoing` -> Ongoing projects
- `/projects/pune` -> Pune projects
- `/projects/nashik` -> Nashik projects
- `/projects/ahilyanagar` -> Ahilyanagar projects
- `/projects/sambhajinagar` -> Sambhajinagar projects
- `/services` -> Services page
- `/testimonials` -> Testimonials page

### Admin routes

- `/admin` -> redirect to `/admin/login`
- `/admin/login` -> Admin login
- `/admin/dashboard` -> Dashboard
- `/admin/add-project` -> Add project
- `/admin/manage-projects` -> Manage projects
- `/admin/edit-project/:id` -> Edit project
- `/admin/uploads` -> Upload management

## Backend Modules

- `routes/authRoutes.js` and `controllers/authController.js` for auth flows
- `routes/projectRoutes.js` and `controllers/projectController.js` for project APIs
- `middleware/authMiddleware.js` for protected endpoints
- `middleware/uploadMiddleware.js` for upload handling
- `config/db.js` and `config/cloudinary.js` for infrastructure configuration

## Notes

- Frontend build output is `frontend/dist/`.
- Backend runs as Node ESM (`server.js`) with no separate dist build by default.
- Environment files are expected in `backend/.env` and `frontend/.env`.
