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

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.