import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        Student Collab
      </Link>
      <nav className="nav-links">
        <Link to="/dashboard">Feed</Link>
        <Link to="/posts/new">Create</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <button className="nav-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
