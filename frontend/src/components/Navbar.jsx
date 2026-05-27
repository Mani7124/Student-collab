import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <header className="app-nav app-container" role="banner">
      <div style={{display:'flex', alignItems:'center', gap:16}}>
        <div className="brand">Student<span style={{color:'var(--text)'}}>Collab</span></div>
      </div>

      <div style={{flex:1, display:'flex', justifyContent:'center'}}>
        <input placeholder="Search posts, people or topics" style={{maxWidth:520, width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.04)', background:'transparent', color:'var(--text)'}} />
      </div>

      <div className="nav-links" style={{justifyContent:'flex-end'}}>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <button className="btn secondary" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
