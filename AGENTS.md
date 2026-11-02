# FocusNexa - Project Guide

## Project Overview
FocusNexa is an AI-powered study platform with a MERN stack (MongoDB, Express, React, Node.js) architecture.

## Project Structure
- `backend/` - Express.js API server
- `frontend/` - React + Vite frontend application
- `frontend/src/` - React source code
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/src/services/` - API service layer
- `frontend/src/context/` - React context providers

## Setup & Configuration

### Environment Variables

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/focusnexa
JWT_SECRET=focusnexa_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRE=7d
GEMINI_API_KEY=
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=/api
```

### Running the Application

**Start Backend:**
```bash
cd backend
npm run dev  # Uses nodemon for hot reload
# or
npm start   # Production mode
```

**Start Frontend:**
```bash
cd frontend
npm run dev  # Vite dev server on port 5173
```

**MongoDB:**
- Must be running locally on `mongodb://localhost:27017`
- Database name: `focusnexa`

## Key Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes with middleware
- Token stored in localStorage as `focusnexa_token`

### API Endpoints

**Auth:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user profile (protected)

**Sessions:**
- GET `/api/sessions` - Get all sessions
- POST `/api/sessions` - Create session
- PUT `/api/sessions/:id` - Update session
- DELETE `/api/sessions/:id` - Delete session

**Topics:**
- GET `/api/topics` - Get all topics
- POST `/api/topics` - Create topic
- PUT `/api/topics/:id` - Update topic
- DELETE `/api/topics/:id` - Delete topic

**Goals:**
- GET `/api/goals` - Get all goals
- POST `/api/goals` - Create goal
- PUT `/api/goals/:id` - Update goal
- DELETE `/api/goals/:id` - Delete goal

**Analytics:**
- GET `/api/analytics` - Get analytics data

**AI:**
- GET `/api/ai/insights` - Get AI insights
- POST `/api/ai/study-plan` - Generate study plan

**Users:**
- PUT `/api/users/profile` - Update user profile

## Frontend Configuration

### Vite Config
- Dev server port: 5173
- Proxy configured to forward `/api` requests to `http://localhost:5000`
- React plugin with Babel for React Compiler

### Styling
- Design system with CSS custom properties
- Located in `frontend/src/index.css` (global styles)
- Page-specific styles in `frontend/src/pages/pages.css`
- Component styles in `frontend/src/components/components.css`

### Recent UI Updates
- Modern login page with split-screen layout (gradient left panel, clean form right panel)
- Enhanced dashboard with area charts, rounded bar corners, and hover effects
- Improved card styling with shadows and animations
- Better empty states with call-to-action buttons
- Responsive design for mobile devices

## Database Models

### User
- name, email, password (hashed with bcrypt)
- avatar, learningGoals, preferredDuration, preferredTopics
- Timestamps

### Session
- user (reference), topic, subtopic, duration
- completed, date, notes
- Timestamps

### Topic
- user (reference), name, description
- color, icon
- Timestamps

### Goal
- user (reference), title, target, progress
- deadline, completed
- Timestamps

## Common Issues & Solutions

### Frontend-Backend Connection
- Ensure both servers are running (backend on 5000, frontend on 5173)
- Vite proxy configured in `vite.config.js` forwards `/api` to backend
- CORS configured in backend for `http://localhost:5173`
- Frontend `.env` should have `VITE_API_URL=/api` (uses proxy)

### MongoDB Connection
- Ensure MongoDB service is running (`mongod` process)
- Check connection string in backend `.env`
- Database: `focusnexa` on localhost:27017

### Port Conflicts
- If port 5173 is in use, kill the process or restart
- On Windows: `taskkill //F //PID <process_id>`
- Backend uses port 5000

## Verification Steps

### Test API Connection
```bash
# Health check
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Frontend
- Navigate to `http://localhost:5173`
- Try login with existing credentials
- Check browser console for errors
- Verify API calls through proxy work

## Development Notes

### Code Style
- ES6+ JavaScript features
- React functional components with hooks
- Async/await for API calls
- Consistent error handling

### Testing Commands
Currently no test infrastructure configured. Tests should be added for:
- API endpoints
- Component rendering
- User authentication flow

### Build Commands
```bash
# Frontend build
cd frontend
npm run build

# Backend (no build step, uses ES modules directly)
```

## Dependencies

### Backend
- express, cors, dotenv
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- @google/generative-ai (Google Gemini AI)
- nodemon (dev)

### Frontend
- react, react-dom, react-router-dom
- axios (HTTP client)
- recharts (charting library)
- vite (build tool)
- @vitejs/plugin-react
- babel-plugin-react-compiler

## Deployment Considerations

### Before Production
- Change JWT_SECRET in backend .env
- Configure MongoDB connection string for production
- Set NODE_ENV=production
- Update CORS_ORIGIN to production domain
- Build frontend with `npm run build`
- Use a process manager like PM2 for backend
- Configure reverse proxy (nginx) for production
