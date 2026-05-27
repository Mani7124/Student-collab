import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function timeAgo() {
  return 'Just now';
}

export default function PostCard({ post }) {
  const storageKey = `likes_${post._id}`;
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey));
      if (data) {
        setLikes(data.count || 0);
        setLiked(!!data.liked);
      }
    } catch {}
  }, [storageKey]);

  const toggleLike = () => {
    const nextLiked = !liked;
    const nextCount = nextLiked ? likes + 1 : Math.max(0, likes - 1);
    setLiked(nextLiked);
    setLikes(nextCount);
    localStorage.setItem(storageKey, JSON.stringify({ liked: nextLiked, count: nextCount }));
  };

  return (
    <article className="post-card card" aria-label={`Post ${post.title}`}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div style={{width:44, height:44, borderRadius:10, background:'#081226', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)'}}>
            {post.created_by?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{fontWeight:700}}>{post.created_by || 'Unknown'}</div>
            <div className="muted" style={{fontSize:12}}>{timeAgo()}</div>
          </div>
        </div>
        <div className="muted" style={{fontSize:12}}>{post._id}</div>
      </div>

      <h3 style={{marginTop:12}}>{post.title}</h3>
      <p className="muted" style={{marginBottom:12}}>{post.description || '—'}</p>

      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:6}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button className="btn secondary" onClick={toggleLike} aria-pressed={liked}>
            {liked ? 'Liked' : 'Like'} ({likes})
          </button>
          <Link to={`/register/${post._id}`} className="btn">Register</Link>
        </div>
        <div className="muted">{(post.registrations || []).length} registered</div>
      </div>
    </article>
  );
}
