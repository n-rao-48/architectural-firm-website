
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

## Deployment Setup (Render + Vercel)

### Backend on Render

1. Create a new Web Service from the `backend` folder.
2. Use:
	- Build command: `npm install`
	- Start command: `npm start`
3. Add environment variables in Render dashboard:
	- `PORT=10000` (or leave unset; Render provides this automatically)
	- `MONGO_URI=<your MongoDB Atlas URI>`
	- `CLIENT_ORIGIN=https://your-frontend.vercel.app`
	- `JWT_SECRET=<strong-random-secret>`
	- `JWT_EXPIRES_IN=7d`
	- `ADMIN_EMAIL=<admin email>`
	- `ADMIN_PASSWORD=<admin password>`
	- `CLOUDINARY_CLOUD_NAME=<value>`
	- `CLOUDINARY_API_KEY=<value>`
	- `CLOUDINARY_API_SECRET=<value>`
	- `CLOUDINARY_FOLDER=architecture_firm/projects`
	- `SMTP_SERVICE`, `SMTP_USER`, `SMTP_PASS` and related email vars
4. Deploy and verify health endpoint:
	- `https://<your-render-service>.onrender.com/api/health`

### Frontend on Vercel

1. Import project and set root directory to `frontend`.
2. Build settings:
	- Build command: `npm run build`
	- Output directory: `dist`
3. Add environment variable:
	- `VITE_API_BASE_URL=https://architectural-firm-website-backend.onrender.com`
4. Deploy frontend.

### Important Notes

- If your MongoDB password has special characters like `@`, URL-encode them in URI (for example `@` becomes `%40`).
- After first Vercel deploy, add your final Vercel domain to Render `CLIENT_ORIGIN`.
- This backend also allows Vercel preview URLs (`*.vercel.app`) in CORS.
  