import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ profile }) {
  const user = profile || {};

  return (
    <aside className="sidebar">
      <div className="card sidebar-card">
        <h3>Profile</h3>
        <p className="muted">{user.name || 'Student'}</p>
        <p className="muted">{user.email || 'Not signed in'}</p>
        <Link className="btn btn-secondary" to="/profile">
          Edit profile
        </Link>
      </div>
      <div className="card sidebar-card">
        <h3>Quick links</h3>
        <Link to="/posts/new">Create a post</Link>
        <Link to="/dashboard">Browse feed</Link>
      </div>
    </aside>
  );
}
