import React from 'react';
import { Navigate, Route, Routes, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import RegisterPost from './pages/RegisterPost';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const authVisible = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id/register"
            element={
              <ProtectedRoute>
                <RegisterPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {authVisible ? null : (
        <footer className="footer">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/posts/new">Create post</Link>
          <Link to="/profile">Profile</Link>
        </footer>
      )}
    </div>
  );
}
