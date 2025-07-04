# 📚 Book Review API

A full-stack web application for managing books and their reviews. Built with modern technologies including Node.js, Express, TypeORM, React, and Vite.

## ✨ Features

- **📖 Book Management**: Add, list, and view books with author information
- **⭐ Review System**: Add and view reviews with ratings (1-5 stars) for each book
- **🔗 RESTful API**: Well-structured endpoints for books and reviews
- **⚡ Interactive Frontend**: Modern React-based UI with real-time updates
- **📚 API Documentation**: Interactive Swagger UI available at `/docs`
- **🧪 Testing**: Jest-based unit tests for API endpoints
- **💾 SQLite Database**: Simple, file-based storage for easy setup
- **🚀 Hot Reload**: Development servers with automatic reloading

## 🏗️ Architecture

```
book-review-api/
├── src/                    # Backend source code
│   ├── controllers/        # API endpoint handlers
│   ├── models/            # TypeORM entity definitions
│   ├── routes/            # Express route definitions
│   ├── database/          # Database configuration
│   ├── cache/             # Redis client (mocked for local dev)
│   ├── docs/              # Swagger API documentation
│   ├── app.ts             # Express app configuration
│   └── server.ts          # Server entry point
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   └── main.tsx       # React entry point
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── tests/                 # Test files
│   └── unit/              # Unit tests
├── db.sqlite              # SQLite database file
├── package.json           # Backend dependencies and scripts
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd book-review-api
   ```

2. **Install all dependencies**:
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Start the development servers**:
   ```bash
   npm run dev
   ```

   This command will:
   - Start the backend server on `http://localhost:3001`
   - Start the frontend server on `http://localhost:5174`
   - Automatically open your browser to the application

### Manual Setup (Alternative)

If you prefer to run servers separately:

**Backend only:**
```bash
npm run dev:backend
# Server runs on http://localhost:3001
```

**Frontend only:**
```bash
npm run dev:frontend
# App runs on http://localhost:5174
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:5174
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/docs
- **Books Endpoint**: http://localhost:3001/books

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/books` | Get all books |
| `POST` | `/books` | Add a new book |
| `GET` | `/books/:id/reviews` | Get reviews for a book |
| `POST` | `/books/:id/reviews` | Add a review to a book |

### Example API Usage

**Add a book:**
```bash
curl -X POST http://localhost:3001/books \
  -H "Content-Type: application/json" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}'
```

**Get all books:**
```bash
curl http://localhost:3001/books
```

**Add a review:**
```bash
curl -X POST http://localhost:3001/books/1/reviews \
  -H "Content-Type: application/json" \
  -d '{"content": "A classic American novel", "rating": 5}'
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The tests include:
- API endpoint testing with Supertest
- Database integration tests
- Unit tests for controllers

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both backend and frontend with auto-open |
| `npm run dev:backend` | Start backend server only |
| `npm run dev:frontend` | Start frontend server only |
| `npm test` | Run test suite |
| `npm start` | Start production server |

### Technology Stack

**Backend:**
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeORM** - Object-Relational Mapping
- **SQLite** - Database
- **Swagger** - API documentation
- **Jest** - Testing framework

**Frontend:**
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client

**Development Tools:**
- **Nodemon** - Auto-restart backend on changes
- **Concurrently** - Run multiple commands
- **Wait-on** - Wait for servers to be ready

## 📁 Project Structure Details

### Backend Structure
```
src/
├── controllers/           # Business logic for API endpoints
│   └── book.controller.ts # Book and review operations
├── models/               # Database entity definitions
│   ├── Book.ts          # Book entity with reviews relationship
│   └── Review.ts        # Review entity with book relationship
├── routes/               # API route definitions
│   └── book.routes.ts   # RESTful routes for books and reviews
├── database/            # Database configuration
│   └── data-source.ts   # TypeORM data source setup
├── cache/               # Caching layer
│   └── redisClient.ts   # Redis client (mocked for local dev)
├── docs/                # API documentation
│   └── swagger.ts       # Swagger configuration
├── app.ts               # Express app setup with middleware
└── server.ts            # Server entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── App.tsx          # Main React component with all UI logic
│   └── main.tsx         # React application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration with proxy setup
└── package.json         # Frontend dependencies
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables (optional):

- `PORT` - Backend server port (default: 3001)
- `DB_PATH` - SQLite database path (default: ./db.sqlite)
- `NODE_ENV` - Environment mode (development/production/test)

### Database

The application uses SQLite for simplicity:
- Database file: `db.sqlite` (auto-created on first run)
- Tables: `book` and `review`
- Automatic schema synchronization enabled

### Caching

Redis caching is implemented but mocked for local development:
- Cache invalidation on book/review updates
- 5-minute cache expiration for book lists
- Graceful fallback to database if cache fails

## 🚀 Deployment

### Production Build

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

### Environment Setup

For production deployment:
1. Set `NODE_ENV=production`
2. Configure a production database (PostgreSQL recommended)
3. Set up proper Redis instance
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes using ports 3001 or 5174
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Database issues:**
- Delete `db.sqlite` to reset the database
- Check file permissions

**Frontend not connecting to backend:**
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.ts`

**Dependencies issues:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

**Happy coding! 📚✨**
