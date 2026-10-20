import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudySessions from './pages/StudySessions';
import Topics from './pages/Topics';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import WeeklyReport from './pages/WeeklyReport';
import AIInsights from './pages/AIInsights';
import StudyPlan from './pages/StudyPlan';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const AppContent = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar
            user={user}
            onLogout={logout}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className="app-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <StudySessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/topics"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Topics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Goals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/weekly-report"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <WeeklyReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-insights"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AIInsights />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/study-plan"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <StudyPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
