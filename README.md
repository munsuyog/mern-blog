# MERN Stack Blog Application
### College Project - Modern Blogging Platform

A full-featured blogging platform built with the MERN stack, featuring rich text editing, data visualization, and Google authentication. This project demonstrates modern web development practices and real-world application features.

## Project Team
- Suyog Mundhe
- Shreyash Pandey

Branch: Computer Engineering
Course: MERN
College: K. J. Somaiya School of Engineering

## 🚀 Features

### User Management
- Email & Password Authentication
- Google OAuth Integration
- User Profile Dashboard
- Custom Admin Dashboard
- Protected Routes

### Blog Posts
- Create, Read, Update, Delete Posts
- Rich Text Editor with React Quill
- Post Categories
- Advanced Search & Filtering
- Like/Dislike System

### Analytics & Data
- User Analytics Dashboard
- Post Performance Metrics
- Chart.js Visualizations
- Circular Progress Indicators

### UI/UX Features
- Responsive Design
- Modern UI with Flowbite-React
- Custom Scrollbars
- Loading States
- Toast Notifications

## 💻 Tech Stack

### Frontend
- React 18
- Redux Toolkit & Redux Persist
- Tailwind CSS
- Flowbite React Components
- React Router v6
- Firebase Authentication
- Chart.js & React-Chartjs-2
- React Quill Editor

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Google OAuth 2.0

## 📁 Project Structure
```
MERN-BLOG/
├── api/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── comment.route.js
│   │   ├── post.route.js
│   │   └── user.route.js
│   └── utils/
│       ├── error.js
│       └── verifyUser.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   └── main.jsx
│   └── [configuration files]
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/munsuyog/mern-blog.git
cd mern-blog
```

### Step 2: Environment Variables
Create `.env` in root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create `firebase.js` in client/src directory:
```javascript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messagingSenderId",
  appId: "your_appId",
  measurementId: "your_measurementId"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

### Step 3: Install Dependencies

Backend:
```bash
npm install
```

Frontend:
```bash
cd client
npm install
```

### Step 4: Run Application

Backend:
```bash
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## 📚 API Documentation

### Auth Routes
```
POST /api/auth/signup      - Register user
POST /api/auth/signin      - Login user
POST /api/auth/google      - Google authentication
```

### User Routes
```
GET    /api/user/test           - Test route
PUT    /api/user/update/:userId - Update user
DELETE /api/user/delete/:userId - Delete user
POST   /api/user/signout        - Sign out
GET    /api/user/getusers       - Get users
GET    /api/user/:userId        - Get user
```

### Post Routes
```
POST   /api/post/create                      - Create post
GET    /api/post/getposts                    - Get posts
DELETE /api/post/deletepost/:postId/:userId  - Delete post
PUT    /api/post/updatepost/:postId/:userId  - Update post
POST   /api/post/like/:postId               - Like post
POST   /api/post/dislike/:postId            - Dislike post
```

### Comment Routes
```
POST   /api/comment/create                    - Create comment
GET    /api/comment/getPostComments/:postId   - Get comments
PUT    /api/comment/likeComment/:commentId    - Like comment
PUT    /api/comment/editComment/:commentId    - Edit comment
DELETE /api/comment/deleteComment/:commentId  - Delete comment
GET    /api/comment/getcomments              - Get all comments
```

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.1",
    "chart.js": "^4.4.6",
    "firebase": "^10.7.1",
    "flowbite-react": "^0.7.0",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-circular-progressbar": "^2.1.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "react-quill": "^2.0.0",
    "react-redux": "^9.0.1",
    "react-router-dom": "^6.20.0",
    "redux-persist": "^6.0.0"
  }
}
```

## 🛠️ Tools & Configurations

### Development Tools
- Vite for build tooling
- ESLint for code linting
- PostCSS and Autoprefixer
- Tailwind CSS plugins

### Scripts
```bash
# Development
npm run dev

# Production Build
npm run build

# Code Linting
npm run lint

# Preview Build
npm run preview
```

## 📱 Features Showcase

### Rich Text Editor
The application uses React Quill for content creation:
```javascript
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
```

### Data Visualization
Interactive charts using Chart.js:
```javascript
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
```

### Redux State Management
Persistent state management:
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
```

## 🔐 Security Features
- JWT Authentication
- Protected API Routes
- Firebase Security Rules
- Input Validation
- XSS Protection

## 🎓 Learning Outcomes
- Full-stack Development
- State Management
- Authentication Systems
- RESTful API Design
- Database Management
- UI/UX Best Practices
- Performance Optimization
- Project Collaboration

## 🚧 Future Enhancements
- [ ] Advanced Search Functionality
- [ ] Email Notifications
- [ ] Social Media Integration
- [ ] Post Scheduling
- [ ] Mobile Application

## 🤝 Contributors
- Suyog Mundhe - Backend
- Shreyash Pandey - Frontend

## 👨‍🏫 Project Supervisor
- Prof. Nirmala Baloorkar

*This project was developed as part of the COMPS Department at K. J. Somaiya School of Engineering.*