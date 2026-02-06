<div align="center">

# Liminal - Full-Stack Blogging Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Frontend Demo](https://liminal-official.vercel.app) • [Backend API](https://liminal-server.vercel.app) • [Documentation](#) • [Report Bug](https://github.com/zahid-official/practice-17-liminal/issues)

</div>

---

## Overview

Liminal is a modern, full-stack blogging and content management platform built as a monorepo architecture. The project demonstrates enterprise-level development practices with separate frontend and backend deployments, comprehensive CRUD operations, user authentication, and rich content management capabilities.

**Architecture Highlights:**
- Monorepo structure with isolated frontend and backend codebases
- RESTful API architecture for scalable backend services
- Server-side rendering and static generation with Next.js
- Real-time content updates and seamless user experience
- Multi-branch development workflow for organized collaboration

---

## Tech Stack

### Frontend (`liminal-frontend`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with SSR/SSG | ^15.x |
| **React** | UI library | ^18.x |
| **Tailwind CSS** | Utility-first styling | ^3.x |
| **Axios** | HTTP client | ^1.x |
| **React Hook Form** | Form management | ^7.x |
| **React Quill / TipTap** | Rich text editor | Latest |

**Deployment:** Vercel ([liminal-official.vercel.app](https://liminal-official.vercel.app))

### Backend (`liminal-backend`)

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | ^20.x |
| **Express.js** | Web framework | ^4.x |
| **MongoDB** | NoSQL database | Latest |
| **Mongoose** | ODM for MongoDB | ^8.x |
| **JWT** | Authentication tokens | ^9.x |
| **bcrypt** | Password hashing | ^5.x |

**Deployment:** Vercel ([liminal-server.vercel.app](https://liminal-server.vercel.app))

---

## Repository Structure

```
practice-17-liminal/
│
├── liminal-frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── (auth)/      # Authentication routes
│   │   │   ├── blog/        # Blog pages
│   │   │   ├── profile/     # User profile
│   │   │   ├── api/         # Client-side API utils
│   │   │   └── layout.js
│   │   ├── components/       # React components
│   │   │   ├── shared/      # Reusable components
│   │   │   ├── blog/        # Blog-specific components
│   │   │   └── editor/      # Content editor
│   │   ├── lib/             # Utilities and helpers
│   │   ├── hooks/           # Custom React hooks
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── liminal-backend/          # Express.js backend API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── postController.js
│   │   │   ├── userController.js
│   │   │   └── commentController.js
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   ├── Comment.js
│   │   │   └── Category.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.js
│   │   │   ├── posts.js
│   │   │   ├── users.js
│   │   │   └── comments.js
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── validator.js
│   │   │   └── errorHandler.js
│   │   ├── config/          # Configuration files
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   └── utils/           # Helper functions
│   ├── package.json
│   ├── vercel.json
│   └── index.js
│
└── README.md                # Project documentation
```

---

## Features

### Core Functionality

**Content Management**
- Create, read, update, and delete blog posts
- Rich text editor with formatting options
- Image upload and media management
- Draft and publish workflow
- Post categorization and tagging
- SEO-optimized content structure

**User Authentication**
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints
- User profile management
- Session persistence

**Blog Features**
- Responsive blog listing with pagination
- Individual post pages with dynamic routing
- Comment system for user engagement
- Author profiles and bio pages
- Search and filter functionality
- Related posts suggestions

**Content Interaction**
- Like/reaction system
- Comment and reply threads
- Social sharing capabilities
- Bookmark/save posts
- Reading time estimates
- View count tracking

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
GET    /api/auth/me                # Get current user
PUT    /api/auth/update-profile    # Update user profile
```

### Posts
```
GET    /api/posts                  # Get all posts (with pagination)
GET    /api/posts/:id              # Get single post
POST   /api/posts                  # Create new post (protected)
PUT    /api/posts/:id              # Update post (protected)
DELETE /api/posts/:id              # Delete post (protected)
GET    /api/posts/user/:userId     # Get posts by user
GET    /api/posts/category/:cat    # Get posts by category
```

### Comments
```
GET    /api/comments/:postId       # Get comments for post
POST   /api/comments/:postId       # Add comment (protected)
PUT    /api/comments/:id           # Update comment (protected)
DELETE /api/comments/:id           # Delete comment (protected)
```

### Users
```
GET    /api/users/:id              # Get user profile
PUT    /api/users/:id              # Update user (protected)
GET    /api/users/:id/posts        # Get user's posts
```

---

## Development Workflow

### Branch Strategy

This project uses a **three-branch workflow**:

```
main          # Production-ready code
├── develop   # Integration branch for features
└── feature/* # Individual feature branches
```

**Branch Purposes:**
- `main` - Stable, production-deployed code
- `develop` - Active development and feature integration
- `feature/*` - Individual features and bug fixes

**Workflow:**
1. Create feature branch from `develop`
2. Develop and test feature
3. Merge feature into `develop`
4. Test integrated features in `develop`
5. Merge `develop` into `main` for production release

---

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://liminal-server.vercel.app
NEXT_PUBLIC_APP_URL=https://liminal-official.vercel.app
```

### Backend (.env)
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/liminal

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=production

# CORS
ALLOWED_ORIGINS=https://liminal-official.vercel.app,http://localhost:3000
```

---

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique, required),
  password: String (hashed),
  bio: String,
  avatar: String,
  role: ['user', 'admin'],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  featuredImage: String,
  author: ObjectId (ref: 'User'),
  category: String,
  tags: [String],
  status: ['draft', 'published'],
  views: Number,
  likes: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  post: ObjectId (ref: 'Post'),
  author: ObjectId (ref: 'User'),
  content: String (required),
  parentComment: ObjectId (ref: 'Comment'),
  likes: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Key Features Implementation

### Authentication Flow
```
1. User submits registration form
2. Backend validates and hashes password
3. User document created in MongoDB
4. JWT token generated and returned
5. Frontend stores token in localStorage
6. Token sent in Authorization header for protected requests
7. Backend middleware verifies token
8. Request proceeds to protected route
```

### Content Creation Flow
```
1. User writes post in rich text editor
2. Image upload to cloud storage (if applicable)
3. Post data sent to backend API
4. Backend validates and saves to MongoDB
5. Post appears in user's dashboard
6. Published posts visible on blog listing
7. SEO metadata generated for post page
```

---

## Security Measures

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication with expiration
- Protected API routes with auth middleware
- Input validation and sanitization
- CORS configuration for allowed origins
- MongoDB injection prevention with Mongoose
- XSS protection in content rendering
- Rate limiting on API endpoints

---

## Performance Optimizations

### Frontend
- Next.js automatic code splitting
- Image optimization with Next/Image
- Static generation for blog posts (ISR)
- Client-side caching with SWR
- Lazy loading for components
- Debounced search functionality

### Backend
- MongoDB indexing on frequently queried fields
- Pagination for large datasets
- Response compression with gzip
- Connection pooling for database
- Efficient query population
- Caching strategy for static content

---

## Deployment

### Frontend (Vercel)
```bash
# Automatically deployed from main branch
# Build command: npm run build
# Output directory: .next
```

### Backend (Vercel)
```bash
# Serverless functions deployment
# Entry file: index.js
# Configured via vercel.json
```

**Continuous Deployment:**
- Automatic deployments on push to `main`
- Preview deployments for pull requests
- Environment variables configured in Vercel dashboard

---

## Development Setup

### Prerequisites
- Node.js 20.x or higher
- MongoDB (local or Atlas)
- Git

### Frontend Installation
```bash
cd liminal-frontend
npm install
npm run dev
```

### Backend Installation
```bash
cd liminal-backend
npm install
npm run dev
```

---

## Future Enhancements

- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] Advanced search with filters
- [ ] User following system
- [ ] Newsletter subscription
- [ ] Content recommendation algorithm
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)
- [ ] Analytics dashboard for authors
- [ ] Content moderation system
- [ ] API rate limiting
- [ ] GraphQL API option
- [ ] Real-time notifications

---

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/zahid-official">
        <img src="https://github.com/zahid-official.png" width="100px;" alt="Zahidul Islam"/>
        <br />
        <sub><b>Zahidul Islam</b></sub>
      </a>
      <br />
      <sub>Full-Stack Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/walid-official">
        <img src="https://github.com/walid-official.png" width="100px;" alt="Walid Hasan"/>
        <br />
        <sub><b>Walid Hasan</b></sub>
      </a>
      <br />
      <sub>Full-Stack Developer</sub>
    </td>
  </tr>
</table>

---

## License

This project is developed for educational and portfolio purposes.

---

<div align="center">

**[Frontend](https://liminal-official.vercel.app)** • **[Backend API](https://liminal-server.vercel.app)** • **[Report Issues](https://github.com/zahid-official/practice-17-liminal/issues)** • **[Contributors](https://github.com/zahid-official/practice-17-liminal/graphs/contributors)**

Built with passion by Team Liminal

</div>
