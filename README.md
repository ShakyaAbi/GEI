# GEI Website

A modern, responsive website for the Global Environmental Initiative (GEI) built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with smooth animations and micro-interactions
- **Responsive Layout**: Optimized for all device sizes from mobile to desktop
- **Content Management**: Admin panels for managing publications, program areas, and projects
- **Database Integration**: Powered by Supabase for real-time data management
- **File Uploads**: Support for PDF documents and images with secure cloud storage
- **Search & Filtering**: Advanced search and filtering capabilities across all content
- **SEO Optimized**: Built with SEO best practices and meta tag management

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gei-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
Apply the SQL migrations in the `supabase/migrations` folder to your Supabase project.

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin panel components
│   ├── navbar/         # Navigation components
│   └── projects/       # Project-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API clients
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## Admin Features

The application includes comprehensive admin panels for:

- **Publications Management**: Add, edit, and organize research publications
- **Program Areas Management**: Manage program areas and their associated projects
- **Projects Management**: Create and manage individual projects with custom fields
- **File Management**: Upload and manage PDFs and images

Access admin panels at:
- `/admin/publications`
- `/admin/program-areas`

## Authentication

The application uses Supabase Authentication. To set up admin access:

1. Create user accounts through Supabase Auth
2. Set up user roles in your database
3. Configure Row Level Security (RLS) policies
4. Update the `isAdmin()` function in `src/lib/auth.ts`

---

## Backend Setup

The backend is a Node.js/Express server located in the `backend/` directory. It provides REST API endpoints for authentication, publications, program areas, projects, and file uploads.

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (local or cloud, e.g., Hostinger, Supabase, or other)

### Installation & Running
1. Install dependencies (from project root):
   ```bash
   npm install
   ```
2. Set up backend environment variables:
   - Create a `.env` file in the project root or `backend/` directory with:
     ```env
     PORT=5000
     DATABASE_URL=your_postgres_connection_url
     JWT_SECRET=your_jwt_secret
     UPLOAD_DIR=uploads
     ```
3. Run database migrations and seed (from project root):
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   node prisma/seed.js
   ```
4. Start the backend server:
   ```bash
   npm run server
   # or for development with hot reload:
   npm run dev:server
   ```

The backend will be available at `http://localhost:5000` by default.

---

## Database Setup

- The database schema is defined in `prisma/schema.prisma`.
- Migrations are in `prisma/migrations/`.
- Seed data is in `prisma/seed.js`.
- You can use any PostgreSQL instance (local, Supabase, or Hostinger’s managed DB).

---

## Environment Variables

### Frontend (`.env` in root):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (`.env` in root or backend/):
```
PORT=5000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret
UPLOAD_DIR=uploads
```

---

## API Endpoints

- `POST   /api/auth/login` — User login
- `POST   /api/auth/register` — User registration
- `GET    /api/publications` — List publications
- `GET    /api/program-areas` — List program areas
- `GET    /api/projects` — List projects
- `POST   /api/projects` — Create project (admin)
- `GET    /api/health` — Health check
- ...and more (see `backend/routes/` for full list)

## Admin Panels
- `/admin/publications` — Manage publications
- `/admin/program-areas` — Manage program areas
- `/admin/projects` — Manage projects

---

## Deployment to Hostinger (VPS)

### 1. Prepare your VPS
- Deploy an Ubuntu server (Hostinger VPS panel)
- SSH into your VPS
- Install Node.js, npm, and PostgreSQL:
  ```bash
  sudo apt update && sudo apt install nodejs npm postgresql
  ```
- (Optional) Install Nginx for reverse proxy

### 2. Clone your repository
```bash
git clone https://github.com/ShakyaAbi/GEI.git
cd GEI
```

### 3. Set up environment variables
- Create `.env` files as described above for both frontend and backend

### 4. Install dependencies and build frontend
```bash
npm install
npm run build
```

### 5. Set up the database
- Create a PostgreSQL database and user
- Update `DATABASE_URL` in your `.env`
- Run migrations and seed:
  ```bash
  npx prisma migrate deploy
  npx prisma generate
  node prisma/seed.js
  ```

### 6. Start the backend server
```bash
npm run server
```

### 7. Serve the frontend
- You can use Nginx or serve static files with a Node.js static server (e.g., `serve`)
- Example Nginx config:
  - Serve `dist/` as static files
  - Proxy `/api` requests to backend server

### 8. (Optional) Use PM2 for process management
```bash
npm install -g pm2
pm2 start backend/server.js --name gei-backend
pm2 start npx --name gei-frontend -- serve -s dist
pm2 save
```

---

## Notes for Hostinger Shared Hosting
- Node.js/Express is not supported on shared hosting. Use VPS or Docker hosting for full-stack deployment.
- For static frontend only, upload the `dist/` folder to Hostinger’s static file manager.

---

## Troubleshooting
- Ensure all environment variables are set correctly
- Check database connection and run migrations
- Use `npm run dev:server` for backend debugging
- Use Nginx or Caddy for production reverse proxy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.