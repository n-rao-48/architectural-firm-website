
# Architecture Firm Monorepo

Full-stack monorepo for an architecture and interior design website with a public frontend and an admin panel backed by an Express API.

## Repository Layout

- `frontend/`: Vite + React (TypeScript) application
- `backend/`: Node.js + Express API
- `guidelines/`: project-specific notes and guidance
- `SITE_STRUCTURE.md`: current detailed structure map

## Tech Stack

- Frontend: React, React Router, Vite, Tailwind CSS
- Backend: Express, MySQL/PostgreSQL clients, JWT auth, Cloudinary uploads

## Local Development

### 1. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment variables

- Create `backend/.env` with API/database/cloud settings
- Create `frontend/.env` with frontend runtime variables if needed

### 3. Run frontend

```bash
cd frontend
npm run dev
```

### 4. Run backend

```bash
cd backend
npm run dev
```

## Build

```bash
cd frontend
npm run build
```

Backend currently runs directly through Node (`server.js`) without a separate build step.
  