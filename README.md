# GEI Website - Global EnviroHealth Initiative

A modern, full-stack website for the Global EnviroHealth Initiative (GEI) built with React, TypeScript, Tailwind CSS, Express, and PostgreSQL. The platform showcases environmental health research, sustainable development projects, and community-led initiatives across multiple countries.

## 🌍 About GEI

Global EnviroHealth Initiative (GEI) is a nonprofit organization committed to creating sustainable solutions that transform communities and protect our planet through innovative programs and collaborative partnerships. We work across continents to address pressing challenges in climate action, maternal & child health, sustainable infrastructure, and economic development.

## ✨ Features

### Public-Facing Features
- **Dynamic Hero Section**: Animated hero with rotating impact stories and real-time statistics
- **Interactive Global Presence Map**: Clickable world map showing office locations with detailed modals
- **Program Areas**: Comprehensive program areas with project counts and detailed descriptions
- **Project Showcase**: Filterable project gallery with pagination, search, and sorting capabilities
- **Publications Library**: Research publications with categories, search, and PDF downloads
- **Faculty Directory**: Meet our team with interactive profiles and credentials
- **Impact Stories**: Community success stories with image galleries
- **Contact Form**: Integrated contact system with SMTP email delivery
- **Google Maps Integration**: Interactive office location with directions

### Admin Features
- **Publications Management**: Add, edit, delete, and categorize research publications
- **Program Areas Management**: Manage program areas with icons, images, and project associations
- **Projects Management**: Full CRUD operations with rich content editor, stakeholders, updates, and budget tracking
- **Project Content Editor**: Markdown-powered content creation with multiple content types
- **File Upload System**: Secure file uploads for PDFs, images, and documents with cloud storage
- **User Authentication**: JWT-based authentication with role-based access control
- **Real-time Statistics**: Dynamic counters showing active projects, countries, and lives impacted

### Technical Features
- **Modern Design**: Clean UI with Framer Motion animations and Lucide icons
- **Responsive Layout**: Mobile-first design optimized for all devices
- **SEO Optimized**: Meta tags, semantic HTML, and proper heading hierarchy
- **Performance**: Lazy loading, image optimization, and code splitting
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Docker Ready**: Production-ready Docker Compose configuration
- **Database Migrations**: Prisma ORM with versioned migrations and seeding

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Hooks & Context
- **Build Tool**: Vite 5
- **UI Components**: Custom components with shadcn/ui patterns

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 5
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer with validation
- **Email**: Nodemailer (SMTP)
- **Security**: Helmet, CORS, express-rate-limit

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (reverse proxy & SSL termination)
- **Process Manager**: PM2 (optional)
- **Deployment**: Production-ready configuration for VPS hosting

## 📁 Project Structure

```
GEI/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── admin/       # Admin panel components
│   │   │   ├── navbar/      # Navigation components
│   │   │   ├── CountUp.tsx  # Animated counter component
│   │   │   ├── Hero.tsx     # Homepage hero section
│   │   │   ├── Contact.tsx  # Contact form component
│   │   │   └── Footer.tsx   # Footer component
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useProjects.ts
│   │   │   ├── useProgramAreas.ts
│   │   │   ├── usePublications.ts
│   │   │   └── useFaculty.ts
│   │   ├── lib/             # Utility functions and API clients
│   │   │   ├── api.ts       # API client configuration
│   │   │   └── programAreasApi.ts
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── OurWorkPage.tsx
│   │   │   ├── ProjectDetailPage.tsx
│   │   │   ├── PublicationsPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx          # Root component
│   ├── public/              # Static assets
│   │   ├── client-1.png     # Partner logos
│   │   └── ...
│   └── package.json
│
├── backend/                 # Express backend application
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── publications.js  # Publications CRUD
│   │   ├── programAreas.js  # Program areas CRUD
│   │   ├── projects.js      # Projects CRUD
│   │   ├── uploads.js       # File upload handling
│   │   ├── stories.js       # Impact stories
│   │   └── faculty.js       # Faculty management
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT authentication
│   │   └── upload.js        # Multer file upload
│   ├── config/              # Configuration files
│   │   └── upload.js        # Upload settings
│   ├── prisma/              # Database schema & migrations
│   │   ├── schema.prisma    # Database schema
│   │   ├── migrations/      # Database migrations
│   │   └── seed.js          # Database seeding
│   └── server.js            # Express server entry point
│
├── docker-compose.prod.yml  # Production Docker config
├── Dockerfile               # Multi-stage Docker build
├── nginx.conf               # Nginx reverse proxy config
├── deploy.sh                # Deployment automation script
├── rebuild.sh               # Quick rebuild script
└── .env                     # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 15+ (or Docker for containerized setup)
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/YourOrg/GEI.git
cd GEI
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Set up environment variables**

Create `.env` file in the root directory:
```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api
FRONTEND_URL=http://localhost:5173

