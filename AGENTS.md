# GEI Website — Agent Quickstart

## 👀 First look

- **Root**: `/home/shakya/GEI` — monorepo-style with `backend/` and `src/` (frontend)
- **Package manifest**: `package.json` at root (npm workspaces not used; deps installed at root + in `backend/`)
- **Frontend**: Vite + React in `src/`, built with `vite`, dev server on port **5173**
- **Backend**: Express on port **5000**, Prisma ORM, routes in `backend/routes/`
- **Database**: PostgreSQL via Docker Compose (service `db`, port 5432)
- **Key env**: `.env` at root (required). See `README.md` for variables.

## 🛠️ Essential commands

| Action | Command |
|---|---|
| Install all deps | `cd /home/shakya/GEI && npm install` (also installs `backend/node_modules` and `src/node_modules`) |
| Start backend | `cd /home/shakya/GEI/backend && node server.js` (port 5000) |
| Start frontend | `cd /home/shakya/GEI && npm run dev` (port 5173, also watches) |
| DB migrations | `cd /home/shakya/GEI && npx prisma migrate deploy` (must have DB running) |
| Generate Prisma client | `cd /home/shakya/GEI && npx prisma generate` |
| Seed DB | `cd /home/shakya/GEI && node prisma/seed.js` |
| Run lint | `cd /home/shakya/GEI && npm run lint` |
| Build frontend | `cd /home/shakya/GEI && npm run build` |
| Preview build | `cd /home/shakya/GEI && npm run preview` |

## ⚠️ Common gotchas

- **`.env` missing** — the app will crash on startup if `DATABASE_URL` or `JWT_SECRET` not set. Root `.env` is the source of truth.
- **Prisma client import path** — routes in `backend/routes/` import `{ PrismaClient } from "@prisma/client"` NOT `../prisma/client.js`. Seven files were fixed for this in this session.
- **DB must be up first** — `docker-compose up -d db` before running migrations/seed.
- **Two-node dev setup** — backend (Terminal 1) and frontend (Terminal 2) must both run. Vite warns if port 5173 is in use.
- **Docker ports** — `docker-compose.yml` maps 5001→5000 (app) and 5432→5432 (db). The `docker-compose.prod.yml` is for production deployment.

## 📁 Project structure

```
GEI/
├── backend/          # Express + Prisma
│   ├── server.js     # Entry point (port 5000)
│   ├── routes/       # API handlers (import from @prisma/client)
│   ├── prisma/       # Schema & migrations
│   └── config/
├── src/              # Frontend (React + Vite)
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite.config.ts
│   └── ... (components, hooks, pages, lib)
├── docker-compose.yml   # Dev: db + app
├── docker-compose.prod.yml  # Production deployment
└── .env              # Required — do not commit
```

## 🔧 Verification (quick check)

```bash
# Backend health
curl http://localhost:5000/api/health
# → {"status":"ok","message":"Server is running"}

# Frontend (after dev server starts)
open http://localhost:5173
```