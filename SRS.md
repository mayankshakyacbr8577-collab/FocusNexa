# Software Requirements Specification (SRS)
# FocusNexa - AI-Powered Study & Digital Productivity Platform

---

## Document Information

| Field | Value |
|-------|-------|
| **Project Name** | FocusNexa |
| **Tagline** | Focus Better. Learn Smarter. Grow Faster. |
| **Project Type** | AI-Powered Study & Digital Productivity Platform |
| **Document Version** | 1.0 |
| **Date** | October 20, 2026 |
| **Technology Stack** | MERN Stack (MongoDB, Express, React, Node.js) |
| **AI Integration** | Google Gemini API |
| **Extension** | Chrome Extension (Manifest V3) |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [System Architecture](#3-system-architecture)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Database Schema](#6-database-schema)
7. [API Specifications](#7-api-specifications)
8. [Frontend Components](#8-frontend-components)
9. [Development Phases](#9-development-phases)
10. [Testing Strategy](#10-testing-strategy)
11. [Security Requirements](#11-security-requirements)
12. [Deployment Strategy](#12-deployment-strategy)

---

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for FocusNexa, an AI-powered study and digital productivity platform designed to help students plan their studies, track study sessions, manage topics and goals, analyze productivity, and maintain focus through distraction detection and blocking.

### 1.2 Scope

FocusNexa consists of:
- React Web Application
- Node.js + Express Backend
- MongoDB Database
- Gemini AI Integration
- Chrome Extension
- Analytics System
- Authentication System
- Complete integration between all components

### 1.3 Target Audience

- Students (college, university, professional courses)
- Self-learners
- Competitive exam aspirants
- Anyone looking to improve study productivity

### 1.4 Project Objective

The purpose of the project is to help students:
- Plan their studies
- Track study sessions
- Manage topics and subtopics
- Create study goals
- Analyze productivity
- Compare weekly performance
- Calculate a project-defined Focus Score
- Receive AI-powered insights
- Generate personalized study plans
- Track browser activity
- Detect distractions
- Block selected distracting websites during Study Mode

---

## 2. Project Overview

### 2.1 Current Status

**COMPLETED:**
- ✅ Frontend — React + Vite
- ✅ Backend — Node.js + Express
- ✅ Basic project folder structure
- ✅ Frontend pages/components
- ✅ Backend controllers/routes/models/services
- ✅ Initial API structure

**REMAINING:**
- ⏳ Chrome Extension Development
- ⏳ Browser Activity Tracking
- ⏳ Distraction Detection & Blocking
- ⏳ Complete System Testing
- ⏳ Deployment

### 2.2 Key Features

1. **Authentication System**
   - User registration and login
   - JWT-based authentication
   - Protected routes
   - Password hashing with bcrypt

2. **User Profile Management**
   - Profile viewing and editing
   - Learning goals configuration
   - Preferred study duration
   - Preferred topics selection

3. **Study Session Management**
   - Timer-based study sessions
   - Pause/Resume functionality
   - Session tracking (topic, subtopic, duration, goal)
   - Session history

4. **Topic & Subtopic Management**
   - Create, edit, delete topics
   - Organize subtopics hierarchically
   - Track study time per topic
   - Progress visualization

5. **Goal Management**
   - Create study goals with targets
   - Track progress
   - Set deadlines
   - Goal completion tracking

6. **Dashboard & Analytics**
   - Real-time study statistics
   - Daily/weekly study charts
   - Topic distribution visualization
   - Goal completion analytics

7. **Weekly Reports**
   - Week-over-week comparison
   - Performance trends
   - Percentage change calculations
   - AI-generated summaries

8. **Focus Score System**
   - Project-defined productivity metric (0-100)
   - Based on study consistency, time, goals
   - Real-time calculation
   - Historical tracking

9. **AI-Powered Insights**
   - Weekly summaries
   - Strengths identification
   - Weak area detection
   - Productivity pattern analysis
   - Personalized recommendations

10. **AI Smart Study Plans**
    - Generate personalized study plans
    - Week-by-week breakdown
    - Daily tasks with time estimates
    - Practice exercises

11. **Chrome Extension**
    - Study Mode activation
    - Browser activity tracking
    - Distraction detection
    - Website blocking during Study Mode
    - Real-time session sync

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
                  FOCUSNEXA
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ↓              ↓              ↓
 React Web App     Backend       Chrome Extension
       │              │              │
       └──────────────┼──────────────┘
                      ↓
                   MongoDB
                      │
                      ↓
                 Analytics
                      │
                      ↓
                 Focus Score
                      │
                      ↓
                  Gemini AI
                      │
                      ↓
          Personalized Insights
                      │
                      ↓
              Smart Study Plan
```

### 3.2 Technology Stack

**Frontend:**
- React 19.3.1
- Vite 8.3.4
- React Router DOM 7.18.4
- Axios 1.20.0
- Recharts 3.10.1
- React Compiler (enabled)

**Backend:**
- Node.js
- Express 4.19.2
- MongoDB (Mongoose 8.5.2)
- JWT (jsonwebtoken 9.0.2)
- bcryptjs 2.4.3
- Google Generative AI (@google/generative-ai 0.21.0)
- CORS 2.8.5
- dotenv 16.4.5

**Database:**
- MongoDB (local or MongoDB Atlas)

**Chrome Extension:**
- Manifest V3
- JavaScript (ES6+)
- HTML5
- CSS3

### 3.3 Component Structure

**Frontend Structure:**
```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   ├── assets/           # Static assets
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Public assets
├── package.json
├── vite.config.js
└── eslint.config.js
```

**Backend Structure:**
```
backend/
├── config/               # Configuration files
│   └── db.js            # Database connection
├── controllers/          # Request handlers
├── middleware/           # Custom middleware
├── models/               # Mongoose models
├── routes/               # API routes
├── services/             # Business logic
├── utils/                # Utility functions
├── server.js             # Server entry point
├── .env                  # Environment variables
├── .env.example          # Environment template
└── package.json
```

---

## 4. Functional Requirements

### 4.1 Authentication Module (Phase 1)

**FR-1.1 User Registration**
- User must be able to register with name, email, and password
- Email must be unique
- Password must be at least 6 characters
- Password must be hashed before storage
- User must receive authentication token upon registration

**FR-1.2 User Login**
- User must be able to login with email and password
- System must verify password hash
- System must generate JWT token
- Token must be stored securely on client side
- User session must persist across page refreshes

**FR-1.3 User Logout**
- User must be able to logout
- Token must be cleared from client storage
- User must be redirected to login page

**FR-1.4 Protected Routes**
- Protected routes must require valid JWT token
- Access without token must redirect to login
- Token validation must occur on each protected request

**FR-1.5 Authentication Middleware**
- Backend must verify JWT token on protected endpoints
- Invalid tokens must return 401 Unauthorized
- Expired tokens must return 401 Unauthorized

### 4.2 User/Profile Module (Phase 2)

**FR-2.1 View Profile**
- User must be able to view their profile information
- Display name, email, avatar, learning goals
- Display preferred study duration and topics

**FR-2.2 Edit Profile**
- User must be able to update name
- User must be able to update learning goals
- User must be able to set preferred study duration (15-180 minutes)
- User must be able to set preferred topics (comma-separated)
- Changes must persist in database

**FR-2.3 Profile Persistence**
- Profile changes must reflect immediately in UI
- Data must update in MongoDB
- Other components must use updated profile data

### 4.3 Study Session Module (Phase 3)

**FR-3.1 Start Session**
- User must be able to start a study session
- User must select topic from existing topics
- User can specify subtopic
- User can set planned duration
- User can set study goal
- Timer must start automatically

**FR-3.2 Timer Controls**
- Timer must display elapsed time
- User must be able to pause timer
- User must be able to resume timer
- Timer must continue counting when active

**FR-3.3 Complete Session**
- User must be able to complete session
- Actual duration must be recorded
- Session data must be saved to database
- User must be able to view session history

**FR-3.4 Session Management**
- User must be able to view all sessions
- User must be able to edit session details
- User must be able to delete sessions
- Sessions must be sorted by date (newest first)

**FR-3.5 Session Data**
- Each session must store: userId, topic, subtopic, duration, goal, date, status
- Session date must default to current timestamp
- Session status must default to completed

### 4.4 Topics & Subtopics Module (Phase 4)

**FR-4.1 Create Topic**
- User must be able to create new topics
- Topic name is required
- User can add subtopics (comma-separated)
- Topic must be associated with user

**FR-4.2 Edit Topic**
- User must be able to edit topic name
- User must be able to add/remove subtopics
- Changes must update existing sessions using this topic

**FR-4.3 Delete Topic**
- User must be able to delete topics
- System must confirm deletion
- Related sessions must handle topic deletion gracefully

**FR-4.4 Topic Hierarchy**
- Topics can have multiple subtopics
- Subtopics must be stored as array
- UI must display subtopics in organized manner

**FR-4.5 Topic Statistics**
- Each topic must track total study time
- Study time must accumulate from sessions
- Display total time per topic

### 4.5 Goals Module (Phase 5)

**FR-5.1 Create Goal**
- User must be able to create study goals
- Goal title is required
- Target hours is required (minimum 1)
- User can set current progress (default 0)
- User can set deadline (optional)

**FR-5.2 Edit Goal**
- User must be able to edit goal details
- User can update progress
- User can change deadline
- User can modify target

**FR-5.3 Delete Goal**
- User must be able to delete goals
- System must confirm deletion

**FR-5.4 Complete Goal**
- User must be able to mark goal as completed
- Completed status must be visually distinct
- Completed goals must appear in history

**FR-5.5 Progress Tracking**
- Progress must be displayed as percentage
- Progress bar must visualize completion
- Progress calculation: (progress / target) * 100

### 4.6 Dashboard & Analytics Module (Phase 6)

**FR-6.1 Dashboard Statistics**
- Display today's study time
- Display weekly study time
- Display total sessions count
- Display goal completion percentage
- Display Focus Score

**FR-6.2 Charts**
- Daily study hours chart (bar chart, last 7 days)
- Weekly study hours chart (line chart, last 6 weeks)
- Topic distribution chart (pie chart)
- Goal completion chart (bar chart)

**FR-6.3 Recent Sessions**
- Display 5 most recent sessions
- Show topic, subtopic, duration, date
- Click to view session details

**FR-6.4 Today's Goals**
- Display active goals for today
- Show progress bars
- Show completion percentage

**FR-6.5 AI Quick Insight**
- Display one AI-generated insight
- Show on dashboard for quick reference

**FR-6.6 Real-time Updates**
- Dashboard must update with new data
- Charts must reflect current database state
- No hardcoded values allowed

### 4.7 Weekly Report Module (Phase 7)

**FR-7.1 Week Comparison**
- Compare last week vs this week
- Display study time for both weeks
- Display session count for both weeks
- Display goals completed for both weeks
- Display Focus Score for both weeks

**FR-7.2 Percentage Changes**
- Calculate percentage change for each metric
- Display with up/down arrows
- Green for positive, red for negative
- Formula: ((thisWeek - lastWeek) / lastWeek) * 100

**FR-7.3 AI Summary**
- Generate AI summary of weekly performance
- Highlight improvements
- Suggest areas for improvement

**FR-7.4 Date Calculation**
- System must correctly calculate week boundaries
- Week starts on Sunday
- Last week = previous 7 days
- This week = current 7 days

### 4.8 Focus Score Module (Phase 8)

**FR-8.1 Score Calculation**
- Score must be between 0-100
- Calculation factors:
  - Study consistency (session frequency)
  - Total study time
  - Goal completion rate
  - Average session duration
- Formula (backend):
  ```
  Focus Score = min(100,
    (totalStudyTime / 60) * 2 +
    (totalSessions * 3) +
    (goalCompletionPercentage * 0.3)
  )
  ```

**FR-8.2 Score Display**
- Display score as "X/100"
- Show on dashboard
- Show on weekly report
- Color-coded based on score (green > 70, yellow 50-70, red < 50)

**FR-8.3 Historical Tracking**
- Track score changes over time
- Display score trend
- Calculate weekly score changes

**FR-8.4 Score Factors**
- Later: Include browser activity data
- Later: Include distraction metrics
- Adjust formula as new data sources added

### 4.9 Gemini AI Insights Module (Phase 9)

**FR-9.1 Data Preparation**
- System must prepare summarized user data
- Include: study time, topics, sessions, goals, weekly comparison
- Data must be anonymized if necessary

**FR-9.2 AI Request**
- Send prepared data to Gemini API
- Use Gemini Pro model
- Request structured JSON response

**FR-9.3 AI Response Structure**
- Weekly summary (string)
- Strengths (array of strings)
- Weak areas (array of strings)
- Productivity pattern (string)
- Recommendations (array of strings)

**FR-9.4 Fallback Mechanism**
- If Gemini API fails, use mock data
- Mock data must be realistic
- User must be notified of fallback

**FR-9.5 Error Handling**
- Handle API rate limits
- Handle invalid responses
- Handle network failures
- Display user-friendly error messages

**FR-9.6 API Security**
- Gemini API key must remain in backend
- Never expose API key in frontend
- Use environment variables

### 4.10 AI Smart Study Plan Module (Phase 10)

**FR-10.1 User Input**
- User enters learning goal
- Example: "Learn MERN in 30 days"
- Input validation required

**FR-10.2 Plan Generation**
- Send goal to Gemini API
- Request 4-week study plan
- Specify JSON structure

**FR-10.3 Plan Structure**
- Goal (string)
- Weeks (array of 4)
  - Week number
  - Topic
  - Days (array of 7)
    - Day number
    - Topic
    - Subtopic
    - Time (minutes)
    - Task

**FR-10.4 Plan Display**
- Display plan week by week
- Show daily breakdown
- Display time estimates
- Show practice tasks

**FR-10.5 Fallback**
- Use mock plan if AI fails
- Mock plan must cover common topics
- 4-week structure maintained

### 4.11 Chrome Extension Foundation (Phase 11)

**FR-11.1 Manifest V3**
- Use Manifest V3 format
- Include required permissions
- Set proper version

**FR-11.2 Extension Structure**
- manifest.json
- background.js (service worker)
- content.js
- popup.html
- popup.js
- style.css

**FR-11.3 Basic Functionality**
- Extension must load in Chrome
- Popup must open successfully
- No console errors
- Background service must initialize

**FR-11.4 Permissions**
- activeTab
- storage
- tabs
- webNavigation

### 4.12 Extension Study Mode (Phase 12)

**FR-12.1 Study Mode Activation**
- Web app must send "Study Mode ON" signal
- Extension must receive and store state
- Extension popup must display current state

**FR-12.2 Session Sync**
- Extension must display current session topic
- Extension must display session time
- Real-time sync with web app

**FR-12.3 Mode Toggle**
- User can toggle Study Mode from extension
- State must sync with web app
- Visual indicator for mode status

**FR-12.4 Storage**
- Use chrome.storage.local for state
- Persist across browser sessions
- Sync with backend periodically

### 4.13 Browser Activity Tracking (Phase 13)

**FR-13.1 Activity Monitoring**
- Track active tab URL
- Track duration per website
- Track timestamp
- Associate with userId

**FR-13.2 Categorization**
- Categorize websites: Learning, Entertainment, Distraction
- Use domain-based classification
- Allow user to customize categories

**FR-13.3 Data Storage**
- Store: website, url/domain, duration, category, timestamp, userId
- Send to backend via API
- Batch updates to reduce API calls

**FR-13.4 API Integration**
- POST /api/activity
- Send activity data to backend
- Handle offline scenarios (queue data)

### 4.14 Distraction Detection & Blocking (Phase 14)

**FR-14.1 Blocking Mechanism**
- When Study Mode is ON, block configured sites
- Show blocking message
- Prevent navigation to blocked sites

**FR-14.2 Blocking Message**
- Display: "Stay Focused 🚀"
- Display: "Site blocked during Study Mode"
- Allow user to view blocking reason

**FR-14.3 Configuration**
- User can configure blocked sites
- Add/remove sites from blocklist
- Default distraction sites (YouTube, Facebook, etc.)

**FR-14.4 Whitelist**
- Allow specific learning sites even during Study Mode
- User can add sites to whitelist
- Whitelist overrides blocklist

### 4.15 Extension + Dashboard Integration (Phase 15)

**FR-15.1 Activity Display**
- Dashboard must show browser activity
- Categories: Learning, Entertainment, Distraction
- Display time per category

**FR-15.2 Activity Charts**
- Chart showing time distribution
- Learning vs Entertainment vs Distraction
- Real-time updates

**FR-15.3 Data Source**
- Activity data must come from MongoDB
- No hardcoded values
- Real-time fetching

**FR-15.4 Privacy**
- User can view their activity data
- User can delete activity history
- Data is user-specific

### 4.16 AI + Activity Integration (Phase 16)

**FR-16.1 Enhanced AI Data**
- Send browser activity to AI
- Include in AI insights generation
- Combine with study data

**FR-16.2 Distraction Insights**
- AI must identify distraction patterns
- Provide recommendations for blocking
- Suggest optimal study times

**FR-16.3 Productivity Analysis**
- AI must analyze productivity vs distraction
- Correlate study time with focus
- Suggest schedule improvements

**FR-16.4 Dynamic Recommendations**
- Recommendations must change based on activity
- Real-time insight updates
- Personalized suggestions

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-1.1 Response Time**
- API response time < 500ms for simple queries
- API response time < 2s for complex queries (AI)
- Page load time < 3s
- Dashboard render time < 2s

**NFR-1.2 Scalability**
- System must support 1000+ concurrent users
- Database must handle 10000+ records per collection
- Extension must not slow down browser significantly

### 5.2 Usability

**NFR-2.1 User Interface**
- Intuitive and clean design
- Responsive on mobile, tablet, desktop
- Accessible (WCAG 2.1 AA compliance)
- Clear error messages

**NFR-2.2 Learning Curve**
- Minimal learning required
- Onboarding flow for new users
- Help tooltips where needed

### 5.3 Reliability

**NFR-3.1 Availability**
- System uptime > 99%
- Graceful degradation on AI failure
- Extension must work offline partially

**NFR-3.2 Data Integrity**
- No data loss during updates
- Proper error handling
- Transaction support for critical operations

### 5.4 Security

**NFR-4.1 Authentication**
- JWT tokens with expiration
- Secure password hashing (bcrypt)
- HTTPS in production

**NFR-4.2 Data Protection**
- User data isolation
- API key protection
- Input validation
- SQL injection prevention (MongoDB injection)

**NFR-4.3 Privacy**
- User data not shared with third parties
- Activity data is private
- User can delete their data

### 5.5 Maintainability

**NFR-5.1 Code Quality**
- Clean, modular code
- Consistent naming conventions
- Proper comments for complex logic
- Version control (Git)

**NFR-5.2 Documentation**
- Code documentation
- API documentation
- Deployment guide
- User manual

---

## 6. Database Schema

### 6.1 Users Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, select: false),
  avatar: String (optional),
  learningGoals: String (default: ''),
  preferredDuration: Number (default: 60),
  preferredTopics: [String] (default: []),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.2 StudySessions Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  topic: String (required),
  subtopic: String (optional),
  duration: Number (required, in minutes),
  date: Date (default: Date.now),
  goal: String (optional),
  completed: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.3 Topics Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  name: String (required),
  subtopics: [String] (default: []),
  totalTime: Number (default: 0, in hours),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.4 Goals Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  title: String (required),
  target: Number (required, in hours),
  progress: Number (default: 0, in hours),
  completed: Boolean (default: false),
  deadline: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.5 WeeklyReports Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  weekStart: Date (required),
  weekEnd: Date (required),
  studyTime: Number (default: 0, in minutes),
  sessions: Number (default: 0),
  goalsCompleted: Number (default: 0),
  focusScore: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 6.6 BrowserActivities Collection (Phase 13+)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  website: String (required),
  url: String (required),
  domain: String (required),
  duration: Number (required, in seconds),
  category: String (required, enum: ['Learning', 'Entertainment', 'Distraction']),
  timestamp: Date (required),
  createdAt: Date
}
```

### 6.7 UserSettings Collection (Extension)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  blockedSites: [String] (default: []),
  whitelistedSites: [String] (default: []),
  studyModeEnabled: Boolean (default: false),
  currentSession: {
    topic: String,
    startTime: Date,
    duration: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 7. API Specifications

### 7.1 Authentication APIs

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": null,
  "learningGoals": "",
  "preferredDuration": 60,
  "preferredTopics": [],
  "token": "jwt_token"
}
```

#### POST /api/auth/login
Authenticate user and return token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": null,
  "learningGoals": "",
  "preferredDuration": 60,
  "preferredTopics": [],
  "token": "jwt_token"
}
```

#### GET /api/auth/me
Get current user profile (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": null,
  "learningGoals": "",
  "preferredDuration": 60,
  "preferredTopics": []
}
```

### 7.2 User APIs

#### PUT /api/users/profile
Update user profile (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "learningGoals": "Master MERN Stack",
  "preferredDuration": 90,
  "preferredTopics": ["React", "Node.js", "MongoDB"]
}
```

**Response (200):**
```json
{
  "_id": "user_id",
  "name": "John Updated",
  "email": "john@example.com",
  "avatar": null,
  "learningGoals": "Master MERN Stack",
  "preferredDuration": 90,
  "preferredTopics": ["React", "Node.js", "MongoDB"]
}
```

### 7.3 Study Session APIs

#### GET /api/sessions
Get all user sessions (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "session_id",
    "user": "user_id",
    "topic": "React",
    "subtopic": "useEffect",
    "duration": 60,
    "date": "2026-10-20T10:00:00.000Z",
    "goal": "Complete useEffect concepts",
    "completed": true,
    "createdAt": "2026-10-20T10:00:00.000Z",
    "updatedAt": "2026-10-20T11:00:00.000Z"
  }
]
```

#### POST /api/sessions
Create new session (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "topic": "React",
  "subtopic": "useState",
  "duration": 45,
  "goal": "Understand state management"
}
```

**Response (201):**
```json
{
  "_id": "session_id",
  "user": "user_id",
  "topic": "React",
  "subtopic": "useState",
  "duration": 45,
  "date": "2026-10-20T12:00:00.000Z",
  "goal": "Understand state management",
  "completed": true,
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:00:00.000Z"
}
```

#### PUT /api/sessions/:id
Update session (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "duration": 50,
  "goal": "Updated goal"
}
```

**Response (200):**
```json
{
  "_id": "session_id",
  "user": "user_id",
  "topic": "React",
  "subtopic": "useState",
  "duration": 50,
  "date": "2026-10-20T12:00:00.000Z",
  "goal": "Updated goal",
  "completed": true,
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:30:00.000Z"
}
```

#### DELETE /api/sessions/:id
Delete session (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Session removed"
}
```

### 7.4 Topic APIs

#### GET /api/topics
Get all user topics (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "topic_id",
    "user": "user_id",
    "name": "React",
    "subtopics": ["Components", "Hooks", "Routing"],
    "totalTime": 5,
    "createdAt": "2026-10-20T10:00:00.000Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  }
]
```

#### POST /api/topics
Create new topic (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Node.js",
  "subtopics": ["Express", "REST API", "Authentication"]
}
```

**Response (201):**
```json
{
  "_id": "topic_id",
  "user": "user_id",
  "name": "Node.js",
  "subtopics": ["Express", "REST API", "Authentication"],
  "totalTime": 0,
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:00:00.000Z"
}
```

#### PUT /api/topics/:id
Update topic (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Node.js Updated",
  "subtopics": ["Express", "REST API", "Authentication", "MongoDB"]
}
```

**Response (200):**
```json
{
  "_id": "topic_id",
  "user": "user_id",
  "name": "Node.js Updated",
  "subtopics": ["Express", "REST API", "Authentication", "MongoDB"],
  "totalTime": 0,
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:30:00.000Z"
}
```

#### DELETE /api/topics/:id
Delete topic (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Topic removed"
}
```

### 7.5 Goal APIs

#### GET /api/goals
Get all user goals (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "goal_id",
    "user": "user_id",
    "title": "Complete React Hooks",
    "target": 10,
    "progress": 7,
    "completed": false,
    "deadline": "2026-10-30T00:00:00.000Z",
    "createdAt": "2026-10-20T10:00:00.000Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  }
]
```

#### POST /api/goals
Create new goal (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Master MongoDB",
  "target": 15,
  "progress": 0,
  "deadline": "2026-11-15"
}
```

**Response (201):**
```json
{
  "_id": "goal_id",
  "user": "user_id",
  "title": "Master MongoDB",
  "target": 15,
  "progress": 0,
  "completed": false,
  "deadline": "2026-11-15T00:00:00.000Z",
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:00:00.000Z"
}
```

#### PUT /api/goals/:id
Update goal (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "progress": 5,
  "completed": false
}
```

**Response (200):**
```json
{
  "_id": "goal_id",
  "user": "user_id",
  "title": "Master MongoDB",
  "target": 15,
  "progress": 5,
  "completed": false,
  "deadline": "2026-11-15T00:00:00.000Z",
  "createdAt": "2026-10-20T12:00:00.000Z",
  "updatedAt": "2026-10-20T12:30:00.000Z"
}
```

#### DELETE /api/goals/:id
Delete goal (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Goal removed"
}
```

### 7.6 Analytics APIs

#### GET /api/analytics
Get user analytics (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalStudyTime": 25,
  "averageDailyStudyTime": 3.5,
  "totalSessions": 15,
  "mostStudiedTopic": "React",
  "goalCompletionPercentage": 72,
  "focusScore": 82,
  "dailyStudyHours": [2, 3, 4, 2, 5, 3, 6],
  "weeklyStudyHours": [15, 18, 20, 22, 25, 28],
  "topicDistribution": [
    { "name": "React", "value": 10 },
    { "name": "Node.js", "value": 8 },
    { "name": "MongoDB", "value": 7 }
  ],
  "goalCompletion": [
    { "name": "React Hooks", "completed": 1, "total": 1 },
    { "name": "Express", "completed": 0, "total": 1 }
  ]
}
```

### 7.7 Weekly Report APIs

#### GET /api/weekly-report
Get weekly comparison report (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "lastWeek": {
    "studyTime": "14h 20m",
    "sessions": 12,
    "goals": 8,
    "focusScore": 68
  },
  "thisWeek": {
    "studyTime": "19h 45m",
    "sessions": 17,
    "goals": 12,
    "focusScore": 82
  },
  "changes": {
    "studyTime": 38,
    "sessions": 42,
    "goals": 50,
    "focusScore": 21
  },
  "summary": "Your study time increased by 38% this week. You completed 17 sessions. Your focus score improved!"
}
```

### 7.8 AI APIs

#### GET /api/ai/insights
Get AI-powered insights (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "weeklySummary": "You maintained consistent study habits this week with focused sessions.",
  "strengths": [
    "You maintained consistent practice",
    "Study sessions are well-distributed",
    "Goal completion rate is excellent"
  ],
  "weakAreas": [
    "Consider adding more variety to topics",
    "Backend study time could be improved"
  ],
  "productivityPattern": "You are most productive in the morning hours between 9 AM - 12 PM.",
  "recommendations": [
    "Add focused sessions for weak areas",
    "Set specific daily targets",
    "Take short breaks between sessions"
  ]
}
```

#### POST /api/ai/study-plan
Generate AI study plan (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "goal": "Learn MERN in 30 days"
}
```

**Response (200):**
```json
{
  "goal": "Learn MERN in 30 days",
  "weeks": [
    {
      "week": 1,
      "topic": "JavaScript",
      "days": [
        {
          "day": 1,
          "topic": "JavaScript",
          "subtopic": "ES6 Basics",
          "time": 60,
          "task": "Practice exercises"
        }
      ]
    }
  ]
}
```

### 7.9 Activity APIs (Phase 13+)

#### POST /api/activity
Record browser activity (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "website": "YouTube",
  "url": "https://youtube.com",
  "domain": "youtube.com",
  "duration": 300,
  "category": "Distraction",
  "timestamp": "2026-10-20T10:00:00.000Z"
}
```

**Response (201):**
```json
{
  "_id": "activity_id",
  "user": "user_id",
  "website": "YouTube",
  "url": "https://youtube.com",
  "domain": "youtube.com",
  "duration": 300,
  "category": "Distraction",
  "timestamp": "2026-10-20T10:00:00.000Z",
  "createdAt": "2026-10-20T10:05:00.000Z"
}
```

#### GET /api/activity
Get user activity (Protected).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalDuration": 3600,
  "byCategory": {
    "Learning": 2700,
    "Entertainment": 600,
    "Distraction": 300
  },
  "recentActivities": [
    {
      "website": "MDN Docs",
      "duration": 900,
      "category": "Learning",
      "timestamp": "2026-10-20T10:00:00.000Z"
    }
  ]
}
```

---

## 8. Frontend Components

### 8.1 Pages

**Landing Page** (`Landing.jsx`)
- Hero section with tagline
- Feature highlights
- Call-to-action buttons
- Responsive design

**Login Page** (`Login.jsx`)
- Email and password fields
- Remember me checkbox
- Login button
- Error handling
- Link to registration

**Register Page** (`Register.jsx`)
- Name, email, password fields
- Confirm password field
- Registration button
- Validation
- Link to login

**Dashboard** (`Dashboard.jsx`)
- Statistics cards
- Charts (daily, weekly, topic distribution)
- Recent sessions list
- Today's goals
- AI quick insight

**Study Sessions** (`StudySessions.jsx`)
- Session creation form
- Study timer component
- Session list with cards
- Edit/delete functionality

**Topics** (`Topics.jsx`)
- Topic creation form
- Topic cards with subtopics
- Add subtopic functionality
- Edit/delete topics

**Goals** (`Goals.jsx`)
- Goal creation form
- Goal cards with progress bars
- Complete goal functionality
- Edit/delete goals

**Analytics** (`Analytics.jsx`)
- Detailed statistics
- Multiple charts
- Performance metrics
- Historical data

**Weekly Report** (`WeeklyReport.jsx`)
- Week comparison cards
- Percentage changes
- AI-generated summary

**AI Insights** (`AIInsights.jsx`)
- Weekly summary display
- Strengths list
- Weak areas list
- Productivity pattern
- Recommendations

**Study Plan** (`StudyPlan.jsx`)
- Goal input form
- Generated plan display
- Week-by-week breakdown
- Daily tasks

**Profile** (`Profile.jsx`)
- Profile display
- Edit form
- Learning goals
- Preferences

**Settings** (`Settings.jsx`)
- Theme selection
- Notification settings
- Study session settings
- Account settings

**404 Page** (`NotFound.jsx`)
- Error message
- Back to home button

### 8.2 Components

**Navbar** (`Navbar.jsx`)
- Logo and branding
- Navigation links
- User profile dropdown
- Logout button
- Mobile menu toggle

**Sidebar** (`Sidebar.jsx`)
- Navigation menu
- Active state highlighting
- Collapsible on mobile

**ProtectedRoute** (`ProtectedRoute.jsx`)
- Authentication check
- Redirect to login if not authenticated
- Render children if authenticated

**StatCard** (`StatCard.jsx`)
- Display statistic
- Icon
- Trend indicator
- Color variants

**ChartCard** (`ChartCard.jsx`)
- Container for charts
- Title
- Responsive wrapper

**StudyTimer** (`StudyTimer.jsx`)
- Countdown timer
- Pause/Resume buttons
- Complete button
- Time display

**SessionCard** (`SessionCard.jsx`)
- Display session details
- Edit/delete buttons
- Completion badge

**TopicCard** (`TopicCard.jsx`)
- Display topic and subtopics
- Add subtopic button
- Edit/delete buttons

**GoalCard** (`GoalCard.jsx`)
- Display goal and progress
- Progress bar
- Complete/edit/delete buttons

**EmptyState** (`EmptyState.jsx`)
- Empty state message
- Icon
- Action button

**Loading** (`Loading.jsx`)
- Spinner animation
- Loading message

### 8.3 Context

**AuthContext** (`AuthContext.jsx`)
- User state
- Authentication state
- Login/logout functions
- Profile update function

### 8.4 Services

**API Service** (`api.js`)
- Axios instance configuration
- Request interceptors (add token)
- Response interceptors (handle errors)
- API functions for all endpoints

---

## 9. Development Phases

### Phase 0: Existing Frontend + Backend Audit
- ✅ Inspect existing frontend structure
- ✅ Inspect existing backend structure
- ✅ Test frontend startup
- ✅ Test backend startup
- ✅ Verify MongoDB connection
- ✅ Test existing APIs
- ✅ Fix dependency issues
- ✅ Fix authentication flow

### Phase 1: Authentication Module
- ✅ Register functionality
- ✅ Login functionality
- ✅ Logout functionality
- ✅ JWT implementation
- ✅ Protected routes
- ✅ Authentication middleware
- ✅ Password hashing

### Phase 2: User/Profile Module
- ✅ View profile
- ✅ Edit profile
- ✅ Profile API endpoints
- ✅ Profile persistence

### Phase 3: Study Session Module
- ✅ Start session
- ✅ Timer functionality
- ✅ Pause/Resume
- ✅ Complete session
- ✅ Session CRUD APIs
- ✅ Session history

### Phase 4: Topics & Subtopics Module
- ✅ Create topic
- ✅ Edit topic
- ✅ Delete topic
- ✅ Add subtopics
- ✅ Topic CRUD APIs
- ✅ Topic time tracking

### Phase 5: Goals Module
- ✅ Create goal
- ✅ Edit goal
- ✅ Delete goal
- ✅ Complete goal
- ✅ Goal CRUD APIs
- ✅ Progress tracking

### Phase 6: Dashboard & Analytics Module
- ✅ Dashboard statistics
- ✅ Charts implementation
- ✅ Analytics calculation
- ✅ Real-time data
- ✅ Analytics API

### Phase 7: Weekly Report Module
- ✅ Week comparison
- ✅ Percentage changes
- ✅ Weekly report API
- ✅ AI summary

### Phase 8: Focus Score Module
- ✅ Score calculation
- ✅ Score display
- ✅ Score integration

### Phase 9: Gemini AI Insights Module
- ✅ Gemini integration
- ✅ AI insights API
- ✅ Fallback mechanism
- ✅ Error handling

### Phase 10: AI Smart Study Plan Module
- ✅ Study plan generation
- ✅ Plan display
- ✅ Plan API
- ✅ Fallback plan

### Phase 11: Chrome Extension Foundation
- ⏳ Manifest V3 setup
- ⏳ Extension structure
- ⏳ Basic popup
- ⏳ Background service
- ⏳ Load in Chrome

### Phase 12: Extension Study Mode
- ⏳ Study mode activation
- ⏳ Session sync
- ⏳ Mode toggle
- ⏳ State persistence

### Phase 13: Browser Activity Tracking
- ⏳ Activity monitoring
- ⏳ Categorization
- ⏳ Data storage
- ⏳ Activity API

### Phase 14: Distraction Detection & Blocking
- ⏳ Blocking mechanism
- ⏳ Blocking message
- ⏳ Configuration
- ⏳ Whitelist

### Phase 15: Extension + Dashboard Integration
- ⏳ Activity display
- ⏳ Activity charts
- ⏳ Data integration
- ⏳ Privacy controls

### Phase 16: AI + Activity Integration
- ⏳ Enhanced AI data
- ⏳ Distraction insights
- ⏳ Productivity analysis
- ⏳ Dynamic recommendations

### Phase 17: Complete System Testing
- ⏳ End-to-end testing
- ⏳ Integration testing
- ⏳ Bug fixing
- ⏳ Performance testing

### Phase 18: Security, Optimization and Deployment
- ⏳ Security audit
- ⏳ Code optimization
- ⏳ Frontend deployment (Vercel)
- ⏳ Backend deployment (Render/Railway)
- ⏳ Database deployment (MongoDB Atlas)
- ⏳ Extension packaging

---

## 10. Testing Strategy

### 10.1 Unit Testing

**Frontend:**
- Test React components
- Test custom hooks
- Test context providers
- Test utility functions
- Tool: Jest + React Testing Library

**Backend:**
- Test controllers
- Test models
- Test middleware
- Test utility functions
- Tool: Jest + Supertest

### 10.2 Integration Testing

**API Testing:**
- Test all endpoints
- Test authentication flow
- Test error handling
- Tool: Postman/Bruno

**Database Testing:**
- Test CRUD operations
- Test data relationships
- Test queries
- Tool: MongoDB memory server

### 10.3 End-to-End Testing

**User Flows:**
- Registration → Login → Dashboard
- Create Topic → Create Session → View Analytics
- Create Goal → Update Progress → Complete
- Start Study Mode → Extension Activity → Block Site

**Tool:** Cypress or Playwright

### 10.4 Testing Checklist

**Authentication:**
- [ ] Register new user
- [ ] Register with duplicate email (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Logout
- [ ] Access protected route without token (should redirect)
- [ ] Access protected route with token (should succeed)
- [ ] Refresh browser (auth should persist)

**Study Sessions:**
- [ ] Start timer
- [ ] Pause timer
- [ ] Resume timer
- [ ] Complete session
- [ ] Save session to database
- [ ] View session in list
- [ ] Edit session
- [ ] Delete session
- [ ] Session persists after refresh

**Topics:**
- [ ] Create topic
- [ ] Add subtopics
- [ ] Edit topic
- [ ] Delete topic
- [ ] View topic in session dropdown
- [ ] Topic time updates

**Goals:**
- [ ] Create goal
- [ ] Set target and deadline
- [ ] Update progress
- [ ] Complete goal
- [ ] Delete goal
- [ ] Progress bar displays correctly

**Analytics:**
- [ ] Dashboard shows real data
- [ ] Charts display correctly
- [ ] Statistics match database
- [ ] Data updates in real-time

**AI Features:**
- [ ] Generate insights
- [ ] Generate study plan
- [ ] Fallback works when API fails
- [ ] Error handling works

**Extension:**
- [ ] Extension loads in Chrome
- [ ] Popup opens
- [ ] Study mode syncs with web app
- [ ] Activity tracking works
- [ ] Blocking works during study mode

---

## 11. Security Requirements

### 11.1 Authentication Security

- Passwords must be hashed using bcrypt (salt rounds: 10)
- JWT tokens must have expiration (7 days)
- Tokens must be stored securely (httpOnly cookies recommended)
- Refresh token mechanism for long sessions

### 11.2 API Security

- All protected endpoints must require valid JWT
- CORS must be properly configured
- Rate limiting on sensitive endpoints
- Input validation on all endpoints
- SQL injection prevention (MongoDB injection)

### 11.3 Data Security

- User data isolation (user cannot access other users' data)
- API keys must be in environment variables
- Never commit .env files to version control
- sensitive data must be encrypted at rest

### 11.4 Extension Security

- Content Security Policy (CSP)
- Minimal permissions requested
- No remote code execution
- Secure communication with backend

### 11.5 Privacy

- User consent for activity tracking
- Option to disable tracking
- Data deletion on request
- Clear privacy policy

---

## 12. Deployment Strategy

### 12.1 Frontend Deployment (Vercel)

**Steps:**
1. Connect GitHub repository to Vercel
2. Configure build command: `npm run build`
3. Configure output directory: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Production backend URL
5. Deploy

**Advantages:**
- Automatic deployments on push
- HTTPS by default
- CDN for static assets
- Preview deployments

### 12.2 Backend Deployment (Render/Railway)

**Steps:**
1. Connect GitHub repository
2. Configure build command: `npm install`
3. Configure start command: `npm start`
4. Add environment variables:
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `JWT_SECRET`: Secure random string
   - `GEMINI_API_KEY`: Google Gemini API key
   - `CORS_ORIGIN`: Frontend URL
   - `NODE_ENV`: production
5. Deploy

**Advantages:**
- Free tier available
- Automatic HTTPS
- Easy scaling

### 12.3 Database Deployment (MongoDB Atlas)

**Steps:**
1. Create MongoDB Atlas account
2. Create cluster (free tier)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for Render)
5. Get connection string
6. Add to backend environment variables

**Advantages:**
- Free tier (512MB)
- Automatic backups
- Global distribution
- Easy scaling

### 12.4 Chrome Extension Deployment

**Development:**
- Load unpacked in Chrome Developer Mode
- Test locally

**Production:**
- Create Chrome Web Store developer account ($5 one-time)
- Package extension
- Submit for review
- Publish after approval

### 12.5 Environment Variables

**Production Backend (.env):**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/focusnexa
JWT_SECRET=<secure-random-string>
JWT_EXPIRE=7d
GEMINI_API_KEY=<gemini-api-key>
CORS_ORIGIN=https://focusnexa.vercel.app
```

**Production Frontend (.env):**
```
VITE_API_URL=https://focusnexa-backend.onrender.com/api
```

### 12.6 CI/CD Pipeline

**GitHub Actions:**
- Run tests on push
- Run linting
- Build frontend
- Deploy to staging on PR
- Deploy to production on main branch merge

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| MERN | MongoDB, Express, React, Node.js - Full stack JavaScript framework |
| JWT | JSON Web Token - Authentication token standard |
| CORS | Cross-Origin Resource Sharing - Security feature for APIs |
| MongoDB | NoSQL database for storing application data |
| Mongoose | ODM (Object Data Modeling) library for MongoDB |
| Vite | Build tool for frontend applications |
| Recharts | Charting library for React |
| Gemini AI | Google's AI model for generating insights |
| Manifest V3 | Latest Chrome extension manifest format |
| Study Mode | Focused study session with distraction blocking |
| Focus Score | Project-defined productivity metric (0-100) |

---

## Appendix B: References

- React Documentation: https://react.dev
- Express Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- Gemini AI Documentation: https://ai.google.dev
- Chrome Extension Documentation: https://developer.chrome.com/docs/extensions
- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs

---

## Document Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | October 20, 2026 | Devin | Initial SRS document creation |

---

**End of Document**