# Production Environment
NODE_ENV=development
PORT=5000

# Database Connection
DATABASE_URL=postgresql://geiuser:geipassword@localhost:5432/gei?schema=public
DB_PASSWORD=geipassword

# JWT Secret for Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# File Upload Settings
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=15728640

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_RECEIVER=contact@geiglobal.org
```

4. **Set up the database**
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed the database with sample data
node backend/prisma/seed.js
```

5. **Start development servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🐳 Docker Deployment (Production)

### Quick Start with Docker Compose

1. **Configure production environment**
```bash
# Update .env with production values
nano .env
```

2. **Build and start services**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

3. **Check service status**
```bash
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

### Manual Deployment Steps

1. **Prepare SSL Certificates**
```bash
# Place your SSL certificates
mkdir -p ssl
cp /path/to/cert.pem ssl/
cp /path/to/key.pem ssl/
```

2. **Build Docker images**
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
```

3. **Run database migrations**
```bash
docker-compose -f docker-compose.prod.yml run --rm app npx prisma migrate deploy
docker-compose -f docker-compose.prod.yml run --rm app npx prisma generate
docker-compose -f docker-compose.prod.yml run --rm app node backend/prisma/seed.js
```

4. **Start all services**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Useful Docker Commands

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f nginx
docker-compose -f docker-compose.prod.yml logs -f db

# Restart services
docker-compose -f docker-compose.prod.yml restart app
docker-compose -f docker-compose.prod.yml restart nginx

# Stop all services
docker-compose -f docker-compose.prod.yml down

# Remove everything including volumes
# WARNING: this deletes the Postgres data volume and will remove database data.
# Only use it if you intentionally want a full reset.
docker-compose -f docker-compose.prod.yml down -v

# Rebuild after code changes
./rebuild.sh
```

## 🔐 Authentication & Admin Access

### Creating Admin Users

1. **Access the database**
```bash
# If using Docker
docker-compose -f docker-compose.prod.yml exec db psql -U geiuser -d gei

# If local PostgreSQL
psql -U geiuser -d gei
```

2. **Create admin user**
```sql
-- Create user with hashed password (use bcrypt to generate hash)
INSERT INTO users (email, password, role, name) 
VALUES ('admin@geiglobal.org', '$2b$10$hashed_password_here', 'admin', 'Admin User');
```

3. **Login at** `https://geiglobal.org/login`

### Admin Panel Routes
- `/admin/publications` - Manage research publications
- `/admin/program-areas` - Manage program areas
- `/admin/projects` - Manage projects and content

## 📡 API Endpoints

### Public Endpoints
```
GET    /api/health                    - Health check
GET    /api/publications              - List all publications
GET    /api/publications/:id          - Get publication details
GET    /api/program-areas             - List program areas
GET    /api/program-areas/:slug       - Get program area by slug
GET    /api/projects                  - List all projects
GET    /api/projects/:slug            - Get project details
GET    /api/stories                   - List impact stories
GET    /api/faculty                   - List faculty members
POST   /api/contact                   - Send contact form email
```

### Protected Endpoints (Require JWT Authentication)
```
POST   /api/auth/login                - User login
POST   /api/auth/register             - User registration
POST   /api/publications              - Create publication
PUT    /api/publications/:id          - Update publication
DELETE /api/publications/:id          - Delete publication
POST   /api/program-areas             - Create program area
PUT    /api/program-areas/:id         - Update program area
DELETE /api/program-areas/:id         - Delete program area
POST   /api/projects                  - Create project
PUT    /api/projects/:id              - Update project
DELETE /api/projects/:id              - Delete project
POST   /api/uploads/image             - Upload image
POST   /api/uploads/pdf               - Upload PDF
```

## 🗄️ Database Schema

Key models in Prisma schema:

