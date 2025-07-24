# GEI Website

A modern, responsive website for the Global Environmental Initiative (GEI) built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with smooth animations and micro-interactions
- **Responsive Layout**: Optimized for all device sizes from mobile to desktop
- **Content Management**: Admin panels for managing publications, program areas, projects, stories, and faculty
- **Database Integration**: Powered by Supabase for real-time data management
- **File Uploads**: Support for PDF documents and images with secure cloud storage
- **Search & Filtering**: Advanced search and filtering capabilities across all content
- **SEO Optimized**: Built with SEO best practices and meta tag management

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage), Node.js/Express
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **ORM**: Prisma
- **Deployment**: Docker, Nginx

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
Apply the SQL migrations in the `prisma/migrations` folder to your database.

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/           # Admin panel components (Publications, Program Areas, Projects, Stories, Faculty, File/Image Upload)
│   ├── navbar/          # Navigation components
│   ├── projects/        # Project-specific components
│   ├── layout/          # Layout wrappers (AdminRootLayout, PublicLayout)
│   ├── ui/              # Reusable UI elements (buttons, carousels, logos)
│   └── common/          # Shared/common UI (e.g., LoadingSpinner)
├── hooks/               # Custom React hooks (useProjects, usePublications, useStories, etc.)
├── lib/                 # Utility functions and API clients
├── pages/               # Page components (Home, About, Our Work, Projects, Publications, Admin, etc.)
│   └── admin/           # Admin page routes (e.g., FacultyAdminPage)
├── types/               # TypeScript type definitions
├── constants/           # Application constants (navigation, app config)
├── data/                # Static data (if any)
└── index.css            # Global styles
```

## Admin Features

The application includes comprehensive admin panels for:

- **Publications Management**: Add, edit, and organize research publications
- **Program Areas Management**: Manage program areas and their associated projects
- **Projects Management**: Create and manage individual projects with custom fields
- **Stories Management**: Add and manage stories
- **Faculty Management**: Add and manage faculty members
- **File Management**: Upload and manage PDFs and images

Access admin panels at:
- `/admin/publications`
- `/admin/program-areas`
- `/admin/projects`
- `/admin/stories`
- `/admin/faculty`

## Authentication

The application uses Supabase Authentication. To set up admin access:

1. Create user accounts through Supabase Auth
2. Set up user roles in your database
3. Configure Row Level Security (RLS) policies
4. Update the `isAdmin()` function in `src/lib/auth.ts`

---

## Backend Setup

The backend is a Node.js/Express server located in the `backend/` directory. It provides REST API endpoints for authentication, publications, program areas, projects, stories, faculty, and file uploads.

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
   node backend/prisma/seed.js
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

- The database schema is defined in `backend/prisma/schema.prisma`.
- Migrations are in `backend/prisma/migrations/`.
- Seed data is in `backend/prisma/seed.js`.
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
- `GET    /api/stories` — List stories
- `GET    /api/faculty` — List faculty
- `POST   /api/stories` — Create story (admin)
- `POST   /api/faculty` — Create faculty (admin)
- `GET    /api/health` — Health check
- ...and more (see `backend/routes/` for full list)

## Admin Panels
- `/admin/publications` — Manage publications
- `/admin/program-areas` — Manage program areas
- `/admin/projects` — Manage projects
- `/admin/stories` — Manage stories
- `/admin/faculty` — Manage faculty

---

## Custom Hooks & UI Components

- **Custom Hooks**: Located in `src/hooks/` (e.g., `useProjects`, `usePublications`, `useStories`, `useFaculty`, `useCategories`, `useProgramAreas`)
- **UI Components**: Located in `src/components/ui/` (e.g., `button`, `carousel`, `logos3`)
- **Layout Components**: Located in `src/components/layout/` (e.g., `AdminRootLayout`, `PublicLayout`)
- **Common Components**: Located in `src/components/common/` (e.g., `LoadingSpinner`)

---

## Deployment

- The project supports deployment using Docker and Nginx for production environments.
- For detailed deployment steps, SSL setup, backups, and monitoring, **see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)**.
- Example deployment stack: Hostinger VPS, Docker Compose, Nginx reverse proxy, PostgreSQL, Certbot for SSL.
- Use `deploy.sh` for automated deployment and `backup.sh` for database backups.

---

## Troubleshooting
- Ensure all environment variables are set correctly
- Check database connection and run migrations
- Use `npm run dev:server` for backend debugging
- Use Nginx or Caddy for production reverse proxy
- For Docker-specific and advanced troubleshooting, see `DEPLOYMENT_GUIDE.md`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.