import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span>{post.created_by || 'Anonymous'}</span>
        <span>{(post.registrations || []).length} registrations</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description || 'No description provided.'}</p>
      <div className="post-actions">
        <Link className="btn btn-secondary" to={`/posts/${post._id}/register`}>
          Register
        </Link>
      </div>
    </article>
  );
}