- **User** - Authentication and user management
- **Publication** - Research publications and papers
- **PublicationCategory** - Publication categorization
- **ProgramArea** - Main program categories
- **Project** - Individual projects with full details
- **ProjectContent** - Rich content sections for projects
- **ProjectStakeholder** - Project partners and stakeholders
- **ProjectUpdate** - Timeline updates for projects
- **Story** - Impact stories and testimonials
- **Faculty** - Team members and researchers

## 🔧 Configuration

### Environment Variables Reference

#### Frontend Variables (VITE_)
- `VITE_API_URL` - Backend API base URL
- `FRONTEND_URL` - Frontend application URL

#### Backend Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `UPLOAD_DIR` - Directory for file uploads
- `MAX_FILE_SIZE` - Maximum upload size in bytes
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_SECURE` - Use SSL/TLS (true/false)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - Default sender email
- `CONTACT_RECEIVER` - Contact form recipient email

## 📊 Database Management

### Run Migrations
```bash
# Development
npx prisma migrate dev --name migration_name

# Production
npx prisma migrate deploy
```

### Prisma Studio (Database GUI)
```bash
npx prisma studio
```

### Backup Database
```bash
# Docker
docker-compose -f docker-compose.prod.yml exec db pg_dump -U geiuser gei > backup.sql

# Local
pg_dump -U geiuser gei > backup.sql
```

### Restore Database
```bash
# Docker
docker-compose -f docker-compose.prod.yml exec -T db psql -U geiuser gei < backup.sql

# Local
psql -U geiuser gei < backup.sql
```

## 🎨 Customization

### Updating Colors and Theme
Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'base-blue': '#2563eb',
      'analogous-teal': '#14b8a6',
      // Add your custom colors
    }
  }
}
```

### Adding New Program Areas
1. Update `backend/prisma/seed.js` with new program data
2. Run `node backend/prisma/seed.js`
3. Or use the admin panel at `/admin/program-areas`

### Modifying Email Templates
Edit `backend/server.js` in the `/api/contact` route handler

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
```bash
# Check DATABASE_URL format
# Should be: postgresql://user:password@host:port/database?schema=public

# Test connection
docker-compose -f docker-compose.prod.yml exec db psql -U geiuser -d gei -c "SELECT 1;"
```

**2. CORS Errors**
```bash
# Ensure VITE_API_URL in frontend matches backend URL
# Check CORS configuration in backend/server.js
```

**3. File Upload Failures**
```bash
# Check UPLOAD_DIR permissions
chmod -R 755 uploads/

# Verify MAX_FILE_SIZE in .env
```

**4. Images Not Loading**
```bash
# Clear Docker cache and rebuild
docker-compose -f docker-compose.prod.yml down
docker system prune -af
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

**5. SSL Certificate Issues**
```bash
# Verify SSL files exist
ls -la ssl/

# Check Nginx configuration
docker-compose -f docker-compose.prod.yml exec nginx nginx -t
```

### Logs and Debugging

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f nginx
docker-compose -f docker-compose.prod.yml logs -f db

# Enter container shell
docker-compose -f docker-compose.prod.yml exec app sh
docker-compose -f docker-compose.prod.yml exec db bash

# Check container stats
docker stats
```

## 🔒 Security Best Practices

1. **Always change default credentials**
2. **Use strong JWT_SECRET in production**
3. **Enable HTTPS/SSL in production**
4. **Regularly update dependencies**
   ```bash
   npm audit
   npm audit fix
   ```
5. **Use environment-specific .env files**
6. **Never commit .env files to version control**
7. **Implement rate limiting** (already configured)
8. **Regular database backups**
9. **Monitor server logs**
10. **Keep Docker images updated**

## 📈 Performance Optimization

- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: React.lazy() for route-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Database Indexing**: Optimized queries with Prisma
- **Caching**: Nginx caching for static assets
- **CDN**: Consider Cloudflare for global distribution
- **Compression**: Gzip enabled in Nginx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test changes locally before pushing
- Update documentation for new features

## 📝 License

This project is proprietary and confidential. © 2024 Global EnviroHealth Initiative. All rights reserved.

## 📞 Support

For questions or issues:
- **Email**: geiglobal61@gmail.com
- **Phone**: +1 (801) 455-7657
- **Website**: https://geiglobal.org
- **Office**: 2825 E Cottonwood Pkwy Suite 330, Salt Lake City, UT 84121, USA

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All contributors and community members

---

**Built with ❤️ by the GEI Development Team**

For deployment assistance or technical support, contact the development team.